const moment = require("moment-timezone");
const User = require("../models/User");

const ScheduledNotification = require("../models/ScheduledNotification");

module.exports = async (timezone) => {
  const users = await User.find({
    "notificationSettings.goalPlan.state": true,
    timezone,
  }).select("notificationSettings.goalPlan");

  users.forEach(async (user) => {
    const { goalPlan } = user.notificationSettings;
    await new ScheduledNotification({
      type: "goal_plan_reminder_notification",
      reciever: user._id,
      dispatchAt: moment.tz(goalPlan.reminderTime, "HH:mm", timezone).toDate(),
    }).save();
  });
};
