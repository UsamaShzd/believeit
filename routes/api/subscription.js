const express = require("express");
const authorize = require("../../middlewares/authorize");

const sanitizeUser = require("../../sanitizers/user");

const { FREE, MONTHLY } = require("../../enums/subscription_plans");

const router = express.Router();

router.post("/subscribe_free_plan", authorize(), async (req, res) => {
  const { user } = req.authSession;

  const plan = {
    type: FREE.name,
    isTrial: false,
    isUnlimited: FREE.isUnlimited,
    subscriptionStart: Date.now(),
  };

  user.subscription = plan;
  await user.save();
  res.send(sanitizeUser(user));
});

module.exports = router;
