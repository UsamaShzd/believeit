const express = require("express");

const motivationalQoutesScheduler = require("../../../workers/motivationalQoutesScheduler");

const router = express.Router();

router.get("/", (req, res) => {
  motivationalQoutesScheduler();
  res.send({ status: "ok" });
});
module.exports = router;
