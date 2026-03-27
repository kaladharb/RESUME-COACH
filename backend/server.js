require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import routes
const resumeRoutes = require("./routes/resumeRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

// Middleware
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: "*" }));
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded arrays/objects

// Connect DB
connectDB();

// Routes
app.use("/api/resume", resumeRoutes);
app.use("/api/history", historyRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ status: "OK", message: "Backend is running correctly." });
});

// Error Handling Middleware for multer limits/errors etc
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
