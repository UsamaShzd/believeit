const mongoose = require("mongoose");
const Prayer = require("./Prayer");

const scheduledNotificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["prayer_notification", "e_coaching_notification"],
  },

  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,

    ref: "user",
  },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  prayer: Prayer.schema,

  eCoaching: {
    type: String,
  },
  dispatchAt: {
    type: Date,
    required: true,
  },
});

const ScheduledNotification = mongoose.model(
  "schedulednotification",
  scheduledNotificationSchema
);

module.exports = ScheduledNotification;
