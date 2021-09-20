const cron = require("node-cron");
const cronTime = require("cron-time-generator");

const User = require("../models/User");

const reScheduleNotifications = require("../helpers/reScheduleNotifications");

module.exports = () => {
  //every 5 minutes
  const timeExpression = cronTime.every(3).hours();

  cron.schedule(timeExpression, async () => {
    const users = await User.find({});

    users.forEach((user) => {
      reScheduleNotifications(user);
    });
  });
};
