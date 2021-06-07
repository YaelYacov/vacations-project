const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const usersVacation = sequelize.define("usersVacation", {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  userId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  vacationId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },

  isDeleted: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 0,
  },
});

// this.userId.addIndex("userId", ["firstname", "lastname"]);

module.exports = usersVacation;
