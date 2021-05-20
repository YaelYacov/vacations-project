const con = require("../utils/database");

exports.getAllVacations = async (req, res, next) => {
  let vacation = await con.execute(`SELECT * FROM vacations WHERE isDeleted = 0`);
  res.send(vacation[0]);
};

exports.updateVacation = async (req, res) => {
  let vacation = await con.execute(`
  UPDATE vacations
SET destination = "${req.body.destination}",  description ="${req.body.description}" , img = "${req.body.img}", initialDate = "${req.body.initialDate}", finalDate=  "${req.body.finalDate}", price = ${req.body.price}
WHERE id = ${req.body.id};`);
  res.send(vacation[0]);
};

exports.updateDeleteVacation = async (req, res) => {
  let vacation = await con.execute(`
  UPDATE vacations
SET isDeleted = ${req.body.isDeleted}
WHERE id = ${req.body.id};`);
  res.send(vacation[0]);
};
