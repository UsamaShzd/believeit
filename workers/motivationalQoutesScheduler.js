const moment = require("moment");
const User = require("../models/User");
const Qoutation = require("../models/Qoutation");

const ScheduledNotification = require("../models/ScheduledNotification");

const getScheduleForNotifications = require("../helpers/getScheduleForNotifications");

module.exports = async () => {
  const users = await User.find({
    "notificationSettings.motivationalQoutes.state": true,
    "notificationSettings.motivationalQoutes.numberOfNotifications": { $gt: 0 },
  }).select("notificationSettings.motivationalQoutes");


  const qoutations = await Qoutation.find({});

  users.forEach(async (user) => {
    const { notificationSettings } = user;

    const schedule = getScheduleForNotifications(notificationSettings.motivationalQoutes);

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
  });
};
