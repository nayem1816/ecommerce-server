const express = require("express");
const UserController = require("./user.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/", UserController.createUser);

router.get("/", auth(), UserController.getAllUsers);

router.get("/my-profile", auth(), UserController.getMyProfile);

module.exports = router;
