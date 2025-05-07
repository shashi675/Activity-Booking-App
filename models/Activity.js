const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Activity = sequelize.define(
  "Activity",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY, // Stores date only (YYYY-MM-DD)
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME, // Stores time only (HH:mm:ss)
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Activity;
