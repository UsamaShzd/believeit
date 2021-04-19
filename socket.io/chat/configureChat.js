const sendChatMessege = require("./event-handlers/sendChatMessege");
module.exports = (socket) => {
  sendChatMessege(socket);
};
