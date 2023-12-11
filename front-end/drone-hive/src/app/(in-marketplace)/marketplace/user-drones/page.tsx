"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { EditDroneModal } from "@/components/Dashboard/EditDroneModal";
import useWalletStore from "@/hooks/context/useWalletStore";
import useDroneActions from "@/hooks/CRUD/useDroneActions.js";
import useFetchUserDrones from "@/hooks/CRUD/useFetchUserDrones";
import { Skeleton } from "@/components/UI/skeleton";
import { NewDroneModal } from "@/components/Dashboard/NewDroneModal";
import DroneItem from "@/components/Dashboard/DroneItem";

type Drone = {
  droneId: string;
  title: string;
  description: string;
  ownerWalletAddress: string;
  imageUrl?: string;
};

const UserDrones: React.FC = () => {
  const { walletAddress } = useWalletStore();
  const { deleteDroneById, editDrone } = useDroneActions();
  const { data: drones, isLoading } = useFetchUserDrones(walletAddress);
  const router = useRouter();
  const [editingDrone, setEditingDrone] = useState<Drone | null>(null);
  const [creatingDrone, setCreatingDrone] = useState(false);

  const isDronesArray = Array.isArray(drones);

  const handleEditClick = (drone: Drone) => {
    setEditingDrone(drone);
  };

  const handleNewDrone = async (newData: FormData) => {
    setCreatingDrone(false);
  };

  const handleSaveEdit = async (droneId: string, updatedData: FormData) => {
    await editDrone(droneId, updatedData);
    setEditingDrone(null);
  };

  const handleDelete = async (droneId: string) => {
    await deleteDroneById(droneId);
  };

  const navigateToNewOrder = () => {
    router.push("/marketplace/user-drones/new-drone-order");
  };

  if (isLoading) {
    const skeletonCount = 4;
    return (
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: skeletonCount }, (_, index) => (
          <Skeleton key={index} className="h-60" />
        ))}
      </div>
    );
  }

  if (!isDronesArray || drones.length === 0) {
    return <div className="text-white">No drones found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <button
          onClick={() => setCreatingDrone(true)}
          className="bg-transparent border font-ribbon uppercase hover:animate-pulse border-basement-purple hover:bg-basement-purple/20 text-white font-bold py-2 px-4 rounded-lg"
        >
          Create New Drone
        </button>
        {drones.map((drone) => (
          <DroneItem
            key={drone.droneId}
            drone={{
              ...drone,
              name: drone.title,
              imageUrl: drone.imageUrl || "",
            }}
            onEdit={() => handleEditClick(drone)}
            onDelete={() => handleDelete(drone.droneId)}
            isOwner={drone.ownerWalletAddress === walletAddress}
          />
        ))}
      </div>
      {editingDrone && (
        <EditDroneModal
          drone={{
            droneId: editingDrone.droneId,
            name: editingDrone.title,
            description: editingDrone.description,
            imageUrl: editingDrone.imageUrl || "",
          }}
          onClose={() => setEditingDrone(null)}
          onSave={handleSaveEdit}
        />
      )}
      {creatingDrone && (
        <NewDroneModal
          onClose={() => setCreatingDrone(false)}
          onSave={handleNewDrone}
        />
      )}
    </div>
  );
};

export default UserDrones;
