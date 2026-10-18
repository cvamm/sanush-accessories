import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanush Accessories — Everyday Gold, Made to Glow",
  description: "Discover anti-tarnish, 18K gold-plated everyday jewelry from Sanush Accessories. Browse the edit and order directly through Instagram.",
  applicationName: "Sanush Accessories",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
