const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const usersVacation = sequelize.define("usersVacation", {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

// this.userId.addIndex("userId", ["firstname", "lastname"]);

module.exports = usersVacation;
