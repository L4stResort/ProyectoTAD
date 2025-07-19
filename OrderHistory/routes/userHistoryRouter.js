const express = require("express");
const { saveUserHistory, getUserHistory } = require("../controllers/userHistoryController");
const validateToken = require('../middleware/tokenValidationMiddleware');

const router = express.Router();

// POST /userHistory - save user purchase history
router.post("/", validateToken, saveUserHistory);

// GET /userHistory?userId=ID - get user purchase history by user ID
router.get("/", validateToken, getUserHistory);

module.exports = router;