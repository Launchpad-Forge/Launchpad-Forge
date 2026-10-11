import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as dal from "@/lib/dal";

// Simple in-memory rate limiting map: ip -> timestamps[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Please provide a valid email address").optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
  service: z.string().max(100).optional().or(z.literal("")),
  budget: z.string().max(50).optional().or(z.literal("")),
  timeline: z.string().max(50).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
  honeypot: z.string().optional().or(z.literal("")), // bot trap
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before submitting again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form input", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Bot honeypot check: if filled, silently accept to fool bots
    if (parsed.data.honeypot && parsed.data.honeypot.trim() !== "") {
      return NextResponse.json({ success: true, message: "Inquiry received" });
    }

    const { name, email, phone, company, service, budget, timeline, message } = parsed.data;

    // At least one contact method required
    if (!email && !phone) {
      return NextResponse.json(
        { error: "Please provide either an email or mobile number so we can reach you." },
        { status: 400 }
      );
    }

    // Build structured notes
    const notes = [
      service ? `Service Interested In: ${service}` : null,
      budget ? `Estimated Budget: ${budget}` : null,
      timeline ? `Desired Timeline: ${timeline}` : null,
      message ? `Project Details:\n${message}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    // Calculate numeric estimated budget for CRM metrics & charts
    let estimatedBudget: number | undefined = undefined;
    if (budget) {
      if (budget.includes("5k") || (budget.includes("15k") && !budget.includes("30k"))) estimatedBudget = 10000;
      else if (budget.includes("15k - 30k") || (budget.includes("30k") && !budget.includes("60k"))) estimatedBudget = 22500;
      else if (budget.includes("30k - 60k")) estimatedBudget = 45000;
      else if (budget.includes("60k")) estimatedBudget = 60000;
    }

    let savedToDb = false;
    let leadId: string | undefined = undefined;

    try {
      const newLead = await dal.createLead({
        name,
        email: email || undefined,
        phone: phone || undefined,
        companyName: company || undefined,
        serviceInterestedIn: service || undefined,
        estimatedBudget,
        notes: notes || undefined,
        source: "Website Inquiry Funnel",
        status: "New",
        priority: budget && (budget.includes("30k") || budget.includes("60k")) ? "High" : "Normal",
      });

      savedToDb = true;
      leadId = newLead?.id;

      // 1. Log activity in CRM timeline
      if (leadId) {
        try {
          await dal.createActivity({
            type: "NOTE",
            title: `Website Inquiry: ${name} (${service || "General"})`,
            leadId,
            date: new Date(),
          });
        } catch (actErr) {
          console.warn("[POST /api/contact] Activity log error:", actErr);
        }

        // 2. Schedule follow-up task due tomorrow for sales rep
        try {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          await dal.createFollowUp({
            title: `Respond to inbound inquiry from ${name}`,
            type: "CALL",
            dueDate: tomorrow,
            priority: "High",
            status: "Pending",
            leadId,
            notes: `Service: ${service || "N/A"}. Budget: ${budget || "N/A"}. Phone: ${phone || "N/A"}. Email: ${email || "N/A"}`,
          });
        } catch (fuErr) {
          console.warn("[POST /api/contact] FollowUp creation error:", fuErr);
        }
      }

      // 3. Emit CRM event for webhook automations (n8n / WhatsApp)
      try {
        const { eventBus } = await import("@/services/automations");
        await eventBus.emit("lead.created", {
          lead: newLead,
          metadata: { budget, timeline, service, source: "Website" },
        });
      } catch (evErr) {
        console.warn("[POST /api/contact] Event emission error:", evErr);
      }

      // 4. Revalidate CRM routes
      try {
        const { revalidatePath } = await import("next/cache");
        revalidatePath("/crm");
        revalidatePath("/crm/leads");
        revalidatePath("/crm/follow-ups");
        revalidatePath("/crm/activities");
      } catch {
        // Cache revalidation optional
      }
    } catch (dbError) {
      // Graceful fallback if database connection / credentials are offline or unconfigured
      console.warn("[POST /api/contact] Database lead persistence failed, capturing to fallback log:", {
        name,
        email,
        phone,
        company,
        service,
        budget,
        timeline,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      savedToDb,
      leadId,
      message: "Thank you for reaching out. We have received your inquiry and will be in touch within 24 business hours.",
    });
  } catch (error) {
    console.error("[POST /api/contact]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your inquiry. Please email us directly at launchpadforge1618@gmail.com" },
      { status: 500 }
    );
  }
}
