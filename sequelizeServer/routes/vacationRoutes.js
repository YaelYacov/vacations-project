const express = require("express");
const router = express.Router();
const vacationController = require("../controllers/vacationController");

router.post("/getAllVacations", vacationController.getAllVacations);
router.post("/updateVacation", vacationController.updateVacation);
router.post("/updateDeleteVacation", vacationController.updateDeleteVacation);
router.post("/updateImg", vacationController.updateImg);
router.post("/addNewVacation", vacationController.addNewVacation);
module.exports = router;
