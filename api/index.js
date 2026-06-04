require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const connectToDatabase = require("../lib/db");

const app = express();

app.use(helmet());
app.use(compression());

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 1 minute",
});
app.use(limiter);

app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal server error: Database connection failed" });
  }
});

// ROUTES
app.get("/", (req, res) => {
  res.json({ message: "Kamil Backend Rebuild is live op Vercel!" });
});

// WHOIS API ROUTE
app.use("/api/check-url", require("../routes/checkRoute"));

// STATS API ROUTE
app.use("/api/stats", require("../routes/statsRoute"));

// 404 FALLBACK
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.originalUrl,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const isProduction = process.env.NODE_ENV === "production";
  
  if (!isProduction) {
    console.error("Unexpected crash: ", err.stack);
  }

  res.status(500).json({
    error: "Internal server error",
    message: isProduction ? "An unexpected error occurred" : err.message,
  });
});

module.exports = app;
