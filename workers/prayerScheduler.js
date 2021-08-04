const moment = require("moment");
const User = require("../models/User");
const Prayer = require("../models/Prayer");

const ScheduledNotification = require("../models/ScheduledNotification");

const getScheduleForNotifications = require("../helpers/getScheduleForNotifications");

module.exports = async () => {
  const users = await User.find({
    ethnicity: /muslim/i,
    "notificationSettings.prayers.state": true,
    "notificationSettings.prayers.numberOfNotifications": { $gt: 0 },
  }).select("notificationSettings.prayers");

  const today = moment().format("dddd").toLocaleLowerCase();

  const prayers = await Prayer.find({
    prayerDays: { $in: [today, "anytime"] },
  });

  users.forEach(async (user) => {
    const { notificationSettings } = user;

    const schedule = getScheduleForNotifications(notificationSettings.prayers);

    const scheduledNotifs = schedule.map((dispatchAt) => {
      const prayer = prayers[Math.floor(Math.random() * prayers.length)];
      return {
        type: "prayer_notification",
        reciever: user._id,
        prayer,
        dispatchAt,
      };
    });

    //saving scheduled notification;
    await ScheduledNotification.insertMany(scheduledNotifs);
  });
};
