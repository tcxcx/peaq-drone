"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/UI/skeleton";
import ProductCard from "@/components/Dashboard/ProductCard";

export interface DronesListed {
  droneId: string;
  ownerWalletAddress: string;
  name: string;
  description: string;
  imageUrl?: string;
  machineId: string;
}

const Marketplace: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["DronesListed"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/drone-listing");
      return data;
    },
  });
  const network = "polkadot";
  const skeletonCount = 8;

  return (
    <div
      className="grid gap-4 p-4"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      }}
    >
      {isLoading
        ? Array.from({ length: skeletonCount }, (_, index) => (
            <Skeleton key={index} className="h-120" />
          ))
        : data?.map((drone: DronesListed) => (
            <ProductCard key={drone.droneId} {...drone} network={network} />
          ))}
    </div>
  );
};

export default Marketplace;
