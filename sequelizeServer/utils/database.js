var mysql = require("mysql2");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("yaelyacovvacationproject", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
