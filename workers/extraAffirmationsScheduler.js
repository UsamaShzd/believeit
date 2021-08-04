const moment = require("moment");
const User = require("../models/User");
const Affirmation = require("../models/Affirmation");

const ScheduledNotification = require("../models/ScheduledNotification");

const getScheduleForNotifications = require("../helpers/getScheduleForNotifications");

module.exports = async () => {
  const users = await User.find({
    "notificationSettings.extraAffirmations.state": true,
    "notificationSettings.extraAffirmations.numberOfNotifications": { $gt: 0 },
  }).select("notificationSettings.extraAffirmations");


  const afffirmations = await Affirmation.find({});

  users.forEach(async (user) => {
    const { notificationSettings } = user;

    const schedule = getScheduleForNotifications(notificationSettings.extraAffirmations);

    const scheduledNotifs = schedule.map((dispatchAt) => {
      const affirmation = afffirmations[Math.floor(Math.random() * afffirmations.length)];
      return {
        type: "extra_affirmation_notification",
        reciever: user._id,
        affirmation,
        dispatchAt,
      };
    });



    //saving scheduled notification;
   await ScheduledNotification.insertMany(scheduledNotifs);
  });
};
