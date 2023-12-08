import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./styles/globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import TanstackProvider from "@/libs/TanstackProviders";

export const metadata: Metadata = {
  title: "Drone Hive — Technical Task",
  description:
    "This webpage was created as per the requirements of the Peaq Network Full-Stack developer candidacy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="h-full">
        <TanstackProvider>
          {children}
          <Analytics />
          <Toaster />
        </TanstackProvider>
      </body>
    </html>
  );
}
