"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import truncateMiddle from "truncate-middle";

export interface DronesListed {
  droneId: string;
  ownerWalletAddress: string;
  title: string;
  description: string;
  imageUrl?: string;
}

  const Marketplace: React.FC = () => {
    const { data } = useQuery({
      queryKey: ["DronesListed"],
      queryFn: async () => {
        const { data } = await axios.get("http://localhost:5000/drone-listing");
        return data;
      },
    });
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data?.map((drone: DronesListed) => (
        <div
          key={drone.droneId}
          className="bg-transparent border border-white rounded-lg shadow-md p-4"
        >
          {drone.imageUrl && (
            <img
              src={drone.imageUrl}
              alt={drone.title}
              className="mb-4 w-full h-auto object-cover rounded"
            />
          )}
          <div className="card-content mb-4">
            <h3 className="text-xl font-ribbon font-semibold mb-2">
              {drone.title}
            </h3>
            <p className="text-gray-600">{drone.description}</p>
          </div>
          <button className="bg-transparent border border-basement-purple hover:bg-basement-purple/20 text-white font-bold py-2 px-4 rounded">
            View details
          </button>
          <p className="text-gray-600 text-xs">
            {truncateMiddle(drone.ownerWalletAddress, 5, 5, "...")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Marketplace;
