const notificationDispatcher = require("./cron-jobs/notificationDispatcher");
const eCoachingScheduler = require("./cron-jobs/eCoachingScheduler");
const prayerScheduler = require("./cron-jobs/prayerScheduler");

//

module.exports = () => {
  notificationDispatcher();

  eCoachingScheduler();

  prayerScheduler();

  console.log("Cron Jobs started");
};
