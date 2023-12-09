// LazySpline.js
import React, { useState } from "react";
import Spline from "@splinetool/react-spline";
import { Skeleton } from "../UI/skeleton";

const LazySpline = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative rounded-2xl bg-gradient-to-b from-white/5 to-white/10 p-2 shadow-2xl shadow-white/10 ring-1 ring-white/10 backdrop-blur-sm lg:rounded-3xl flex justify-center items-center">
      {!isLoaded && <Skeleton className="absolute w-full h-full" />}
      <Spline
        scene="https://prod.spline.design/ER9WSytWeWr-G2kO/scene.splinecode"
        onLoad={() => setIsLoaded(true)}
        style={{ display: isLoaded ? "block" : "none", width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LazySpline;
