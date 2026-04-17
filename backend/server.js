const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Debug
console.log("PORT:", process.env.PORT);
console.log("MONGO:", process.env.MONGO_URI ? "Loaded" : "Not Loaded");
console.log("TWILIO SID:", process.env.TWILIO_SID ? "Loaded" : "Not Loaded");

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// Routes
app.use("/api/auth", authRoutes);

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});