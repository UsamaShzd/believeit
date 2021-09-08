const moment = require("moment");
const User = require("../models/User");
const Qoutation = require("../models/Qoutation");

const ScheduledNotification = require("../models/ScheduledNotification");

const getScheduleForNotifications = require("../helpers/getScheduleForNotifications");

const scheduleMotivationlQoutes = async (user) => {
  const { notificationSettings, timezone } = user;
  const qoutations = await Qoutation.find({});

  const schedule = getScheduleForNotifications({
    ...notificationSettings.motivationalQoutes,
    timezone,
  });

  const scheduledNotifs = schedule.map((dispatchAt) => {
    const qoutation = qoutations[Math.floor(Math.random() * qoutations.length)];
    return {
      type: "motivational_qoute_notification",
      reciever: user._id,
      qoutation,
      dispatchAt,
    };
  });

  //saving scheduled notification;
  await ScheduledNotification.insertMany(scheduledNotifs);
};

const cronWorker = async (timezone) => {
  const users = await User.find({
    timezone,
    "notificationSettings.motivationalQoutes.state": true,
    "notificationSettings.motivationalQoutes.numberOfNotifications": { $gt: 0 },
  }).select("notificationSettings.motivationalQoutes timezone");

  users.forEach(scheduleMotivationlQoutes);
};

module.exports = {
  cronWorker,
  scheduleMotivationlQoutes,
};
