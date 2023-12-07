"use client";

import { useRouter } from "next/navigation";

const MyOrders = () => {
  const router = useRouter();

  // Function to navigate to a specific order
  const goToSpecificOrder = (orderId: any) => {
    router.push(`/marketplace/my-orders/${orderId}`);
  };

  // Function to navigate to the new drone order page
  const createNewDroneOrder = () => {
    router.push("/marketplace/my-orders/new-drone-order");
  };

  return (
    <div className="container mx-auto p-4 z-10">
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Activities</h2>
        {/* Placeholder for user activities */}
        <div className="border rounded-lg p-4 shadow-sm">
          <p>Your recent activities will appear here...</p>
          {/* Buttons for navigation */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => goToSpecificOrder("someOrderId")} // Replace 'someOrderId' with actual order ID
          >
            Go to Specific Order
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
            onClick={createNewDroneOrder}
          >
            Create New Drone Order
          </button>
        </div>
      </section>
    </div>
  );
};

export default MyOrders;
