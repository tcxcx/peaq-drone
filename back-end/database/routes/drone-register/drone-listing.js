require("dotenv").config();
const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const fs = require("fs").promises;

const upload = multer({ dest: "uploads/" });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLIC
);

const uploadImageToSupabase = async (imageFile) => {
  const filePath = `drones/${Date.now()}_${imageFile.originalname}`;
  const fileBuffer = await fs.readFile(imageFile.path);
  const { data, error } = await supabase.storage
    .from("drone-images")
    .upload(filePath, fileBuffer, {
      contentType: imageFile.mimetype,
    });
  if (error) throw error;
  return filePath;
};

// Fetch All Drones
// This endpoint retrieves all the drones listed in the database.
router.get("/", async (req, res) => {
    try {
      let { data: drones, error } = await supabase.from("Drones").select("*");
      if (error) throw error;
      drones = drones.map(drone => {
        if (drone.imagePath) {
            // https://tdbuogudqjkikprfmrxr.supabase.co/storage/v1/object/public/drone-images/1701972027016_drone-bg.png
          drone.imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/drone-images/${drone.imagePath}`;
        }
        return drone;
      });
      res.status(200).json(drones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Create a New Drone
// This endpoint allows a user to register a new drone.
router.post(
  "/",
  upload.single("image"),
  body("ownerWalletAddress").isString(),
  body("title").isString(),
  body("description").isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let imagePath = null;
    if (req.file) {
      try {
        imagePath = await uploadImageToSupabase(req.file);
      } catch (error) {
        console.error("Error uploading image:", error);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    try {
      const { ownerWalletAddress, title, description } = req.body;
      const { data, error } = await supabase
        .from("Drones")
        .insert([{ ownerWalletAddress, title, description, imagePath }]);
      if (error) throw error;
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update a Drone
// This endpoint allows updating details of an existing drone.

router.put(
    "/:droneId",
    upload.single("image"),
    body("ownerWalletAddress").optional().isString(),
    body("title").optional().isString(),
    body("description").optional().isString(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { droneId } = req.params;
      const updates = req.body;
  
      let imagePath = null;
      if (req.file) {
        try {
          imagePath = await uploadImageToSupabase(req.file);
          updates.imagePath = imagePath;
        } catch (error) {
          console.error("Error uploading image:", error);
          return res.status(500).json({ error: "Failed to upload image" });
        }
      }
  
      try {
        const { data, error } = await supabase
          .from("Drones")
          .update(updates)
          .match({ droneId });
  
        if (error) throw error;
  
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  );
  
  module.exports = router;

// Delete a Drone
// This endpoint allows a user to delete their drone.

router.delete("/:droneId", async (req, res) => {
  const { droneId } = req.params;

  try {
    const { data, error } = await supabase
      .from("Drones")
      .delete()
      .match({ droneId });

    if (error) throw error;

    res.status(200).json({ message: "Drone deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch Drones for a Specific User
// This endpoint fetches all drones owned by a specific user.

router.get("/user/:walletAddress", async (req, res) => {
  const { walletAddress } = req.params;
  if (!isValidWalletAddress(walletAddress)) {
    return res.status(400).json({ error: "Invalid wallet address" });
  }
  try {
    const { data, error } = await supabase
      .from("Drones")
      .select("*")
      .eq("ownerWalletAddress", walletAddress);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
function isValidWalletAddress(address) {
  // Check if the address is exactly 48 characters long as substrate addresses are
  return address && typeof address === "string" && address.length === 48;
}

module.exports = router;
