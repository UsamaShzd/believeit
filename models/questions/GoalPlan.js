const mongoose = require("mongoose");

const goalPlanSchema = new mongoose.Schema({
  //1
  haveSolidPlan: {
    type: Number,
    default: 0,
  },
  //2
  startEndDates: {
    type: Number,
    default: 0,
  },
  //3
  pastDeadlineItems: {
    type: Number,
    default: 0,
  },
  //4
  continueBuilding: {
    type: Number,
    default: 0,
  },
  //5
  analyzeGoalPlan: {
    type: Number,
    default: 0,
  },
  //6
  shortcutToSuccess: {
    type: Number,
    default: 0,
  },
  questionsCount: {
    type: Number,
    default: 6,
  },

  totalGoalPlanScore: {
    type: Number,
    default: 0,
  },

  goal: {
    type: mongoose.Schema.ObjectId,
    ref: "goal",
    required: true,
  },
  answeredBy: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
});

const GoalPlan = mongoose.model("goalplan", goalPlanSchema);

module.exports = GoalPlan;
