const con = require("../utils/database");
const vacations = require("../models/vacationModels");
const UsersVacationModels = require("../models/usersVacationModels");

exports.getAllVacations = async (req, res) => {
  await vacations
    .findAll({ where: { isDeleted: 0 }, include: [{ model: UsersVacationModels, attributes: ["userId"], where: { isDeleted: 0 }, required: false }] })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("error load vacations");
    });
};

exports.addNewVacation = async (req, res, next) => {
  await vacations
    .create({ destination: req.body.destination, description: req.body.description, img: req.body.img, initialDate: req.body.initialDate, finalDate: req.body.finalDate, price: req.body.price })
    .then((vacations) => {
      res.send(vacations);
    })
    .catch((err) => {
      res.send(err);
      // res.send("error load vacations :)");
    });
};

exports.updateDeleteVacation = async (req, res) => {
  await vacations
    .update({ isDeleted: 1 }, { where: { id: req.body.id } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send("error load vacations" + JSON.stringify(err));
    });
};

exports.updateVacation = async (req, res) => {
  await vacations
    .update({ destination: req.body.destination, description: req.body.description, img: req.body.img, initialDate: req.body.initialDate, finalDate: req.body.finalDate, price: req.body.price }, { where: { id: req.body.id } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send("error load vacations" + JSON.stringify(err));
    });
};

exports.updateImg = async (req, res) => {
  await vacations
    .update({ img: req.body.img }, { where: { id: req.body.id } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send("error load vacations" + JSON.stringify(err));
    });
};

exports.updateVacationFollowers = async (req, res) => {
  await vacations
    .update({ followers: req.body.followers }, { where: { id: req.body.id } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send("error load vacations" + JSON.stringify(err));
    });
};
