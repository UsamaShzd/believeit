const express = require("express");
const _ = require("lodash");
const validateObjectId = require("../../../helpers/validateObjectId");
const authorize = require("../../../middlewares/authorize");
const requestValidator = require("../../../middlewares/requestValidator");
const ChatMessage = require("../../../models/ChatMessage");
const { sendChatMessageSchema } = require("../../../validators/chat/message");

const router = express.Router();

router.get("/list/:chatRoom", authorize(), async (req, res) => {
  const { last_mesasge_id = "", pageSize = 20 } = req.query;
  const { chatRoom } = req.params;

  if (!validateObjectId(chatRoom))
    return res.status(400).send({
      error: {
        message: "Invalid chat room",
      },
    });

  const query = {
    chatRoom,
  };

  if (last_mesasge_id) {
    if (!validateObjectId(last_mesasge_id))
      return res.status(400).send({
        error: {
          message: "Invalid last message id",
        },
      });
    query._id = {
      $lt: last_mesasge_id,
    };
  }
  const messages = await ChatMessage.find(query)
    .limit(pageSize)
    .sort("-createdAt");

  res.send(messages);
});

module.exports = router;
