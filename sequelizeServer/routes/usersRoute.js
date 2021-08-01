const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/getUserByMail", usersController.getUserByMail);
router.post("/addNewUser", usersController.addNewUser);
module.exports = router;
