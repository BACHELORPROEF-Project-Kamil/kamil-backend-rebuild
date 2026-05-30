require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

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
	res.status(400).json({
		error: "Endpoint not found",
		path: req.originalUrl,
		tip: "Please check backend to see if this endpoint exists",
	});
});

app.use((err, req, res, next) => {
	console.error("Unexpected crash: ", err.stack);
	res.status(500).json({
		error: "Internal server error",
		message: err.message,
	});
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});
