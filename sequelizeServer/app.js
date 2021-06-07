const express = require("express");
var multer = require("multer");
var path = require("path");
const app = express();

var mysql = require("mysql2");

const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const Users = require("./models/usersModels");
const Vacations = require("./models/vacationModels");
const UsersVacations = require("./models/usersVacationModels");

Users.hasMany(UsersVacations);
UsersVacations.belongsTo(Vacations);

app.use(express.static(path.join(__dirname, "uploads")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

const Sequelize = require("sequelize");
const sequelize = require("./utils/database");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const VacationRoutes = require("./routes/vacationRoutes");
app.use("/vacations", VacationRoutes);

const UsersRoute = require("./routes/usersRoute");
app.use("/users", UsersRoute);

const UsersVacationsRoutes = require("./routes/usersVacationsRoutes");
app.use("/usersVacations", UsersVacationsRoutes);

app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
  console.log("files", req.files);
  res.send(req.files);
});

app.use((req, res) => {
  res.send("Page Not Found");
});

// const knex = require("knex")({
//   client: "sqlite3",
//   connection: {
//     filename: "./img",
//   },
//   userNullAsDefault: true,
// });

// app.post("/upload", async (req, res) => {
//   const { name, data } = req.files.img;
//   console.log(req.files.img);
//   if (name && data) {
//     //  await .findAll({
//     //    where: {
//     //      isAdmin: 0,
//     //    },
//     //  })
//     //    .then((result) => {
//     //      // console.log(result);
//     //      res.send(result);
//     //    })
//     //    .catch((err) => {
//     //      res.send("error load users");
//     //    });

//     await knex.insert({ name: name, img: data }).into("img");
//     res.sendStatus(200);
//   } else {
//     res.sendStatus(400);
//   }
// });

sequelize
  .sync()
  .then((result) => {
    app.listen(5292);
  })
  .catch((err) => {
    // logger.log("error", "ERRR " + JSON.stringify(err))
  });
