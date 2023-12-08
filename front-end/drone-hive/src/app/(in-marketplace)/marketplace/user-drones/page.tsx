"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import useWalletStore from "@/hooks/context/useWalletStore";
import useDroneStore from "@/hooks/context/useDroneStore";
import { useRouter } from "next/navigation";
import { EditDroneModal } from '@/components/Dashboard/EditDroneModal';

const UserDrones: React.FC = () => {
  const { walletAddress, jwtToken } = useWalletStore();
  const { drones, setDrones, deleteDrone } = useDroneStore();
  const router = useRouter();
  const [editingDrone, setEditingDrone] = useState(null);

  useEffect(() => {
    const fetchUserDrones = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/drone-listing/user/${walletAddress}`
        );
        setDrones(data);
      } catch (error) {
        console.error("Failed to fetch user's drones:", error);
      }
    };

    if (walletAddress) {
      fetchUserDrones();
    }
  }, [walletAddress, setDrones]);

  const handleDelete = async (droneId: string) => {
    console.log("Sending JWT Token:", jwtToken);
    try {
      await axios.delete(`http://localhost:5000/drone-listing/${droneId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}` 
        }
      });
      deleteDrone(droneId);
      alert("Drone deleted successfully");
    } catch (error) {
      console.error("Failed to delete drone:", error);
    }
  };

  const handleSaveEdit = async (droneId: string, updatedData: FormData) => {
    try {
      const { data } = await axios.put(`http://localhost:5000/drone-listing/${droneId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      console.log('JWT Token Edit:', jwtToken);
      setDrones(drones.map(drone => drone.droneId === droneId ? { ...drone, ...updatedData } : drone));
      setEditingDrone(null);
      alert("Drone updated successfully");
    } catch (error) {
      console.error("Failed to update drone:", error);
    }
  };

  const handleEditClick = (drone: any) => {
    setEditingDrone(drone);
  };

  const navigateToNewOrder = () => {
    router.push("/marketplace/user-drones/new-drone-order");
  };

  if (!drones.length) {
    return <div className="text-white">No drones found.</div>;
  }

  return (
    <div>
      <button
        onClick={navigateToNewOrder}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Create New Drone
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {drones.map((drone) => (
          <div key={drone.droneId} className="bg-gray-800 rounded-lg shadow-lg p-4">
            <h3 className="text-xl text-white font-semibold mb-2">{drone.title}</h3>
            <p className="text-gray-300">{drone.description}</p>
            {drone.ownerWalletAddress === walletAddress && (
              <div className="flex space-x-2 mt-4">
                <button onClick={() => handleEditClick(drone)} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300">
                  Edit
                </button>
                <button onClick={() => handleDelete(drone.droneId)} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {editingDrone && (
        <EditDroneModal
          drone={editingDrone}
          onClose={() => setEditingDrone(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default UserDrones;
