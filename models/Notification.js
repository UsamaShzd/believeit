const mongoose = require("mongoose");
const Prayer = require("./Prayer");

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "goal_membership_request",
      "prayer_notification",
      "e_coaching_notification",
    ],
    required: true,
  },

  seen: {
    type: Boolean,
    default: false,
  },

  isOpened: {
    type: Boolean,
    default: false,
  },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: "user",
  },

  goalMembeship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "goal",
  },

  connection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "connection",
  },

  prayer: Prayer.schema,

  eCoaching: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;
