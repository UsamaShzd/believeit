const express = require("express");

const goalPlanReminderScheduler = require("../../../workers/goalPlanReminderScheduler");

const router = express.Router();

router.get("/", (req, res) => {
    goalPlanReminderScheduler();
    res.send({ status: "ok" });
});

module.exports = router;
