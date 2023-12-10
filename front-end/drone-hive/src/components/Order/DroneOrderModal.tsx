import React, { useState, useEffect } from "react";
import useWalletStore from "@/hooks/context/useWalletStore";
import { generateSpheres } from "@/components/Dashboard/ProductCard";
import DroneOrderProcess from "@/components/Order/DroneOrderProcess";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useOrderActions from "@/hooks/CRUD/useOrderActions";
import { toast } from "sonner";

interface DroneOrderModalProps {
  onClose: () => void;
}

interface DronesListed {
  droneId: string;
  title: string;
  description: string;
}

const backgroundSpheres = generateSpheres(1000, ["5px", "3.5", "1.25px"]).map(
  (sphere, index) =>
    React.cloneElement(sphere, {
      style: {
        ...sphere.props.style,
        zIndex: -1,
        opacity: 0.5,
        animationDuration: `${60 + index * 10}s`,
      },
    })
);

const DroneOrderModal: React.FC<DroneOrderModalProps> = ({ onClose }) => {
  const { walletAddress } = useWalletStore();
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [step, setStep] = useState<"details" | "process" | "review">("details");
  const [selectedDrone, setSelectedDrone] = useState<string>("");
  const { createOrder } = useOrderActions();
  const [orderId, setOrderId] = useState<string>("");

  const { data: drones, isLoading: isLoadingDrones } = useQuery<DronesListed[]>(
    {
      queryKey: ["DronesListed"],
      queryFn: async () => {
        const { data } = await axios.get("http://localhost:5000/drone-listing");
        return data;
      },
    }
  );
  console.log("Wallet Address from Context:", walletAddress);

  const handleSubmitDetails = async (event:any) => {
    event.preventDefault();
    if (!selectedDrone) {
      toast.error("Please select a drone for your order.");
      return;
    }
  
    const createdOrderId = await createOrder(walletAddress, selectedDrone, address, description);
    console.log("Created Order ID:", createdOrderId); 
  
    if (createdOrderId) {
      setOrderId(createdOrderId);
      setStep("process");
    } else {
      toast.error("Failed to create order");
      // Additional error handling logic here
    }
  };
  

  const handleRating = (newRating: number) => {
    setRating(newRating);
    setStep("review");
  };

  const handleClose = () => {
    onClose();
    setStep("details");
    setRating(null);
  };

  return (
    <div className="fixed inset-0 bg-black-tr bg-opacity-80 flex justify-center items-center z-50">
      {backgroundSpheres}

      <div className="border glassmorphism border-basement-purple/30 p-10 rounded-lg shadow-lg">
        {step === "details" && (
          <form onSubmit={handleSubmitDetails}>
            <div className="mb-4">
              <label className="block text-white text-base font-bold mb-2 font-ribbon uppercase">
                Select a Drone:
              </label>
              <select
                value={selectedDrone}
                onChange={(e) => setSelectedDrone(e.target.value)}
                className="appearance-none border border-basement-purple/50 focus:border-basement-purple/90 hover:bg-basement-purple/10 focus:bg-basement-purple/10 rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent text-white"
                required
              >
                <option value="" className="text-black">
                  Select a drone
                </option>
                {!isLoadingDrones &&
                  drones &&
                  drones.map((drone) => (
                    <option
                      key={drone.droneId}
                      value={drone.droneId}
                      className="text-black"
                    >
                      {drone.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-base font-bold mb-2 font-ribbon uppercase">
                Delivery Address:
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="appearance-none border border-basement-purple/50 focus:border-basement-purple/90 hover:bg-basement-purple/10 focus:bg-basement-purple/10  rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-base font-bold mb-2 font-ribbon uppercase">
                Description:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="appearance-none border border-basement-purple/50 focus:border-basement-purple/90 hover:bg-basement-purple/10 focus:bg-basement-purple/10  rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent text-white"
                required
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={onClose}
                className="bg-transparent border font-ribbon uppercase hover:animate-pulse border-basement-purple hover:bg-basement-purple/20 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-transparent border font-ribbon uppercase hover:animate-pulse border-basement-purple hover:bg-basement-purple/20 text-white font-bold py-2 px-4 rounded"
              >
                Submit Order
              </button>
            </div>
          </form>
        )}
        {step === "process" && (
          <DroneOrderProcess
            onClose={onClose}
            orderId={orderId}
            handleRating={handleRating}
          />
        )}

        {step === "review" && (
          <div>
            <button onClick={handleClose}>Submit Review</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DroneOrderModal;
