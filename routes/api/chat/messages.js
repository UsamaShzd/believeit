const express = require("express");
const _ = require("lodash");
const authorize = require("../../../middlewares/authorize");
const requestValidator = require("../../../middlewares/requestValidator");
const { sendChatMessageSchema } = require("../../../validators/chat/message");

const router = express.Router();

router.post(
  "/send_message",
  requestValidator(sendChatMessageSchema),
  authorize(),
  async (req, res) => {
    const {} = _.pick(req.body, [""]);
    res.send(req.body);
  }
);

module.exports = router;
