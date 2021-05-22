const mongoose = require("mongoose");

const knowledgeAndCollabSchema = new mongoose.Schema({
  //1
  acquiringKnowledge: {
    type: Number,
    default: 0,
  },
  //2
  ownersPercent: {
    type: Number,
    default: 0,
  },
  //3
  necessaryDirections: {
    type: Number,
    default: 0,
  },
  //4
  frequentInteraction: {
    type: Number,
    default: 0,
  },
  //5
  workInHarmony: {
    type: Number,
    default: 0,
  },
  //6
  planApproved: {
    type: Number,
    default: 0,
  },
  //7
  everyoneWorking: {
    type: Number,
    default: 0,
  },

  questionsCount: {
    type: Number,
    default: 7,
  },

  totalKnowledgeAndCollabScore: {
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

const KnowledgeAndCollab = mongoose.model(
  "knowledgeandcollab",
  knowledgeAndCollabSchema
);

module.exports = KnowledgeAndCollab;
