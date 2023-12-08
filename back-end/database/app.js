require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLIC;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

// Apply middleware for CORS
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5001'],
    credentials: true,
    exposedHeaders: ['Authorization'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
  }));  
  
app.use(bodyParser.json());

const droneList = require("./routes/drone-register/drone-listing");
const droneReview = require("./routes/drone-register/drone-review");

app.use('/drone-listing', droneList);
app.use('/drone-review', droneReview);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Something broke!');
});

app.use((req, res) => {
    res.status(404).send("Sorry, can't find that!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
