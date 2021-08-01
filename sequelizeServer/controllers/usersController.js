const con = require("../utils/database");
const Users = require("../models/usersModels");
const UsersVacationModels = require("../models/usersVacationModels");

exports.getUserByMail = async (req, res, next) => {
  await Users.findAll({
    where: {
      mail: req.body.mail,
      password: req.body.password,
    },
    include: [{ model: UsersVacationModels, attributes: ["vacationId"], where: { isDeleted: 0 }, required: false }],

    // include: [{ model: UsersVacationModels, attributes: ["vacationId"], where: { isDeleted: 0 } }],
  })
    .then((users) => {
      console.log(req.body);
      res.send(users);
    })
    .catch((err) => {
      console.log(req.body);

      res.send("error load users :)", err);
    });
};

exports.addNewUser = async (req, res, next) => {
  await Users.create({ name: req.body.name, mail: req.body.mail, password: req.body.password })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send(err);
      // res.send("error load users :)");
    });
};
