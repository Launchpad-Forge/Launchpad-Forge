"use client";
import { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import ContactScene from "@/components/three/ContactScene";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { COUNTRY_CODES } from "@/lib/countryCodes";

export default function Contact() {
  const isMobile = useIsMobile();
  const [countryCode, setCountryCode] = useState("+91");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const rawPhone = fd.get("phone") as string;
    const fullPhone = rawPhone ? `${countryCode} ${rawPhone}` : "";

    const body = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fullPhone,
      company: fd.get("company") as string,
      service: fd.get("service") as string,
      budget: fd.get("budget") as string,
      timeline: fd.get("timeline") as string,
      message: fd.get("message") as string,
      honeypot: (fd.get("website_url_hp") as string) || "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Submission failed");
      }
      setStatus("success");
      formRef.current?.reset();
      setCountryCode("+91");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="relative min-h-screen py-20 lg:py-32 flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        {!isMobile ? (
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
            >
              <ContactScene />
            </Canvas>
          </Suspense>
        ) : (
          <div className="absolute inset-0">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(232,101,43,0.15), transparent 70%)",
                filter: "blur(60px)",
              }}
            />
          </div>
        )}
      </div>

      {/* Gradient overlays for darkness transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-transparent to-[var(--background)] z-[1]" />

      {/* Content */}
      <div className="relative z-10 container-forge">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="label mb-6 justify-center lg:justify-start flex items-center">
              <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3" />
              START A PROJECT
            </div>

            <h2 className="heading-xl mb-6">
              READY TO<br />
              <span className="gradient-text-accent">BUILD WHAT&apos;S NEXT?</span>
            </h2>

            <p className="body-lg mb-8 text-[var(--text-secondary)]">
              Tell us what you&apos;re trying to build, automate, or improve. We review every inquiry personally and respond with initial architecture thoughts within 24 business hours.
            </p>

            <div className="space-y-4 mb-10 text-left hidden sm:block">
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <span>Direct engineer collaboration (no sales runaround)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <span>NDA signed prior to technical discovery on request</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <span>Transparent milestone estimates before commitments</span>
              </div>
            </div>

            <div className="hidden lg:block">
              <MagneticButton
                variant="secondary"
                href="mailto:launchpadforge1618@gmail.com"
                cursorText="DIRECT EMAIL"
              >
                launchpadforge1618@gmail.com →
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="glass-elevated p-6 sm:p-8 md:p-10 rounded-[2rem] relative overflow-hidden border border-white/10 shadow-2xl">
              {/* Form subtle glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 blur-[100px] rounded-full pointer-events-none" />

              {status === "success" ? (
                <div className="py-12 text-center space-y-6 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)] text-[var(--accent)] flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Inquiry Received</h3>
                  <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                    Thank you for detailing your project. Our technical team is reviewing your requirements and will reach out with availability and next steps within 24 business hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="inline-block rounded-xl border border-border-subtle hover:border-[var(--accent)] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-foreground/5 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  className="space-y-5 relative z-10"
                  onSubmit={handleSubmit}
                >
                  {/* Anti-spam Honeypot (hidden from human view) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_url_hp">Leave this empty</label>
                    <input type="text" name="website_url_hp" id="website_url_hp" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">Your Name *</label>
                      <input
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="w-full bg-surface-elevated/70 border border-border-subtle rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[var(--accent)] transition-all"
                        placeholder="Alex Morgan"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">Email Address</label>
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="w-full bg-surface-elevated/70 border border-border-subtle rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[var(--accent)] transition-all"
                        placeholder="alex@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">Phone / WhatsApp</label>
                      <div className="flex w-full bg-surface-elevated/70 border border-border-subtle rounded-xl focus-within:border-[var(--accent)] transition-all">
                        <div className="relative flex-shrink-0 flex items-center gap-1.5 pl-3.5 pr-2 py-3">
                          <span className="text-foreground text-xs font-semibold pointer-events-none">{countryCode}</span>
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-xs"
                            aria-label="Select Country Code"
                          >
                            <option value="+91" className="bg-[var(--surface)] text-[var(--foreground)]">India (+91)</option>
                            {COUNTRY_CODES.filter(c => c.code !== "+91").map((country) => (
                              <option key={`${country.name}-${country.code}`} value={country.code} className="bg-[var(--surface)] text-[var(--foreground)]">
                                {country.name} ({country.code})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="w-px bg-border-subtle my-2.5 opacity-40 flex-shrink-0" />
                        <input
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          className="w-full flex-1 bg-transparent border-none px-3 py-3 text-sm text-foreground focus:outline-none min-w-0"
                          placeholder="98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">Company / Organization</label>
                      <input
                        name="company"
                        type="text"
                        autoComplete="organization"
                        className="w-full bg-surface-elevated/70 border border-border-subtle rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[var(--accent)] transition-all"
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">Service</label>
                      <select name="service" defaultValue="" className="w-full bg-surface-elevated/70 border border-border-subtle rounded-xl px-3.5 py-3 text-xs text-foreground focus:outline-none focus:border-[var(--accent)] transition-all">
                        <option value="" disabled className="bg-surface-elevated">Select Service...</option>
                        <option value="web-design-development" className="bg-surface-elevated">Web Application / Flagship</option>
                        <option value="mobile-development" className="bg-surface-elevated">Mobile App (iOS/Android)</option>
                        <option value="ai-intelligence" className="bg-surface-elevated">AI Agent / Copilot / RAG</option>
                        <option value="workflow-automation" className="bg-surface-elevated">Workflow & WhatsApp Automation</option>
                        <option value="custom-software-mvp" className="bg-surface-elevated">Custom Software / MVP</option>
                        <option value="cloud-devops" className="bg-surface-elevated">Cloud & DevOps Retainer</option>
                        <option value="other" className="bg-surface-elevated">Other Solution</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">Budget Range</label>
                      <select name="budget" defaultValue="" className="w-full bg-surface-elevated/70 border border-border-subtle rounded-xl px-3.5 py-3 text-xs text-foreground focus:outline-none focus:border-[var(--accent)] transition-all">
                        <option value="" disabled className="bg-surface-elevated">Select Budget...</option>
                        <option value="$5k - $15k" className="bg-surface-elevated">$5k – $15k</option>
                        <option value="$15k - $30k" className="bg-surface-elevated">$15k – $30k</option>
                        <option value="$30k - $60k" className="bg-surface-elevated">$30k – $60k</option>
                        <option value="$60k+" className="bg-surface-elevated">$60k+</option>
                        <option value="Flexible" className="bg-surface-elevated">Flexible / Retainer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">Timeline</label>
                      <select name="timeline" defaultValue="" className="w-full bg-surface-elevated/70 border border-border-subtle rounded-xl px-3.5 py-3 text-xs text-foreground focus:outline-none focus:border-[var(--accent)] transition-all">
                        <option value="" disabled className="bg-surface-elevated">Target Launch...</option>
                        <option value="Immediate (< 1 month)" className="bg-surface-elevated">Immediate (&lt; 1 mo)</option>
                        <option value="1 - 2 months" className="bg-surface-elevated">1 – 2 months</option>
                        <option value="3 - 6 months" className="bg-surface-elevated">3 – 6 months</option>
                        <option value="Flexible" className="bg-surface-elevated">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">Project Overview & Goals</label>
                    <textarea
                      name="message"
                      rows={3}
                      className="w-full bg-surface-elevated/70 border border-border-subtle rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[var(--accent)] transition-all resize-none"
                      placeholder="Share your goals, current systems, pain points, or link to existing specs..."
                    />
                  </div>

                  <div className="pt-2 space-y-3">
                    {status === "error" && (
                      <p className="text-center text-xs text-[var(--accent)] bg-[var(--accent)]/10 py-2 px-3 rounded-lg border border-[var(--accent)]/20">{errorMsg}</p>
                    )}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-foreground font-semibold rounded-xl py-3.5 text-sm transition-all duration-300 shadow-[0_0_20px_rgba(232,101,43,0.3)] hover:shadow-[0_0_30px_rgba(232,101,43,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? "Submitting Inquiry…" : "Submit Qualified Inquiry →"}
                    </button>
                    <p className="text-[11px] text-center text-[var(--text-muted)]">
                      Zero spam. We treat all shared operational requirements with strict confidentiality.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

