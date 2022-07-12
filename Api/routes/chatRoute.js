const express = require("express");
const router = express.Router();
const chatController = require("../config/controllers/chatController");

router.get("/:eventId", chatController.chatList);
router.post("/", chatController.addMessage);

module.exports = router;
