const notificationDispatcher = require("./cron-jobs/notificationDispatcher");
const eCoachingScheduler = require("./cron-jobs/eCoachingScheduler");
const prayerScheduler = require("./cron-jobs/prayerScheduler");
const affirmationReminderScheduler = require("./cron-jobs/affirmationReminderScheduler")

//

module.exports = () => {
  notificationDispatcher();

  eCoachingScheduler();

  prayerScheduler();

  affirmationReminderScheduler();
  
  console.log("Cron Jobs started");
};
