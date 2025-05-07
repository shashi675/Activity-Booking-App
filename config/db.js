const { Sequelize } = require("sequelize");

// Local MySQL database configuration
const dbName = process.env.DATABASE;
const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = process.env.DB_PORT;

const sequelize = new Sequelize(dbName, user, password, {
  host: host,
  dialect: "mysql",
  port: port,
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
