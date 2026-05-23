const express = require("express");
const router = express.Router();

// CHECK ROUTE
router.post("/", (req, res) => {
	try {
		const { url } = req.body;

		if (!url) {
			return res.status(400).json({ error: "No URL provided" });
		}

		let status = "safe";
		let reason = "";
		let redirectUrl = "";

		// Basic temperary check to see if the URL is valid or not.
		if (url.includes("test-phishing")) {
			status = "unsafe";
			reason = "test_phishing_trigger";
			redirectUrl = "http://localhost:3000/tips-and-guides";
		}

		// Return the result
		res.json({ status, reason, redirectUrl });
	} catch (error) {
		console.error("Error while checking URL: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
