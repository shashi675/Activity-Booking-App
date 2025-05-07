const Activity = require("./models/Activity");
const Booking = require("./models/Booking");
const User = require("./models/User");

User.hasMany(Booking, { foreignKey: "userId" });
Activity.hasMany(Booking, { foreignKey: "activityId" });
Booking.belongsTo(User, { foreignKey: "userId" });
Booking.belongsTo(Activity, { foreignKey: "activityId" });
