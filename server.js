const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const { connectDB, sequelize } = require("./config/db");
require("./association");
const authRoutes = require("./routes/authRoutes");
const activityRoutes = require("./routes/activityRoutes");
const bookingRoutes = require("./routes/bookingRoutes");


// routes

app.use("/auth", authRoutes);
app.use("/activities", activityRoutes);
app.use("/bookings", bookingRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

connectDB();
sequelize.sync({ alter: true });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
