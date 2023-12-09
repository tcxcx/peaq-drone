"use client";

import { generateSpheres } from "@/components/Dashboard/ProductCard";
import React, { useRef } from "react";
import { Squirrel, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import useHoverEffect from "@/hooks/animations/useHoverEffect";

export default function ForgotApplication() {
  const router = useRouter();
  const titleRef = useRef(null);
  const titleRef2 = useRef(null);
  const titleRef3 = useRef(null);
  const titleRef4 = useRef(null);
  const titleRef5 = useRef(null);

  const backgroundSpheres = generateSpheres(1000, [
    "5px",
    "3.5px",
    "1.25px",
  ]).map((sphere, index) =>
    React.cloneElement(sphere, {
      style: {
        ...sphere.props.style,
        zIndex: -1,
        opacity: 0.9,
        animationDuration: `${30 + index * 10}s`,
      },
    })
  );
  useHoverEffect(titleRef);
  useHoverEffect(titleRef2);
  useHoverEffect(titleRef3);
  useHoverEffect(titleRef4);
  useHoverEffect(titleRef5);

  const GoBackLogin = () => {
    router.push("/log-in");
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      {backgroundSpheres}
      <div className="text-center z-10">
        <Squirrel className="h-20 w-20 mx-auto fill-green-400/10 stroke-[1] text-basement-green hover:text-basement-purple mb-4" />
        <p className="text-white text-lg font-ribbon uppercase">
          <span ref={titleRef}> Protect your seed phrase.</span>
          <br />
          <span ref={titleRef2}>Not your keys, </span>
          <br />
          <span>
            <span className="line-through"> not your coins</span> signature.{" "}
          </span>
          
          <br />
          <span ref={titleRef3}> I don't know, nor have - your password.</span>
          <br />
          <span ref={titleRef4}> And I don't want to.</span>
          <br />
          <span ref={titleRef5}> Long live the blockchain!</span>
        </p>
      </div>
      <button
        onClick={GoBackLogin}
        className="absolute top-20 left-20 z-10 text-white hover:text-basement-green flex items-center gap-2 uppercase font-ribbon hover:animate-pulse"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to login
      </button>
    </div>
  );
}
