const moment = require("moment");
const User = require("../models/User");
const Goal = require("../models/Goal");

const Wellness = require("../models/questions/Wellness");
const ClarityOnPurpose = require("../models/questions/ClarityOnPurpose");
const DefinedGoal = require("../models/questions/DefinedGoal");
const KnowledgeAndCollab = require("../models/questions/KnowledgeAndCollab");
const StrengthOfBelief = require("../models/questions/StrengthOfBelief");
const WillPower = require("../models/questions/WillPower");
const GoalPlan = require("../models/questions/GoalPlan");

const ScheduledNotification = require("../models/ScheduledNotification");

const e_coaching_tips = require("../enums/e_coaching_tips");

const getScheduleForNotifications = require("../helpers/getScheduleForNotifications");

module.exports = async () => {
  const users = await User.find({
    "notificationSettings.eCoaching.numberOfNotifications": { $gt: 0 },
  }).select("notificationSettings.eCoaching");

  users.forEach(async (user) => {
    const { notificationSettings } = user;
    const schedule = getScheduleForNotifications(
      notificationSettings.eCoaching
    );

    const tipsToSend = [];
    let goals = await Goal.find({
      isCompleted: false,
      createdBy: user._id,
    }).select("_id createdBy");

    const randomGoal = goals[Math.floor(Math.random() * goals.length)];

    //saving scheduled notification;
    await ScheduledNotification.insertMany(scheduledNotifs);
  });
};
const calculateGoalTips = async (goal) => {
  //
};
