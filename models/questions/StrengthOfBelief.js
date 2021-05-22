const mongoose = require("mongoose");

const goalPlanSchema = new mongoose.Schema({
  //1
  affirmationCount: {
    type: Number,
    default: 0,
  },
  //2
  concentrateAndVisualize: {
    type: Number,
    default: 0,
  },
  //3
  howConfident: {
    type: Number,
    default: 0,
  },
  //4
  thinkAboutPastSuccess: {
    type: Number,
    default: 0,
  },
  //5
  recentCriticism: {
    type: Number,
    default: 0,
  },
  //6
  thinkPositivelyToday: {
    type: Number,
    default: 0,
  },
  //7
  thinkNegativelyToday: {
    type: Number,
    default: 0,
  },
  questionsCount: {
    type: Number,
    default: 7,
  },

  totalStrengthScore: {
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

const StrengthOfBelief = mongoose.model("strengthofbelief", goalPlanSchema);

module.exports = StrengthOfBelief;
