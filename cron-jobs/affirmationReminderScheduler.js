const cron = require("node-cron");
const cronTime = require("cron-time-generator");

const affirmationReminderScheduler = require("../workers/affirmationReminderScheduler");

module.exports = () => {
  //every day at 12:01 am
  const timeExpression = cronTime.every(1).days(12, 01);

  cron.schedule(timeExpression, () => {
    console.log("Starting  Affirmation Reminder Scheduler Task");
    affirmationReminderScheduler();
  });
};
