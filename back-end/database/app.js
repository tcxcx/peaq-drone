require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLIC;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

// Apply middleware for CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5001'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Routes
let droneList = require("./routes/drone-register/drone-listing");

// Use the routes
app.use('/drone-listing', droneList);


// Start the server
const PORT = 5000 || 5001;

  app.listen(PORT, () => {
    console.log(`Server is running on port 5000`);
  });


// Export the app for testing purposes
module.exports = app;
