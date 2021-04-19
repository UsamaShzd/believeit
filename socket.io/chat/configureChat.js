const sendChatMessege = require("./event-handlers/sendChatMessege");
const markChatMessageAsSeen = require("./event-handlers/markChatMessageAsSeen");
module.exports = (socket) => {
  sendChatMessege(socket);
  markChatMessageAsSeen(socket);
};
