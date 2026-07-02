const express = require("express");
const cors = require("cors");
require("dotenv").config();
const analyzeRoutes = require("./routes/analyzeRoutes");

const app = express();

// Standard middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", analyzeRoutes);

// Root test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Fake Link Detector API is running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = server;