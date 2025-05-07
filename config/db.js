const { Sequelize } = require("sequelize");

// Local MySQL database configuration
const dbName = process.env.DATABASE;
const user = process.env.USER;
const password = process.env.PASSWORD;

const sequelize = new Sequelize(dbName, user, password, {
  host: "127.0.0.1",
  dialect: "mysql",
//   port: "",
  logging: false
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
};

module.exports = { sequelize, connectDB };
