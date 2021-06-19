const express = require("express");

const eCoachingScheduler = require("../../../workers/eCoachingScheduler");

const router = express.Router();

router.get("/", (req, res) => {
  eCoachingScheduler();
  res.send({ status: "ok" });
});
module.exports = router;
