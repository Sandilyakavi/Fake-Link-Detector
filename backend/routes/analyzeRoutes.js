const express = require("express");
const router = express.Router();
const { validateUrl } = require("../middleware/validation");
const { analyzeUrl } = require("../controllers/analyzeController");

// Mount POS /api/analyze router
router.post("/analyze", validateUrl, analyzeUrl);

module.exports = router;
