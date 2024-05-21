const express = require("express");
const router = express.Router();

const EventController = require("../controllers/eventController");

router.get("/", EventController.getEvents);

router.post("/", EventController.newEvent);

router.get("/:id", EventController.findEventById);

// router.put("/:id", EventController.updateUser);

// router.delete("/:id", EventController.deleteUser);

module.exports = router;