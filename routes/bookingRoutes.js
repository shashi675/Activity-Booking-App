const express = require("express");
const router = express.Router();
const { addBooking, getMyBookings } = require("../controllers/bookingController");
const authenticateToken = require("../middlewares/authMiddleware");

router.post("/:activityId", authenticateToken, addBooking);
router.get("/", authenticateToken, getMyBookings);

module.exports = router;