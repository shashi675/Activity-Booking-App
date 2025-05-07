const { body, validationResult } = require("express-validator");

// Login validation
exports.validateLogin = [
  body("email").isEmail().withMessage("Email must be valid").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

// Register validation
exports.validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("Email must be valid").normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("phone")
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be exactly 10 digits"),
];

// Activity validation
exports.validateActivity = [
  body("title").notEmpty().withMessage("Title is required"),

  body("location").notEmpty().withMessage("Location is required"),

  body("date")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Date must be in YYYY-MM-DD format"),

  body("time")
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage("Time must be in HH:mm:ss format"),
];

// Error handler middleware
exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};
