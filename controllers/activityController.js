const Activity = require("../models/Activity");

const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll();
        res.json(activities);
    } catch (err) {
        console.error("Error fetching activities:", err);
        res.status(500).json({ message: "Server error" });
    }
};


const addActivity = async (req, res) => {
    const { title, description, location, date, time } = req.body;
    if(!title || !location || !date || !time) return res.status(400).json({ "message": "Required title, location, date and time!" });

    try {
        const newActivity = await Activity.create({
            title,
            description,
            location,
            date,
            time
        });

        res.status(201).json({
            message: "Activity created successfully",
            activity: newActivity
        });
    } catch (err) {
        console.error("Error adding activity:", err);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { getAllActivities, addActivity };