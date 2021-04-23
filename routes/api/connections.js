const express = require("express");
const authorize = require("../../middlewares/authorize");

const router = express.Router();

router.post("/", authorize(), async (req, res) => {
  //
});

module.exports = router;
