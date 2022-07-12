const express = require("express");
const router = express.Router();
const geolocalizationController = require("../config/controllers/geolocalizationController.js");

router.get("/", geolocalizationController.geoIp);

module.exports = router;
