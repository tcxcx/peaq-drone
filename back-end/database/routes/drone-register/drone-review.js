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

// Add a Review
// This endpoint allows a user to submit a review for a drone.
router.post('/reviews', async (req, res) => {
    const { droneId, reviewerWalletAddress, rating, comment } = req.body;

    try {
        const { data, error } = await supabase
            .from('Reviews')
            .insert([{ droneId, reviewerWalletAddress, rating, comment }]);

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        console.error("Error in POST /reviews:", error);
        res.status(500).json({ error: error.message, details: error.details });
    }
});

// Get Reviews for a Drone
// This endpoint retrieves all reviews for a specific drone.

router.get('/reviews/:droneId', async (req, res) => {
    const { droneId } = req.params;

    try {
        const { data, error } = await supabase
            .from('Reviews')
            .select('*')
            .eq('droneId', droneId);

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Update a Review
// This endpoint allows a user to update their review.

router.put('/reviews/:reviewId', async (req, res) => {
    const { reviewId } = req.params;
    const updates = req.body;

    try {
        const { data, error } = await supabase
            .from('Reviews')
            .update(updates)
            .match({ reviewId });

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Delete a Review
// This endpoint allows a user to delete their review.

router.delete('/reviews/:reviewId', async (req, res) => {
    const { reviewId } = req.params;

    try {
        const { data, error } = await supabase
            .from('Reviews')
            .delete()
            .match({ reviewId });

        if (error) throw error;

        res.status(200).json({ message: 'Review deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
