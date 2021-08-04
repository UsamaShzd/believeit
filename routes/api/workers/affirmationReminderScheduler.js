const express = require("express");

const affirmationReminderScheduler = require("../../../workers/affirmationReminderScheduler");

const router = express.Router();

router.get("/", (req, res) => {
    affirmationReminderScheduler();
    res.send({ status: "ok" });
});

module.exports = router;
