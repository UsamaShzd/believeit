const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
  sender: {
    type: Schema.ObjectId,
    ref: "user",
    required: true,
  },

  chatRoom: {
    type: Schema.ObjectId,
    ref: "chatrooms",
    required: true,
    index: true,
  },

  messageType: {
    type: String,
    default: "message",
  },

  content: {
    message: { type: String, default: "", trim: true },
    tags: [
      {
        startIndex: Number,
        endIndex: Number,
        user: {
          type: Schema.ObjectId,
          ref: "user",
        },
      },
    ],
  },

  delivered: {
    type: Boolean,
    default: false,
  },

  seen: {
    type: Boolean,
    default: false,
  },

  customIdentifier: {
    type: String,
    trim: true,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatMessage = mongoose.model("chatmessages", chatMessageSchema);
module.exports = ChatMessage;
