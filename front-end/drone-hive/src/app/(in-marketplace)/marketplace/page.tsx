"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import truncateMiddle from "truncate-middle";
import { Skeleton } from "@/components/UI/skeleton";

export interface DronesListed {
  droneId: string;
  ownerWalletAddress: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const Marketplace: React.FC = () => {
  const { data, isLoading  } = useQuery({
    queryKey: ["DronesListed"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/drone-listing");
      return data;
    },
  });
  const network = 'polkadot';

  const getPolkascanUrl = (walletAddress: string) => {
    return `https://polkascan.io/${network}/account/${walletAddress}`;
  };

  const skeletonCount = 8;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {isLoading
        ? Array.from({ length: skeletonCount }, (_, index) => (
            <Skeleton key={index} className="h-120" />
          ))
        : data?.map((drone: DronesListed) => (
            <div
              key={drone.droneId}
              className="bg-transparent border border-white rounded-lg shadow-md p-4 flex flex-col"
            >
              {drone.imageUrl && (
                <img
                  src={drone.imageUrl}
                  alt={drone.title}
                  className="mb-4 w-full h-40 object-cover rounded"
                />
              )}
              <div className="flex-grow mb-4">
                <h3 className="text-xl font-ribbon font-semibold mb-2">
                  {drone.title}
                </h3>
                <p className="text-gray-600">{drone.description}</p>
              </div>
              <button className="bg-transparent border hover:animate-pulse border-basement-purple hover:bg-basement-purple/20 text-white font-bold py-2 px-4 rounded uppercase font-ribbon text-sm">
                View details
              </button>
              <a
                href={getPolkascanUrl(drone.ownerWalletAddress)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-basement-indigo hover:underline text-xs mt-2 font-ribbon text-right"
              >
                {truncateMiddle(drone.ownerWalletAddress, 5, 5, "...")}
              </a>
            </div>
          ))
      }
    </div>
  );
};

export default Marketplace;