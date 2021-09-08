const dailyScheduler = require("../helpers/dailyScheduler");
const motivationalQoutesScheduler = require("../workers/motivationalQoutesScheduler");

module.exports = () => {
  dailyScheduler((TIMEZONE) => {
    console.log("Starting Motivational Qoutes Scheduler Task => ", TIMEZONE);
    motivationalQoutesScheduler(TIMEZONE);
  });
};
