require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { createClient } = require('@supabase/supabase-js');
// const verifyToken = require('./routes/auth/jwt-verify');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_PUBLIC
const supabase = createClient(supabaseUrl, supabaseKey)

const app = express();

// Apply middleware for CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5001'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

function asyncHandler(fn) {
  return function(req, res, next) {
      Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Drone Listing Routes
const droneList = require("./routes/drone-register/drone-listing");
const droneReview = require("./routes/drone-register/drone-review");

// Use the routes
app.use('/drone-listing', asyncHandler(droneList));
app.use('/drone-review', asyncHandler(droneReview));


// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.type === 'entity.parse.failed') {
      return res.status(400).send('Invalid JSON');
  }

  res.status(err.status || 500).send(err.message || 'Something broke!');
});

// 404 Handler
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
