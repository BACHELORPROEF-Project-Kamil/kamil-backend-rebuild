const express = require("express");
const router = express.Router();
const { processUrlCheck } = require("../controllers/checkController");

// CHECK ROUTE
router.post("/", processUrlCheck);

module.exports = router;
