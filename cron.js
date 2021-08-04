const notificationDispatcher = require("./cron-jobs/notificationDispatcher");
const eCoachingScheduler = require("./cron-jobs/eCoachingScheduler");
const prayerScheduler = require("./cron-jobs/prayerScheduler");
const affirmationReminderScheduler = require("./cron-jobs/affirmationReminderScheduler")
const motivationalQoutesScheduler = require("./cron-jobs/motivationalQoutesScheduler")
//

module.exports = () => {
  notificationDispatcher();

  eCoachingScheduler();

  prayerScheduler();

  affirmationReminderScheduler();
  
  motivationalQoutesScheduler();
  
  console.log("Cron Jobs started");
};
