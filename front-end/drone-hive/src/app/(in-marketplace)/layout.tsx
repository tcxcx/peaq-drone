"use client";

import React from "react";
import { Sidebar } from "@/components/Dashboard/Sidebar";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-row h-screen">
        {/* Left panel component */}
        <div className="bg-zinc-900/5 glassmorphism">
          <Sidebar />
        </div>

        {/* Right panel component */}
        <div className="block sm:block relative lg:w-full bg-zinc-900/10 z-10">
          <div className="absolute -z-10 inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(180deg,black,transparent)]"></div>
          {children}
        </div>
      </div>
    </>
  );
}
