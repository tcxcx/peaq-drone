"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import DroneOrderModal from "@/components/Order/DroneOrderModal";
import useWalletStore from "@/hooks/context/useWalletStore";
import GlassSpotCard from "@/components/Charts/GlassSpotCard";
const MyOrders = () => {
  const router = useRouter();
  const [showOrderProcess, setShowOrderProcess] = useState(false);
  const { walletAddress } = useWalletStore();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["UserOrders", walletAddress],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/orders/user-orders/${walletAddress}`
      );
      return response;
    },
  });
  console.log("here is the order list 2", orders?.data);

  const goToSpecificOrder = (orderId: any) => {
    router.push(`/marketplace/my-orders/${orderId}`);
  };

  const createNewDroneOrder = () => {
    setShowOrderProcess(true);
  };

  const handleCloseModal = () => {
    setShowOrderProcess(false);
  };

  return (
    <div className="container mx-auto p-4 z-10">
      <section className="mt-8">
        <button
          className="bg-transparent border inline-flex font-ribbon uppercase hover:animate-pulse border-basement-purple hover:bg-basement-purple/20 text-white font-bold py-2 px-4 rounded"
          onClick={createNewDroneOrder}
        >
          Create New Drone Order
        </button>
        {showOrderProcess && <DroneOrderModal onClose={handleCloseModal} />}
        <h1 className="text-xl font-semibold my-4">Your Order History</h1>
        {isLoading ? (
          <p>Loading orders...</p>
        ) : orders && Array.isArray(orders.data) ? (
          orders.data.map((order) => (
            <div
              key={order.orderId}
              onClick={() => goToSpecificOrder(order.orderId)}
            >
              <GlassSpotCard>
                <h2 className="text-lg font-bold mb-2">
                  Order {order.orderId}
                </h2>
                <ul>
                  <li>Wallet Address: {order.walletAddress}</li>
                  <li>Drone ID: {order.droneId}</li>
                  <li>Order Status: {order.orderStatus}</li>
                  <li>Created At: {order.createdAt}</li>
                </ul>
              </GlassSpotCard>
            </div>
          ))
        ) : (
          <p>No orders available.</p>
        )}
      </section>
    </div>
  );
};

export default MyOrders;
