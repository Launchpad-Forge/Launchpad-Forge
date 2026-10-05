"use client";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

// Dynamic imports for performance
const LoadingScreen = dynamic(() => import("@/components/ui/LoadingScreen"), { ssr: false });
const Hero = dynamic(() => import("@/components/sections/Hero"), { ssr: false });
const MarqueeBands = dynamic(() => import("@/components/sections/MarqueeBands"));
const WhatWeBuild = dynamic(() => import("@/components/sections/WhatWeBuild"), { ssr: false });
const TechEcosystem = dynamic(() => import("@/components/sections/TechEcosystem"));
const IdeaToImpact = dynamic(() => import("@/components/sections/IdeaToImpact"), { ssr: false });
const CaseStudies = dynamic(() => import("@/components/sections/CaseStudies"));
const SystemBuilder = dynamic(() => import("@/components/sections/SystemBuilder"));
const TypographicStory = dynamic(() => import("@/components/sections/TypographicStory"), { ssr: false });
const WhyLaunchpadForge = dynamic(() => import("@/components/sections/WhyLaunchpadForge"), { ssr: false });
const TechConstellation = dynamic(() => import("@/components/sections/TechConstellation"), { ssr: false });
const About = dynamic(() => import("@/components/sections/About"), { ssr: false });
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      <LoadingScreen />
      <Navigation />

      <main className="relative">
        <Hero />
        <MarqueeBands />
        <WhatWeBuild />
        <TechEcosystem />
        <IdeaToImpact />
        <TypographicStory />
        <CaseStudies />
        <SystemBuilder />
        <WhyLaunchpadForge />
        <TechConstellation />
        <About />
        <MarqueeBands />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
