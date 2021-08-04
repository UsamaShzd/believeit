const moment = require("moment");
const User = require("../models/User");

const ScheduledNotification = require("../models/ScheduledNotification");

module.exports = async () => {
  const users = await User.find({
    "notificationSettings.goalPlan.state": true,
  }).select("notificationSettings.goalPlan");

  users.forEach(async (user) => {
    const { goalPlan } = user.notificationSettings;
    await new ScheduledNotification({
        type: "goal_plan_reminder_notification",
        reciever: user._id,
        dispatchAt: moment(goalPlan.reminderTime, "HH:mm").toDate(),
      }).save();
  });
};
