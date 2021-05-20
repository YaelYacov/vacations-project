const express = require("express");
var app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

var mysql = require("mysql2");
const con = require("./utils/database");

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Vacations = require("./routes/vacationRoutes");
app.use("/vacations", Vacations);

const Users = require("./routes/usersRoutes");
app.use("/users", Users);

app.use((req, res) => {
  res.send("Function not found !!!");
});

app.listen(5292);
