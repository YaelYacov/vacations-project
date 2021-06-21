const express = require("express");
const router = express.Router();
const usersVacationsController = require("../controllers/usersVacationsController");

router.post("/insertNewFollowerToVac", usersVacationsController.insertNewFollowerToVac);
router.post("/updateDeleteFollowerToVac", usersVacationsController.updateDeleteFollowerToVac);
router.post("/getAllVacationFollowers", usersVacationsController.getAllVacationFollowers);
router.post("/getAllUsersVacations", usersVacationsController.getAllUsersVacations);
router.post("/getVacFollowers", usersVacationsController.getVacFollowers);
// router.post("/", usersVacationsController.getAllUsersById);
// router.post("/addNewUser", usersVacationsController.addNewUser);
module.exports = router;
