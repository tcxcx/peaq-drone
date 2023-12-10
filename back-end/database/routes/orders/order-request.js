require("dotenv").config();
const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLIC
);

router.post("/create-order", async (req, res) => {
    const { walletAddress, droneId, address, description } = req.body;
  
    try {
      // Insert the order and get the generated orderId
      const { data: orderData, error: orderError } = await supabase
        .from("Orders")
        .insert([{ walletAddress, droneId, orderStatus: "pending" }])
        .select("orderId");  // Add select to get the orderId
  
      if (orderError || !orderData) {
        console.error("Error creating order:", orderError);
        return res.status(500).json({ error: "Error creating order" });
      }
  
      const orderId = orderData[0].orderId; // Fetch the orderId
  
      const { error: detailsError } = await supabase
        .from("OrderDetails")
        .insert([{ orderId, address, description }]);
  
      if (detailsError) {
        console.error("Error inserting order details:", detailsError);
        return res.status(500).json({ error: "Error inserting order details" });
      }
  
      res.status(201).json({ message: "Order created successfully", orderId });
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  });  

router.put("/update-order/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  try {
    const { error } = await supabase
      .from("Orders")
      .update({ orderStatus })
      .match({ orderId });

    if (error) throw error;

    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/submit-rating/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { rating, comment } = req.body;

  try {
    const { error } = await supabase
      .from("OrderDetails")
      .update({ rating, comment })
      .match({ orderId });

    if (error) throw error;

    res.status(200).json({ message: "Rating submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//   List All Orders Per User
router.get("/user-orders/:walletAddress", async (req, res) => {
    const { walletAddress } = req.params;
    console.log("Fetching orders for wallet address:", walletAddress);
  
    try {
      const { data: orders, error } = await supabase
        .from("Orders")
        .select("*, OrderDetails(*)")
        .eq("walletAddress", walletAddress);
  
      if (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ error: error.message });
      }
  
      if (orders.length === 0) {
        console.log("No orders found for wallet address:", walletAddress);
        return res.status(404).json({ message: "No orders found" });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  });
  
  
// Display All Comments and Reviews

router.get("/reviews", async (req, res) => {
  try {
    const { data: reviews, error } = await supabase.from("Reviews").select("*");

    if (error) throw error;
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function isValidWalletAddress(address) {
    // Check if the address is exactly 48 characters long as substrate addresses are
    return address && typeof address === "string" && address.length === 48;
  }
module.exports = router;
