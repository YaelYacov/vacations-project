const express = require("express");
var multer = require("multer");
var path = require("path");
const http = require("http");

var mysql = require("mysql2");

const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const Users = require("./models/usersModels");
const Vacations = require("./models/vacationModels");
const UsersVacations = require("./models/usersVacationModels");

const Sequelize = require("sequelize");
const sequelize = require("./utils/database");

const app = express();

var server = http.createServer(app);

var io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling", "flashsocket"],
});
server.listen("3004", () => {
  console.log("Server Running on Port 3004...");
});

io.on("connection", (socket) => {
  // console.log(socket.id);
  console.log("user Connected", socket.id);

  socket.on("vacationIdForDeletion", (id) => {
    console.log("vacationIdForDeletion", id);
    io.sockets.emit("deliverVacationForDeletion", id);
  });

  socket.on("updateVac", (id) => {
    io.sockets.emit("updateVacFn", id);
  });

  // socket.on("updateFavorites", (usersVacations) => {
  //   io.sockets.emit("sendToClientUpdateFavorites", usersVacations);
  // });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});

Users.hasMany(UsersVacations);
Vacations.hasMany(UsersVacations);
UsersVacations.belongsTo(Vacations);

app.use(express.static(path.join(__dirname, "uploads")));

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

sequelize
  .sync()
  .then((result) => {
    // console.log("listening on port 5292", result);
    app.listen(5292);
  })
  .catch((err) => {
    // logger.log("error", "ERRR " + err);
  });
