const express = require("express");
const authorize = require("../../middlewares/authorize");
const requestValidator = require("../../middlewares/requestValidator");

const { createGoalSchema } = require("../../validators/goal");

const router = express.Router();

router.post(
  "/create_goal",
  requestValidator(createGoalSchema),
  // authorize(),
  async (req, res) => {
    res.send({ message: "create goal" });
  }
);
module.exports = router;
