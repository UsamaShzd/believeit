const cron = require("node-cron");
const cronTime = require("cron-time-generator");

const eCoachingScheduler = require("../workers/eCoachingScheduler");

module.exports = () => {
  //every day at 12:05 am
  const timeExpression = cronTime.everyDayAt(0, 5);
  cron.schedule(timeExpression, () => {
    console.log("Starting E-Coaching Scheduler Task ");
    eCoachingScheduler();
  });
};
