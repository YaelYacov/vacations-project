const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/getAllUsers", usersController.getAllUsers);
router.post("/getUserByMail", usersController.getUserByMail);
// router.post("/getAllUsersById", usersController.getAllUsersById);
router.post("/addNewUser", usersController.addNewUser);

module.exports = router;
