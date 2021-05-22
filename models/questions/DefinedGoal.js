const mongoose = require("mongoose");

const definedGoalSchema = new mongoose.Schema({
  //1
  isDefiniteGoal: {
    type: Number,
    default: 0,
  },
  //2
  presistentlyWorkOnGoal: {
    type: Number,
    default: 0,
  },
  //3
  goalImportance: {
    type: Number,
    default: 0,
  },
  //4
  oftenThingAboutGoal: {
    type: Number,
    default: 0,
  },
  //5
  clearIdea: {
    type: Number,
    default: 0,
  },
  //6
  dedicatingEnough: {
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

const GoalPlan = mongoose.model("definedgoal", definedGoalSchema);

module.exports = GoalPlan;
