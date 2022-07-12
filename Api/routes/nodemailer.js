const express = require("express");
const router = express.Router();
const nodemailerController = require("../config/controllers/nodemailerController");

router.post("/sendEmail", nodemailerController.sendEmail);
router.post("/sendToken", nodemailerController.sendToken);
router.post("/sendReminder", nodemailerController.sendReminder);
router.post("/modifyNotification", nodemailerController.modifyNotification);
router.post("/deleteNotification", nodemailerController.deleteNotification);

module.exports = router;
