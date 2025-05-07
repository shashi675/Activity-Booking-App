const express = require("express");
const router = express.Router();
const { addActivity, getAllActivities } = require("../controllers/activityController");
const authenticateToken = require("../middlewares/authMiddleware");
const { validateActivity, handleValidation } = require("../middlewares/validate");

router.post("/", validateActivity, handleValidation, authenticateToken, addActivity);
router.get("/", getAllActivities);

module.exports = router;