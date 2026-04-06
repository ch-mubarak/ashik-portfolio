import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import ProgressBar from "@/components/ui/ProgressBar";
import FloatingCTA from "@/components/ui/FloatingCTA";
import Preloader from "@/components/ui/Preloader";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ashik K — Digital Marketing Executive",
  description:
    "Digital Marketing Executive with 2+ years driving measurable growth through SEO, Meta Ads, Google Ads, and data-driven content strategy.",
  keywords: ["Digital Marketing", "SEO", "Google Ads", "Meta Ads", "Content Strategy", "Growth Marketing", "Ashik K"],
  openGraph: {
    title: "Ashik K — Digital Marketing Executive",
    description: "Turning digital noise into measurable growth. SEO • Paid Ads • Content Strategy.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashik K — Digital Marketing Executive",
    description: "Turning digital noise into measurable growth.",
  },
  themeColor: "#050510",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${dmSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#050510] text-[#F0F0FF] antialiased overflow-x-hidden">
        <Preloader />
        <ProgressBar />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <FloatingCTA />
      </body>
    </html>
  );
}
