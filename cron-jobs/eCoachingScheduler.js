const cron = require("node-cron");
const cronTime = require("cron-time-generator");

const eCoachingScheduler = require("../workers/eCoachingScheduler");

module.exports = () => {
  //every day at 12:01 am
  const timeExpression = cronTime.every(1).days(12, 01);
  cron.schedule(timeExpression, () => {
    console.log("Starting E-Coaching Scheduler Task ");
    eCoachingScheduler();
  });
};
