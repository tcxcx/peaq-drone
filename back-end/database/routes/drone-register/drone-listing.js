require('dotenv').config();
const express = require('express');
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const { body, validationResult } = require('express-validator');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLIC
);

// Fetch All Drones
// This endpoint retrieves all the drones listed in the database.
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Drones')
            .select('*');

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a New Drone
// This endpoint allows a user to register a new drone.
router.post('/',
    // Validation rules
    body('ownerWalletAddress').isString(),
    body('title').isString(),
    body('description').isString(),

    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { ownerWalletAddress, title, description } = req.body;

    try {
        const { data, error } = await supabase
            .from('Drones')
            .insert([{ ownerWalletAddress, title, description }]);

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Drone
// This endpoint allows updating details of an existing drone.

router.put('/:droneId',
    // Validation rules
    body('ownerWalletAddress').optional().isString(),
    body('title').optional().isString(),
    body('description').optional().isString(),

    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { droneId } = req.params;
        const updates = req.body;


    try {
        const { data, error } = await supabase
            .from('Drones')
            .update(updates)
            .match({ droneId });

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a Drone
// This endpoint allows a user to delete their drone.

router.delete('/:droneId', async (req, res) => {
    const { droneId } = req.params;

    try {
        const { data, error } = await supabase
            .from('Drones')
            .delete()
            .match({ droneId });

        if (error) throw error;

        res.status(200).json({ message: 'Drone deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Fetch Drones for a Specific User
// This endpoint fetches all drones owned by a specific user.

router.get('/user/:walletAddress', async (req, res) => {
    const { walletAddress } = req.params;
    if (!isValidWalletAddress(walletAddress)) {
        return res.status(400).json({ error: 'Invalid wallet address' });
    }
    try {
        const { data, error } = await supabase
            .from('Drones')
            .select('*')
            .eq('ownerWalletAddress', walletAddress);

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
function isValidWalletAddress(address) {
    // Check if the address is exactly 48 characters long as substrate addresses are
    return address && typeof address === 'string' && address.length === 48;
}

module.exports = router;
