const mongoose = require("mongoose");

const wellnessSchema = new mongoose.Schema({
  //1
  satisfiedWithSleep: {
    type: Number,
    default: 0,
  },
  //2
  regularExerciseParticipation: {
    type: Number,
    default: 0,
  },
  //3
  lastTwoWeeksSubstanceUsage: {
    type: Number,
    default: 0,
  },
  //4
  lastMonthMood: {
    type: Number,
    default: 0,
  },
  //5
  tolarantTowardsChange: {
    type: Number,
    default: 0,
  },
  //6
  gratefullFor: {
    type: Number,
    default: 0,
  },
  questionsCount: {
    type: Number,
    default: 6,
  },

  totalWellnessScore: {
    type: Number,
    default: 0,
  },

  answeredBy: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
});

const Ethnicity = mongoose.model("wellness", wellnessSchema);

module.exports = Ethnicity;
