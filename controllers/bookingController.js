const Activity = require("../models/Activity");
const Booking = require("../models/Booking");

const getMyBookings = async (req, res) => {
    const userId = req.user.id;
    try {
        const bookings = await Booking.findAll({
            where: { userId },
            include: [
              {
                model: Activity,
                attributes: ["id", "title", "description", "location", "date", "time"]
              }
            ]
        });
        res.json({bookings});
    } catch (err) {
        console.error("Error fetching activities:", err);
        res.status(500).json({ message: "Server error" });
    }
};


const addBooking = async (req, res) => {
    const activityId = req.params.activityId;
    const userId = req.user.id;

    try {
        // Check if the activity exists
        const activity = await Activity.findByPk(activityId);
        if (!activity) {
            return res.status(404).json({ message: "No activity found with this activityId" });
        }

        // Check if user already booked the same activity (optional)
        const existingBooking = await Booking.findOne({ where: { userId, activityId }});
        if (existingBooking) {
            return res.status(400).json({ message: "You have already booked this activity" });
        }
        const newBooking = await Booking.create({
            userId,
            activityId
        });

        res.status(201).json({
            message: "Booking created successfully",
            activity: newBooking
        });
    } catch (err) {
        console.error("Error adding activity:", err);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { getMyBookings, addBooking };