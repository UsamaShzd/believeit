const dailyScheduler = require("../helpers/dailyScheduler");
const goalPlanReminderScheduler = require("../workers/goalPlanReminderScheduler");

module.exports = () => {
  dailyScheduler((TIMEZONE) => {
    console.log("Starting  Goal Plan Reminder Scheduler Task => ", TIMEZONE);
    goalPlanReminderScheduler(TIMEZONE);
  });
};
