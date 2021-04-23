const _ = require("lodash");
const ChatRoom = require("../../../models/ChatRoom");
const ChatMessage = require("../../../models/ChatMessage");
const AuthSession = require("../../../models/AuthSession");

const {
  sendPushNotifications,
} = require("../../../services/expo/pushNotification");

const { sendChatMessageSchema } = require("../../../validators/chat/message");

const USER_PUBLIC_FIELDS =
  "firstname lastname image.thumbnailUrl image.imageUrl image.aspectRatio";

module.exports = (socket) => {
  socket.on("send_chat_message", async (message, acknowledge) => {
    //validation
    try {
      await sendChatMessageSchema.validate(message);
    } catch (validationError) {
      const { path, errors } = validationError;
      return acknowledge({
        type: "error",
        customIdentifier: message.customIdentifier,
        error: {
          [path]: errors[0],
        },
      });
    }
    const { user } = socket;
    const chatMessage = await new ChatMessage({
      ...message,
      sender: user._id,
      seen: [user._id],
    }).save();

    const chatRoom = await ChatRoom.findByIdAndUpdate(message.chatRoom, {
      lastMessage: chatMessage._id,
      lastActive: Date.now(),
    });

    const populatedChatMessage = {
      sender: _.pick(user, USER_PUBLIC_FIELDS.split(" ")),
      ..._.pick(chatMessage, [
        "chatRoom",
        "messageType",
        "message",
        "tags",
        "delivered",
        "seen",
        "customIdentifier",
        "isDeleted",
        "createdAt",
      ]),
    };

    //acknowledge the sender
    acknowledge({
      type: "success",
      data: populatedChatMessage,
    });

    //send notification to the other sockets
    chatRoom.members.forEach(async (member) => {
      socket
        .to(member.memberId.toHexString())
        .emit("chat_message_recieved", populatedChatMessage);
    });

    //send push notification to offline users

    const offlineUsers = [];

    for (let i = 0; i < chatRoom.members.length; i++) {
      const memberId = chatRoom.members[i].memberId.toHexString();
      const clients = await socket.adapter.sockets(new Set([memberId]));

      if (clients.size === 0) offlineUsers.push(memberId);
    }
    if (offlineUsers.length === 0) return;

    const sessions = await AuthSession.find({
      user: { $in: offlineUsers },
      isExpired: false,
      pushNotificationToken: { $exists: true },
    }).select("pushNotificationToken");

    //construct push notification
    const push_notification = {
      to: sessions.map((session) => session.pushNotificationToken),
      title:
        chatRoom.roomType === "group" && chatRoom.name
          ? chatRoom.name
          : `${user.firstname} ${user.lastname}`,

      body: chatMessage.message,
      sound: "default",
    };

    sendPushNotifications(push_notification);
  });
};
