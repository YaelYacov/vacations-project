const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Users = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  mail: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isAdmin: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 0,
  },
});
module.exports = Users;
