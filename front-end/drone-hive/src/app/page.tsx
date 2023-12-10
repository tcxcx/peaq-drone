"use client";

import React from "react"; // Assuming this is your button component
import { Header } from "@/components/Landing/Header";
import { Hero } from "@/components/Landing/Hero";
import { PrimaryFeatures } from "@/components/Landing/PrimaryFeatures";
import { Signature } from "@/components/UI/Signature";
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <PrimaryFeatures />
      <Signature />
    </>
  );
}
