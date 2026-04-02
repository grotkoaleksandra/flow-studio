import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Syrena Holistic — Tarot, Yoga, Energy Healing & Breathwork",
  description: "Holistic wellness — tarot readings, yoga, energy healing, breathwork, and sound baths to awaken your inner sight.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        {/* Add Google Fonts here if your locales need non-Latin scripts */}
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
