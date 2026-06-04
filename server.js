require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 60,
	standardHeaders: true,
	legacyHeaders: false,
	message: "Too many requests from this IP, please try again after 1 minute",
});

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

app.use(limiter);

if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in environment variables");
    process.exit(1);
}

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("Error connecting to MongoDB: ", err);
        process.exit(1);
    });

// ROUTES
app.get("/", (req, res) => {
	res.send("Backend is running...");
});

// WHOIS API ROUTE
app.use("/api/check-url", require("./routes/checkRoute"));

// STATS API ROUTE
app.use("/api/stats", require("./routes/statsRoute"));

// 404 FALLBACK
app.use((req, res) => {
	res.status(404).json({
		error: "Endpoint not found",
		path: req.originalUrl,
	});
});

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

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});
