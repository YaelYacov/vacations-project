const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const vacations = sequelize.define("vacations", {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  destination: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  img: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  initialDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  finalDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  price: {
    type: Sequelize.INTEGER(250),
    allowNull: false,
    defaultValue: 0,
  },
  followers: {
    type: Sequelize.INTEGER(250),
    allowNull: false,
    defaultValue: 0,
  },
  isDeleted: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 0,
  },
});
module.exports = vacations;
