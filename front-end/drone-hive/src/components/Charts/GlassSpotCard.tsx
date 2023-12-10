"use client";
import React, { ReactNode } from "react";
import { staggerContainer, textVariant } from "@/hooks/animations/index";
import { motion } from "framer-motion";

type GlassSpotCardProps = {
  children: ReactNode;
};

const GlassSpotCard: React.FC<GlassSpotCardProps> = ({ children }) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      className="relative"
      viewport={{ once: false, amount: 0.1 }}
    >
      <motion.div
        variants={textVariant(0.4)}
        className="relative mx-auto w-full max-w-5xl mt-4 z-10"
      >
        <div className="absolute -top-8 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-basement-purple/25 blur-3xl lg:h-[20rem] lg:w-[20rem] lg:blur-[128px]"></div>

        <div className="relative w-full rounded-2xl bg-gradient-to-b from-white/5 to-white/10 p-2 shadow-2xl shadow-basement-green/10 ring-1 ring-white/10 backdrop-blur-sm lg:rounded-3xl">
          <div className="relative flex flex-col items-center justify-center w-full h-full p-4">
            <div className="relative w-full max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GlassSpotCard;
