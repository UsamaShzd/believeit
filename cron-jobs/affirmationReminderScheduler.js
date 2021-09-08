const dailyScheduler = require("../helpers/dailyScheduler");
const affirmationReminderScheduler = require("../workers/affirmationReminderScheduler");

module.exports = () => {
  dailyScheduler((TIMEZONE) => {
    console.log("Starting  Affirmation Reminder Scheduler Task => ", TIMEZONE);
    affirmationReminderScheduler(TIMEZONE);
  });
};
