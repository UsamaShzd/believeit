const User = require("../models/User");
const Prayer = require("../models/Prayer");

const ScheduledNotification = require("../models/ScheduledNotification");

module.exports = async () => {
  const users = await User.find({ ethnicity: /muslim/i }).select(
    "notificationSettings.prayers"
  );

  const prayers = await Prayer.find({});
  users.forEach(async (user) => {
    //
  });
};
