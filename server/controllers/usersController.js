const con = require("../utils/database");

exports.getAllUsers = async (req, res) => {
  let Users = await con.execute(`SELECT * FROM users WHERE role=0 `);
  res.send(Users[0]);
};

exports.getUserByMail = async (req, res) => {
  let Users = await con.execute(`SELECT * FROM users WHERE mail = "${req.body.mail}" AND password = "${req.body.password}" `);
  res.send(Users[0]);
};

// exports.updateGuestStatus = async (req, res) => {
//   let status = await con.execute(`
//   UPDATE guest
// SET status = ${req.body.status}
// WHERE id = ${req.body.id};`);
//   res.send(status[0]);
// };

// exports.getAllGuestsByStaffId = async (req, res) => {
//   let Users = await con.execute(`SELECT * FROM users WHERE id=${req.body.id}`);
//   res.send(Users[0]);
// };

exports.addNewUser = async (req, res) => {
  let reqs = req.body;
  let newUser = await con.execute(`
 INSERT IGNORE INTO users(name, password, mail ) VALUES ("${reqs.name}", "${reqs.password}","${reqs.mail}")`);
  res.send(newUser[0]);
};
