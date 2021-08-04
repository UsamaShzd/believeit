const moment = require("moment");
const User = require("../models/User");
const Goal = require("../models/Goal");

const ScheduledNotification = require("../models/ScheduledNotification");

const getScheduleForNotifications = require("../helpers/getScheduleForNotifications");

module.exports = async () => {
  const users = await User.find({
    "notificationSettings.affirmationReminderTime.state": true,
  }).select("notificationSettings.affirmationReminderTime");

  users.forEach(async (user) => {
    const { affirmationReminderTime } = user.notificationSettings;

    const goals = await Goal.find({
        createdBy: user._id,
        isCompleted: false
    });

    if(goals.length === 0) return;


    const schedule = getScheduleForNotifications({
        numberOfNotifications: goals.length,
        startTime:affirmationReminderTime.amTime, 
        endTime:affirmationReminderTime.pmTime 
    });

    
    const scheduledNotifs = schedule.map((dispatchAt, index) => {
      const goal = goals[index];

  
      return {
        type: "affirmation_reminder_notification",
        reciever: user._id,
        goal,
        dispatchAt,
      };
    });

    //saving scheduled notification;
    await ScheduledNotification.insertMany(scheduledNotifs);
  });
};
