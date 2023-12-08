// hooks/useDroneActions.js

import axios from "axios";
import useWalletStore from "@/hooks/context/useWalletStore";
import useDroneStore from "@/hooks/context/useDroneStore";
import { sonner, toast } from 'sonner'

const useDroneActions = () => {
  const { jwtToken } = useWalletStore();
  const { setDrones, deleteDrone } = useDroneStore();

  const deleteDroneById = async (droneId) => {
    try {
      await axios.delete(`http://localhost:5000/drone-listing/${droneId}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      deleteDrone(droneId);
      toast.success("Drone deleted successfully");
    } catch (error) {
      console.error("Failed to delete drone:", error);
      toast.error("Failed to delete drone");

    }
  };
  
  const editDrone = async (droneId, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/drone-listing/${droneId}`, updatedData, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setDrones(drones => drones.map(drone => drone.droneId === droneId ? { ...drone, ...updatedData } : drone));
      toast.success("Your Drone was updated successfully");
    } catch (error) {
      console.error("Failed to update drone:", error);
      toast.error("Failed to update drone");
    }
  };

  return { deleteDroneById, editDrone };
};


export default useDroneActions;
