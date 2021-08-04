const express = require("express");

const extraAffirmationsScheduler = require("../../../workers/extraAffirmationsScheduler");

const router = express.Router();

router.get("/", (req, res) => {
  extraAffirmationsScheduler();
  res.send({ status: "ok" });
});
module.exports = router;
