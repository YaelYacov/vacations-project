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
////////
exports.getVacFollowers = async (req, res) => {
  await usersVacation
    .findAll({ where: { vacationId: req.query.vacationId, isDeleted: 0 } })
    .then((result) => {
      // console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send("error load UsersVacations");
    });
};
////

// exports.updateNewFollowerToVac = async (req, res) => {
//   await usersVacation
//     .update({ vacationId: req.body.vacationId }, { where: { userId: req.body.userId } })
//     .then((result) => {
//       res.send(usersVacation);
//     })
//     .catch((err) => {
//       res.send("error load UsersVacations" + JSON.stringify(err));
//     });
// };

exports.getAllVacationFollowers = async (req, res) => {
  await usersVacation

    .findAll({ where: { isDeleted: 0, userId: req.body.userId } })
    .then((result) => {
      // console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send("error load users");
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

// exports.getUserByMail = async (req, res, next) => {
//   await Users.findAll({
//     where: {
//       mail: req.body.mail,
//       password: req.body.password,
//     },
//   })
//     .then((users) => {
//       // console.log(users);
//       res.send(users);
//     })
//     .catch((err) => {
//       res.send("error load users :)");
//     });
// };

// exports.addNewUser = async (req, res, next) => {
//   await Users.create({ name: req.body.name, mail: req.body.mail, password: req.body.password })
//     .then((users) => {
//       res.send(users);
//     })
//     .catch((err) => {
//       res.send(err);
//       // res.send("error load users :)");
//     });
// };
