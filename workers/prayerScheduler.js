const moment = require("moment");
const User = require("../models/User");
const Prayer = require("../models/Prayer");

const ScheduledNotification = require("../models/ScheduledNotification");

const getScheduleForNotifications = require("../helpers/getScheduleForNotifications");

const schedulePrayers = async (user) => {
  const { notificationSettings, timezone } = user;

  const today = moment.tz(timezone).format("dddd").toLocaleLowerCase();

  const prayers = await Prayer.find({
    prayerDays: { $in: [today, "anytime"] },
  });

  const schedule = getScheduleForNotifications({
    ...notificationSettings.prayers,
    timezone,
  });

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
};
module.exports = async (timezone) => {
  const users = await User.find({
    $or: [{ ethnicity: /.*muslim.*/i }, { ethnicity: /.*islam.*/i }],
    timezone,
    "notificationSettings.prayers.state": true,
    "notificationSettings.prayers.numberOfNotifications": { $gt: 0 },
  }).select("notificationSettings.prayers timezone");

  users.forEach(schedulePrayers);
};
