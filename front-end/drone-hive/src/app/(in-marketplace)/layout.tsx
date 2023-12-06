"use client";

import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left panel component */}
        <div className="w-full h-full lg:w-1/5 py-0 px-8 md:px-16 lg:px-20 xl:px-40 bg-zinc-900/5">
          {/* Content for Left Panel */}
        </div>

        {/* Right panel component */}
        <div className="hidden sm:block relative lg:w-4/5 bg-zinc-900/10">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(180deg,black,transparent)]"></div>
          {children}
        </div>
      </div>
    </>
  );
}
