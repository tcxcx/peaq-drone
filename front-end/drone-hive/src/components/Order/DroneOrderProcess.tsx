import React, { useState, useEffect } from "react";
import GlassSpotCard from "@/components/Charts/GlassSpotCard";
import useOrderActions from "@/hooks/CRUD/useOrderActions";

type OrderState = "pickup" | "delivering" | "delivered";

interface DroneOrderProcessProps {
  onClose: () => void;
  orderId: string;
  handleRating: (newRating: number) => void; // Add this line
}

const DroneOrderProcess: React.FC<DroneOrderProcessProps> = ({
  onClose,
  orderId,
  handleRating,
}) => {
  const [orderState, setOrderState] = useState("pickup");
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { submitRating, updateOrderStatus } = useOrderActions();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (orderState === "pickup") {
        setOrderState("delivering");
        updateOrderStatus(orderId, "delivering");
      } else if (orderState === "delivering") {
        setOrderState("delivered");
        updateOrderStatus(orderId, "delivered");
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [orderState, orderId, updateOrderStatus]);

  // Function to handle rating selection
  const selectRating = (newRating: number) => {
    setRating(newRating);
  };

  // Function to handle the submission of rating and comment
  const handleSubmit = async () => {
    if (rating === null) {
      alert("Please select a rating.");
      return;
    }

    await submitRating(orderId, rating, comment);
    setIsSubmitted(true);
  };

  return (
    <GlassSpotCard>
      <div className="p-4 text-center font-ribbon">
        <h2 className="text-lg font-semibold mb-2">Drone Order Status</h2>
        <p className="mb-1">Order ID: {orderId}</p>
        <p className="mb-4">Status: {orderState}</p>

        {orderState === "delivered" && !isSubmitted && (
          <>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => selectRating(star)}
                  className={`text-5xl ${
                    star <= (rating ?? 0) ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              className="appearance-none border border-basement-purple/50 focus:border-basement-purple/90 hover:bg-basement-purple/10 focus:bg-basement-purple/10  rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent text-white"
              placeholder="Leave a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="bg-transparent border inline-flex font-ribbon uppercase hover:animate-pulse border-basement-purple hover:bg-basement-purple/20 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Submit Review
            </button>
          </>
        )}

        {isSubmitted && (
          <>
            <p className="text-green-500 pb-4">Thank you for your feedback!</p>
            <button
              className="bg-transparent border inline-flex font-ribbon uppercase hover:animate-pulse border-basement-purple hover:bg-basement-purple/20 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              X Close
            </button>
          </>
        )}
      </div>
    </GlassSpotCard>
  );
};

export default DroneOrderProcess;
