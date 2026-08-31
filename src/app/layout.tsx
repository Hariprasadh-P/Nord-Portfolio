import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cinzel, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/portfolio/CustomCursor";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NORD MEDIA HOUSE | Digital Marketing · Creative · Growth",
  description:
    "Find your bearing — three routes to grow your brand's presence. 4K commercials, social media handling, and Meta ads management.",
  keywords: [
    "Nord Media House",
    "Creative Production Agency",
    "Digital Marketing Agency",
    "Meta Ads Management",
    "Reels Production",
  ],
  authors: [{ name: "Nord Media House" }],
  openGraph: {
    title: "NORD MEDIA HOUSE | Digital Marketing · Creative · Growth",
    description:
      "Find your bearing — three routes to grow your brand's presence.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF8FF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${cinzel.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-background text-brand-950 font-sans antialiased selection:bg-brand-200 selection:text-brand-950">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
