const express = require("express");
const router = express.Router();
const passport = require('passport');
const UserController = require("../controllers/userController");

router.use(passport.authenticate("jwt", { session: false }));

router.get("/", UserController.getUsers);

router.post("/", UserController.newUser);

router.get("/:id", UserController.findUserById);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;