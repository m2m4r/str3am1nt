const express = require("express");
const router = express.Router();
const user = require("./userRoutes");
const event = require("./eventRoutes");
const nodemailer = require("./nodemailer");
const geolocalization = require("./geoIpRoutes");
const logs = require("./logs");
const chats = require("./chatRoute");

router.use("/user", user);
router.use("/event", event);
router.use("/nodemailer", nodemailer);
router.use("/geoip", geolocalization);
router.use("/logs", logs);
router.use("/chats", chats);

module.exports = router;
