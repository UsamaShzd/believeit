const User = require("../models/User");
const Affirmation = require("../models/Affirmation");

const ScheduledNotification = require("../models/ScheduledNotification");

const getScheduleForNotifications = require("../helpers/getScheduleForNotifications");

const scheduleExtraAffirmations = async (user) => {
  const { notificationSettings, timezone } = user;
  const afffirmations = await Affirmation.find({});
  const schedule = getScheduleForNotifications({
    ...notificationSettings.extraAffirmations,
    timezone,
  });

  const scheduledNotifs = schedule.map((dispatchAt) => {
    const affirmation =
      afffirmations[Math.floor(Math.random() * afffirmations.length)];
    return {
      type: "extra_affirmation_notification",
      reciever: user._id,
      affirmation,
      dispatchAt,
    };
  });

  //saving scheduled notification;
  await ScheduledNotification.insertMany(scheduledNotifs);
};

const cronWorker = async (timezone) => {
  const users = await User.find({
    timezone,
    "notificationSettings.extraAffirmations.state": true,
    "notificationSettings.extraAffirmations.numberOfNotifications": { $gt: 0 },
  }).select("notificationSettings.extraAffirmations timezone");

  users.forEach(scheduleExtraAffirmations);
};

module.exports = { cronWorker, scheduleExtraAffirmations };
