const express = require("express");

const prayerScheduler = require("../../../workers/prayerScheduler");

const router = express.Router();

router.get("/", (req, res) => {
  prayerScheduler();
  res.send({ status: "ok" });
});
module.exports = router;
