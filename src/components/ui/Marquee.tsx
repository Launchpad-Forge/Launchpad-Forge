"use client";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export default function Marquee({
  children,
  direction = "left",
  speed = 30,
  className = "",
}: MarqueeProps) {
  return (
    <div className={`marquee-container overflow-hidden py-6 ${className}`}>
      <div
        className={direction === "left" ? "marquee-track" : "marquee-track-reverse"}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Duplicate content for seamless loop */}
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0">{children}</div>
      </div>
    </div>
  );
}
