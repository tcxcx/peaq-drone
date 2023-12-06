import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./styles/globals.css";
import { Toaster } from "sonner";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: "Peaq Network Technical Task",
  description: "Next.js 14 with Tailwind css",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}