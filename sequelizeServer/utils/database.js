var mysql = require("mysql2");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("vacationsequelize", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
