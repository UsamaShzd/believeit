const cron = require("node-cron");
const cronTime = require("cron-time-generator");

const motivationalQoutesScheduler = require("../workers/motivationalQoutesScheduler");

module.exports = () => {
  //every day at 12:01 am
  const timeExpression = cronTime.every(1).days(12, 01);
  cron.schedule(timeExpression, () => {
    console.log("Starting Motivational Qoutes Scheduler Task ");
    motivationalQoutesScheduler();
  });
};
