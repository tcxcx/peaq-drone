"use client";

import { Application } from "@splinetool/runtime";
import React, { useEffect, useRef } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const app = new Application(canvasRef.current);
      app.load("https://prod.spline.design/tXIAYywFA-gtfsrz/scene.splinecode");
    }
  }, []);

  return (
    <>
      {/* Left panel component */}
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full h-full lg:w-1/2 py-0 px-8 md:px-16 lg:px-20 xl:px-40 bg-zinc-900/5">
          {children}
        </div>

        {/* Right panel component */}
        <div className="hidden sm:block relative lg:w-1/2 bg-zinc-900/10">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(180deg,black,transparent)]"></div>

          <canvas ref={canvasRef} className="relative w-full h-full z-10" />
        </div>
      </div>
    </>
  );
}
