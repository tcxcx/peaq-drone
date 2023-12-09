import clsx from "clsx";
import Image from "next/image";

export function Logo({ className }) {
  return (
    <div className={clsx("flex items-center whitespace-nowrap font-display uppercase font-ribbon", className)}>
      {/* Image icon */}
      <div className="mr-2 flex-shrink-0">
        <Image
          src="/drone-hive-full-logo.webp" // Replace with your image path
          alt="Drone Icon"
          priority
          width={100} 
          height={100} 
        />
      </div>
    </div>
  );
}
