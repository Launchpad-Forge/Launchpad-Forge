"use server";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as dal from "@/lib/dal";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
  service: z.string().max(80).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, company, service, message } = parsed.data;

    // Build notes from the message field
    const notes = [
      service ? `Service interested in: ${service}` : null,
      message ? `Project details: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    await dal.createLead({
      name,
      email: email || undefined,
      phone: phone || undefined,
      companyName: company || undefined,
      serviceInterestedIn: service || undefined,
      notes: notes || undefined,
      source: "Website Contact Form",
      status: "New",
      priority: "Medium",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[POST /api/contact]", error);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }
}
