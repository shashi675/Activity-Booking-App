const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Load secret from environment or fallback
const SEKRET_KEY = process.env.SEKRET_KEY;

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

    if (!token) {
        return res.status(401).json({ message: "Access denied. Please provide token." });
    }

    try {
        const decoded = jwt.verify(token, SEKRET_KEY);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Invalid token." });
        }

        req.user = user; // Attach user to request
        next(); // Continue to the protected route
    } catch (err) {
        console.error("JWT auth error:", err);
        res.status(403).json({ message: "Invalid or expired token." });
    }
};

module.exports = authenticateToken;
