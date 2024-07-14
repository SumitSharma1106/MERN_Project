const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials : true
}));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

// Routes
app.use("/api", router);

module.exports = app;
