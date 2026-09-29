import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Launchpad Forge | Build. Automate. Grow.",
  description:
    "Launchpad Forge builds software, AI systems, automation and digital infrastructure for modern businesses.",
  keywords: [
    "software development",
    "AI systems",
    "automation",
    "digital infrastructure",
    "cloud",
    "web development",
    "app development",
  ],
  openGraph: {
    title: "Launchpad Forge | Build. Automate. Grow.",
    description:
      "Launchpad Forge builds software, AI systems, automation and digital infrastructure for modern businesses.",
    type: "website",
    locale: "en_US",
    siteName: "Launchpad Forge",
  },
  twitter: {
    card: "summary_large_image",
    title: "Launchpad Forge | Build. Automate. Grow.",
    description:
      "Launchpad Forge builds software, AI systems, automation and digital infrastructure for modern businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col noise">{children}</body>
    </html>
  );
}
