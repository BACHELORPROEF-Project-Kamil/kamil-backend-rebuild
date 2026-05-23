const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
	res.send("Backend is running...");
});

app.use("/api/check-url", require("./routes/checkRoute"));

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
