const con = require("../utils/database");
const Users = require("../models/usersModels");
const usersVacation = require("../models/usersVacationModels");

exports.getAllUsersVacations = async (req, res) => {
  await usersVacation
    .findAll({ where: { isDeleted: 0 } })
    .then((result) => {
      // console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.updateDeleteFollowerToVac = async (req, res) => {
  await usersVacation

    .update({ isDeleted: req.body.isDeleted }, { where: { userId: req.body.userId, vacationId: req.body.vacationId } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send("error load vacations" + JSON.stringify(err));
    });
};

exports.insertNewFollowerToVac = async (req, res, next) => {
  await usersVacation
    .create({ vacationId: req.body.vacationId, userId: req.body.userId })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
      // res.send("error load vacations :)");
    });
};
