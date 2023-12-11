import React from "react";
import truncateMiddle from "truncate-middle";
import {
  rotateClockwise,
  blinkAnimation,
  rotateAnticlockwise,
} from "@/components/UI/Keyframes";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";

export interface ProductCardProps {
  droneId: string;
  ownerWalletAddress: string;
  name: string;
  description: string;
  imageUrl?: string;
  network: string;
  machineId: string;
}
interface SphereProps extends React.HTMLAttributes<HTMLDivElement> {
  direction: "clockwise" | "anticlockwise";
  color: string;
  borderWidth: string;
}

const borderWidths = ["1.125px", "2.15px", "1.125px", "0.5px"];

export const BlinkDot = styled.div`
  animation: ${blinkAnimation} 1.5s infinite;
  height: 1.5px;
  width: 14px;
  border-radius: 10%;
  background-color: #4c09f6;
  position: absolute;
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.5s;
  }
  &:nth-child(3) {
    animation-delay: 1s;
  }
`;

export const BlinkDot2 = styled.div`
  animation: ${blinkAnimation} 1.5s infinite;
  height: 1.5px;
  width: 9px;
  border-radius: 10%;
  background-color: #5e22f7;
  position: absolute;
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.5s;
  }
  &:nth-child(3) {
    animation-delay: 1s;
  }
`;

export const BlinkDot3 = styled.div`
  animation: ${blinkAnimation} 1.5s infinite;
  height: 1.5px;
  width: 3px;
  border-radius: 10%;
  background-color: #a370ff;
  position: absolute;
  &:nth-child(1) {
    animation-delay: 2s;
  }
  &:nth-child(2) {
    animation-delay: 0.5s;
  }
  &:nth-child(3) {
    animation-delay: 1s;
  }
`;

export const Sphere = styled.div<SphereProps>`
  position: absolute;
  border-radius: 50%;
  border-style: dashed groove ridge dotted;
  animation: ${(props) =>
      props.direction === "clockwise" ? rotateClockwise : rotateAnticlockwise}
    60s linear infinite;
  backdrop-filter: blur(5px);
  border-color: ${(props) => props.color};
  border-width: ${(props) => props.borderWidth};
  box-shadow: 0 4px 30px rgba(0, 55, 75, 0.4);
`;

export const StaticSphere = styled.div`
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 30px rgba(0, 0, 75, 0.9);
  background-color: #00ff6a;
`;
const NUM_SPHERES = 4; // Example for 3 rotating spheres

export const generateSpheres = (size: number, borderWidths: string[]) => {
  let spheres = [];
  const spacing = 20; // Adjust the spacing between spheres here
  for (let i = 0; i < NUM_SPHERES; i++) {
    const borderWidth = borderWidths[i];
    spheres.push(
      <Sphere
        key={i}
        direction={i % 2 === 0 ? "clockwise" : "anticlockwise"}
        color={i === 0 ? "#4c09f6" : "#5e22f7"}
        borderWidth={borderWidth}
        style={{
          top: `calc(50% - ${size / 2}px)`,
          left: `calc(50% - ${size / 2}px)`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    );
    size -= parseInt(borderWidth, 10) * 2 + spacing;
  }
  return spheres;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  droneId,
  ownerWalletAddress,
  name,
  description,
  imageUrl,
  network,
  machineId,
}) => {
  const getPolkascanUrl = (walletAddress: string) => {
    return `https://polkascan.io/${network}/account/${walletAddress}`;
  };
  const router = useRouter();

  const handleClick = () => {
    router.push(`/marketplace/drone-analytics/${droneId}`);
  };

  // Initial size for the outermost sphere
  const initialSize = 180;

  return (
    <div
      className="bg-transparent hover:bg-basement-purple/10 border-2 relative border-white/10 hover:border-basement-purple rounded-lg shadow-md hover:glassmorphism p-4 flex flex-col transition-colors duration-200 ease-in-out"
      style={{ width: "250px", height: "400px" }}
    >
      {" "}
      <BlinkDot style={{ top: "10px", left: "10px" }} />
      <BlinkDot2 style={{ top: "10px", left: "28px" }} />
      <BlinkDot3 style={{ top: "10px", left: "42px" }} />
      <BlinkDot style={{ top: "10px", right: "10px" }} />
      <BlinkDot2 style={{ top: "10px", right: "28px" }} />
      <BlinkDot3 style={{ top: "10px", right: "42px" }} />
      <BlinkDot style={{ bottom: "10px", left: "10px" }} />
      <BlinkDot2 style={{ bottom: "10px", left: "28px" }} />
      <BlinkDot3 style={{ bottom: "10px", left: "42px" }} />
      <BlinkDot style={{ bottom: "10px", right: "10px" }} />
      <BlinkDot2 style={{ bottom: "10px", right: "28px" }} />
      <BlinkDot3 style={{ bottom: "10px", right: "42px" }} />
      {/* Rotating Spheres */}
      {generateSpheres(initialSize, borderWidths)}
      {/* Static Sphere with Image */}
      {/* Rest of the card content */}
      <div className="flex-grow mb-4">
        <h3 className="text-xl font-ribbon font-semibold mb-2">{name}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <StaticSphere
        style={{
          width: `${initialSize - NUM_SPHERES * 20}px`,
          height: `${initialSize - NUM_SPHERES * 20}px`,
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-auto object-cover p-1 rounded-full"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </StaticSphere>
      <button
        onClick={handleClick}
        className="bg-transparent border hover:animate-pulse border-basement-purple hover:bg-basement-purple/20 text-white font-bold py-2 px-4 rounded uppercase font-ribbon text-sm"
      >
        View details
      </button>
      <a
        href={getPolkascanUrl(ownerWalletAddress)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-basement-indigo hover:underline text-xs mt-2 font-ribbon up text-right"
      >
        <span className="uppercase text-basement-green">owner:</span>{" "}
        {truncateMiddle(ownerWalletAddress, 5, 5, "...")}
      </a>

      <a
        href={getPolkascanUrl(ownerWalletAddress)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-basement-indigo hover:underline text-xs mt-2 font-ribbon up text-right"
      >
        <span className="uppercase text-basement-green">Machine DID:</span>{" "}
        {truncateMiddle(machineId, 5, 5, "...")}
      </a>
    </div>
  );
};

export default ProductCard;
