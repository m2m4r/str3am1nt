const express = require("express");
const router = express.Router();
const eventController = require("../config/controllers/eventController");

router.post("/addEvent", eventController.addEvent);
router.put("/modifyEvent/:id", eventController.modifyEvent);
router.delete("/deleteEvent/:id", eventController.delete);
router.get("/findEvents", eventController.findEvents);
router.get("/findEvent/:title", eventController.findEvent);
router.get("/eventAndUsers/:title", eventController.findEventWithUsers);
router.get("/findEventId/:id", eventController.findEventId);
router.get("/findToken/:token", eventController.findToken);

module.exports = router;
