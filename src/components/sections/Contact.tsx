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
      message: fd.get("message") as string,
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
    <section id="contact" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="label mb-6 justify-center lg:justify-start flex items-center">
              <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3" />
              LET&apos;S TALK
            </div>

            <h2 className="heading-xl mb-6">
              READY TO<br />
              <span className="gradient-text-accent">BUILD WHAT&apos;S NEXT?</span>
            </h2>

            <p className="body-lg mb-10 text-[var(--text-secondary)]">
              Tell us what you&apos;re trying to build, automate, or improve. We&apos;re ready to turn your ideas into high-performance systems.
            </p>

            <div className="hidden lg:block">
              <MagneticButton
                variant="primary"
                href="mailto:launchpadforge1618@gmail.com"
                cursorText="EMAIL US"
              >
                launchpadforge1618@gmail.com →
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              ref={formRef}
              className="glass-elevated p-8 md:p-10 rounded-[2rem] space-y-6 relative overflow-hidden"
              onSubmit={handleSubmit}
            >
              {/* Form subtle glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 blur-[100px] rounded-full pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Name *</label>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="w-full bg-surface-elevated/50 border border-border-subtle rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:border-[var(--accent)] focus:bg-foreground/5 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="w-full bg-surface-elevated/50 border border-border-subtle rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:border-[var(--accent)] focus:bg-foreground/5 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Mobile Number</label>
                  <div className="flex w-full bg-surface-elevated/50 border border-border-subtle rounded-xl focus-within:border-[var(--accent)] focus-within:bg-foreground/5 transition-all duration-300">
                    <div className="relative flex-shrink-0 flex items-center gap-2 pl-4 pr-3 py-3.5">
                      <span className="text-foreground text-sm font-medium pointer-events-none">{countryCode}</span>
                      <svg className="w-4 h-4 text-[var(--text-secondary)] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-sm"
                      >
                        <option value="+91" className="bg-[var(--surface)] text-[var(--foreground)]">India (+91)</option>
                        {COUNTRY_CODES.filter(c => c.code !== "+91").map((country) => (
                          <option key={`${country.name}-${country.code}`} value={country.code} className="bg-[var(--surface)] text-[var(--foreground)]">
                            {country.name} ({country.code})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-px bg-border-subtle my-3 opacity-50 flex-shrink-0" />
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel-national"
                      className="w-full flex-1 bg-transparent border-none px-4 py-3.5 text-foreground focus:outline-none min-w-0"
                      placeholder="98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Company Name</label>
                  <input
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className="w-full bg-surface-elevated/50 border border-border-subtle rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:border-[var(--accent)] focus:bg-foreground/5 transition-all duration-300"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div className="relative z-10">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">What are you looking to build?</label>
                <select name="service" defaultValue="" className="w-full bg-surface-elevated/50 border border-border-subtle rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:border-[var(--accent)] focus:bg-foreground/5 transition-all duration-300 appearance-none">
                  <option value="" disabled className="bg-surface-elevated text-foreground">Select an option...</option>
                  <option value="web" className="bg-surface-elevated text-foreground">Web Application / Website</option>
                  <option value="mobile" className="bg-surface-elevated text-foreground">Mobile App</option>
                  <option value="ai" className="bg-surface-elevated text-foreground">AI Integration / Agents</option>
                  <option value="automation" className="bg-surface-elevated text-foreground">Business Automation</option>
                  <option value="other" className="bg-surface-elevated text-foreground">Something else</option>
                </select>
              </div>

              <div className="relative z-10">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Project Details</label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full bg-surface-elevated/50 border border-border-subtle rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:border-[var(--accent)] focus:bg-foreground/5 transition-all duration-300 resize-none"
                  placeholder="Tell us about your goals, timeline, and budget..."
                />
              </div>

              <div className="pt-2 relative z-10 space-y-3">
                {status === "success" && (
                  <p className="text-center text-sm font-medium text-green-400">✓ Your inquiry has been submitted! We'll be in touch soon.</p>
                )}
                {status === "error" && (
                  <p className="text-center text-sm text-[var(--accent)]">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-foreground font-medium rounded-xl py-4 transition-all duration-300 shadow-[0_0_20px_rgba(232,101,43,0.3)] hover:shadow-[0_0_30px_rgba(232,101,43,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Submitting…" : status === "success" ? "Submitted ✓" : "Submit Inquiry"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

