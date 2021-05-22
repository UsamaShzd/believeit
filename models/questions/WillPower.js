const mongoose = require("mongoose");

const willPowerSchema = new mongoose.Schema({
  //1
  sayAffirmation: {
    type: Number,
    default: 0,
  },
  //2
  concentrateOnThoughts: {
    type: Number,
    default: 0,
  },
  //3
  pastDeadline: {
    type: Number,
    default: 0,
  },
  //4
  continueBuilding: {
    type: Number,
    default: 0,
  },
  //5
  acknowledgeMistake: {
    type: Number,
    default: 0,
  },

  questionsCount: {
    type: Number,
    default: 5,
  },

  totalWillPowerScore: {
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

const WillPower = mongoose.model("willpower", willPowerSchema);

module.exports = WillPower;
