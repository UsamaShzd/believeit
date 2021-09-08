const ScheduledNotification = require("../models/ScheduledNotification");

const {
  scheduleAffirmation,
} = require("../workers/affirmationReminderScheduler");
const { scheduleEcoaching } = require("../workers/eCoachingScheduler");
const {
  scheduleExtraAffirmations,
} = require("../workers/extraAffirmationsScheduler");
const {
  scheduleGoalPlanReminder,
} = require("../workers/goalPlanReminderScheduler");
const {
  scheduleMotivationlQoutes,
} = require("../workers/motivationalQoutesScheduler");
const { schedulePrayers } = require("../workers/prayerScheduler");

module.exports = async (user) => {
  await ScheduledNotification.deleteMany({ reciever: user._id });

  [
    scheduleAffirmation,
    scheduleEcoaching,
    // scheduleExtraAffirmations,
    scheduleGoalPlanReminder,
    scheduleMotivationlQoutes,
    schedulePrayers,
  ].forEach((scheduler) => {
    scheduler(user);
  });
};
