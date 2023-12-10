"use client";

import { generateSpheres } from "@/components/Dashboard/ProductCard";
import React, { useRef } from "react";
import useHoverEffect from "@/hooks/animations/useHoverEffect";
import { Signature } from "@/components/UI/Signature";
import BackRoute from '@/components/UI/BackRoute';

export default function ForgotApplication() {
  const titleRef = useRef(null);
  const titleRef2 = useRef(null);
  const titleRef3 = useRef(null);
  const titleRef4 = useRef(null);
  const titleRef5 = useRef(null);
  const titleRef6 = useRef(null);

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
  useHoverEffect(titleRef6);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      {backgroundSpheres}
      <div className="text-center z-10">
        <Signature />
        <p className="text-white font-ribbon uppercase text-xl">
          <span ref={titleRef}> Protect your seed phrase.</span>
          <br />
          <span ref={titleRef2}>Not your keys, </span>
          <br />
          <span>
            <span className="line-through"> not your coins</span>{" "}
          </span>
          <span ref={titleRef6}>signature. </span>
          <br />
          <span ref={titleRef3}> I don't know, nor have - your password.</span>
          <br />
          <span ref={titleRef4}> And I don't want to.</span>
          <br />
          <a
            href="https://bitcoin.org/bitcoin.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-basement-green"
          >
            <span ref={titleRef5}> Long live the blockchain!</span>
          </a>{" "}
        </p>
      </div>
      <BackRoute text="/log-in" className="absolute top-20 left-20 z-10" />
    </div>
  );
}
