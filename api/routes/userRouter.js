const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

router.get("/", UserController.getUsers);

router.post("/", UserController.newUser);

router.get("/:id", UserController.findUserById);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;