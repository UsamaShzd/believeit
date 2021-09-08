const dailyScheduler = require("../helpers/dailyScheduler");
const prayerScheduler = require("../workers/prayerScheduler");

module.exports = () => {
  dailyScheduler((TIMEZONE) => {
    console.log("Starting  Prayer Scheduler Task => ", TIMEZONE);
    prayerScheduler(TIMEZONE);
  });
};
