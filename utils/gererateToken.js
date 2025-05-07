const jwt = require("jsonwebtoken");

const generateToken = (payLoad) => {
    return jwt.sign(payLoad, process.env.SEKRET_KEY);
}

module.exports = generateToken;