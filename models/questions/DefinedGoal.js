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
  // goalImportance: {
  //   type: Number,
  //   default: 0,
  // },
  //3
  oftenThingAboutGoal: {
    type: Number,
    default: 0,
  },
  //4
  clearIdea: {
    type: Number,
    default: 0,
  },
  //5
  dedicatingEnough: {
    type: Number,
    default: 0,
  },
  questionsCount: {
    type: Number,
    default: 5,
  },

  totalDefinedGoalScore: {
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

const DefinedGoal = mongoose.model("definedgoal", definedGoalSchema);

module.exports = DefinedGoal;
