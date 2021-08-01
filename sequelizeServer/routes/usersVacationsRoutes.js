const express = require("express");
const router = express.Router();
const usersVacationsController = require("../controllers/usersVacationsController");

router.post("/getAllUsersVacations", usersVacationsController.getAllUsersVacations);
router.post("/updateDeleteFollowerToVac", usersVacationsController.updateDeleteFollowerToVac);

router.post("/insertNewFollowerToVac", usersVacationsController.insertNewFollowerToVac);

module.exports = router;
