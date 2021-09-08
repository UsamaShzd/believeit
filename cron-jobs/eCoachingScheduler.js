const dailyScheduler = require("../helpers/dailyScheduler");
const eCoachingScheduler = require("../workers/eCoachingScheduler");
module.exports = () => {
  dailyScheduler((TIMEZONE) => {
    console.log("Starting E-Coaching Scheduler Task => ", TIMEZONE);
    eCoachingScheduler(TIMEZONE);
  });
};
