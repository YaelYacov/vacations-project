const con = require("../utils/database");
const Users = require("../models/usersModels");
const UsersVacationModels = require("../models/usersVacationModels");

exports.getAllUsers = async (req, res) => {
  await Users.findAll({
    where: {
      isAdmin: 0,
    },
  })
    .then((result) => {
      // console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send("error load users");
    });
};

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

exports.getUserFollowings = async (req, res, next) => {
  await Users.findAll({
    where: {
      id: req.body.id,
    },

    include: [{ model: UsersVacationModels, attributes: ["vacationId"], where: { isDeleted: 0 } }],
  })
    .then((users) => {
      console.log(users);
      res.send(users);
    })
    .catch((err) => {
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

// exports.addNewUser = async (req, res, next) => {
//   await UsersVacationModels.create({ name: req.body.name, mail: req.body.mail, password: req.body.password })
//     .then((users) => {
//       res.send(users);
//     })
//     .catch((err) => {
//       res.send("error load users :)");
//     });
// };
// exports.getDeliveryInfo = async (req, res, next) => {
//   await ShippingInfo.findAll()
//     .then((users) => {
//       console.log("this is it: ", users);
//       res.send(users);
//     })
//     .catch((err) => {
//       res.send("error load users :)");
//     });
// };

// exports.getDeliveryPersonInfo = async (req, res, next) => {
//   await ShippingInfo.findAll({
//     where: {
//       deliveryGuyId: req.body.deliveryGuyId,
//     },
//   })
//     .then((users) => {
//       console.log("this is it: ", users);
//       res.send(users);
//     })
//     .catch((err) => {
//       res.send("error load users :)");
//     });
// };

// exports.connectDeliveryToPerson = async (req, res, next) => {
//   await ShippingInfo.update(
//     { deliveryGuyId: req.body.deliveryGuyId },
//     {
//       where: {
//         id: req.body.id,
//       },
//     }
//   )

//     .then((users) => {
//       console.log("this is it: ", users);
//       res.send(users);
//     })
//     .catch((err) => {
//       res.send("error load users :)");
//     });
// };

// exports.getAllDeliveryGuys = async (req, res, next) => {
//   await Users.findAll({
//     where: {
//       status: 1,
//     },
//   })
//     .then((users) => {
//       console.log("this is it: ", users);
//       res.send(users);
//     })
//     .catch((err) => {
//       res.send("error load users :)");
//     });
// };
