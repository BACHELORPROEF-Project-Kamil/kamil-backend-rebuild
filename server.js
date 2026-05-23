const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
    res.send("Backend is running...")
})

app.use("/api/check-url", require("./routes/checkRoute"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})