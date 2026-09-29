"use client";
import Marquee from "@/components/ui/Marquee";

export default function MarqueeBands() {
  return (
    <section className="py-12 border-y border-white/5">
      <Marquee direction="left" speed={25}>
        {["SOFTWARE", "AI", "AUTOMATION", "DATA", "CLOUD"].map((item) => (
          <span
            key={item}
            className="text-4xl md:text-6xl font-bold text-foreground mx-6 md:mx-10 tracking-tight"
          >
            {item}
            <span className="text-[var(--accent)] mx-4 md:mx-6">×</span>
          </span>
        ))}
      </Marquee>

      <div className="accent-line my-4" />

      <Marquee direction="right" speed={35}>
        {["BUILD", "AUTOMATE", "SCALE", "REPEAT"].map((item) => (
          <span
            key={item}
            className="text-2xl md:text-4xl font-bold text-foreground mx-6 md:mx-10 tracking-tight"
          >
            {item}
            <span className="text-[var(--accent)]/30 mx-4 md:mx-6">/</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

