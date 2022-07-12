const express = require("express");
const router = express.Router();
const logController = require("../config/controllers/logController");

router.post("/", logController.logActions);
router.get("/", logController.listActionsLog);
router.post("/reminderLogs", logController.createOrModifyLog);

module.exports = router;
