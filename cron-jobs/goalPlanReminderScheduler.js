const cron = require("node-cron");
const cronTime = require("cron-time-generator");

const goalPlanReminderScheduler = require("../workers/goalPlanReminderScheduler");

module.exports = () => {
  //every day at 12:01 am
  const timeExpression = cronTime.every(1).days(12, 01);

  cron.schedule(timeExpression, () => {
    console.log("Starting  Goal Plan Reminder Scheduler Task ");
    goalPlanReminderScheduler();
  });
};
