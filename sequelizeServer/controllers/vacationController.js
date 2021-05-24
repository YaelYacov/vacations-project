const con = require("../utils/database");
const vacations = require("../models/vacationModels");

exports.getAllVacations = async (req, res) => {
  await vacations
    .findAll({ where: { isDeleted: 0 } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
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

exports.updateIsEditVac = async (req, res) => {
  await vacations
    .update({ isEditVac: req.body.isEditVac }, { where: { id: req.body.id } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send("error load vacations" + JSON.stringify(err));
    });
};

// exports.AddDelivery = async (req, res) => {
//   let delivery = req.body;

//   try {
//     let insertResult = await con.execute(`INSERT INTO deliveries(address_start,address_end,weight,customerName,deliverpersonid) VALUES ('${delivery.collectionAddress}', '${delivery.shippingAddress}',${delivery.weight},'${delivery.name}',1)`);
//     res.send(insertResult[0]);
//   } catch (err) {
//     res.send(err);
//   }
// };

// exports.getAllDeliveries = async (req, res) => {
//   let delivery = req.body;
//   try {
//     let result = await con.execute(`SELECT * FROM deliveries`);
//     res.send(result[0]);
//   } catch (err) {
//     res.send(err);
//   }
// };

//getAllDeliveries
