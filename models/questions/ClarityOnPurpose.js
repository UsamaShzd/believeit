const mongoose = require("mongoose");

const clarityOnPurposeSchema = new mongoose.Schema({
  //1
  foundLifePurpose: {
    type: Number,
    default: 0,
  },
  //2
  frequentlyThinkingAboutLifePurpose: {
    type: Number,
    default: 0,
  },
  //3
  reflectOnLifePurpose: {
    type: Number,
    default: 0,
  },
  //4
  goalAlignWithLifePurpose: {
    type: Number,
    default: 0,
  },
  //5
  stuckInPastOrFuture: {
    type: Number,
    default: 0,
  },

  questionsCount: {
    type: Number,
    default: 5,
  },

  totalClarityScore: {
    type: Number,
    default: 0,
  },

  answeredBy: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
});

const ClarityOnPurpose = mongoose.model(
  "clarityonpurpose",
  clarityOnPurposeSchema
);

module.exports = ClarityOnPurpose;
