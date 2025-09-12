const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    const MONGODB_URI = process.env.CONNECTION_STRING;
  
    try {
      if (!MONGODB_URI) return;
  
      await mongoose.connect(MONGODB_URI);
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  };


module.exports = connectDB;