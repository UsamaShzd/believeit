const express = require("express");
const _ = require("lodash");
const authorize = require("../../../middlewares/authorize");

const requestValidator = require("../../../middlewares/requestValidator");
const ChatRoom = require("../../../models/ChatRoom");
const validateObjectId = require("../../../helpers/validateObjectId");
const { createGroupChatSchema } = require("../../../validators/chat/room");

const router = express.Router();

const USER_PUBLIC_FIELDS =
  "firstname lastname image.thumbnailUrl image.imageUrl image.aspectRatio";

router.get("/my_chat_rooms", authorize(), async (req, res) => {
  const { user } = req.authSession;

  const query = {
    members: {
      $elemMatch: {
        memberId: user._id,
        role: { $ne: "join_requester" },
      },
    },
  };
  const orClause = [
    {
      roomType: "direct",
      lastMessage: { $ne: null },
    },
    {
      roomType: "group",
    },
  ];

  const rooms = await ChatRoom.find(query)
    .or(orClause)
    .populate("members.memberId", USER_PUBLIC_FIELDS);

  res.send(rooms);
});

router.get(
  "/get_private_chat_room/:memberId",
  authorize(),
  async (req, res) => {
    const { memberId } = req.params;
    const { user } = req.authSession;
    if (!validateObjectId(memberId))
      return res.status(400).send({
        error: {
          message: "Invalid member Id",
        },
      });

    const data = {
      roomType: "direct",
      createdBy: user._id,
      members: [
        { memberId: user._id.toHexString(), role: "member" },
        { memberId, role: "member" },
      ],
    };

    let room = await ChatRoom.findOne({
      "members.memberId": { $all: [memberId, user._id] },
    }).populate("members.memberId", USER_PUBLIC_FIELDS);

    if (!room) room = await new ChatRoom(data).save();

    res.send(room);
  }
);

router.post(
  "/create_group_chat",
  requestValidator(createGroupChatSchema),
  authorize(),
  async (req, res) => {
    const { name = "", description = "", members = [] } = _.pick(req.body, [
      "name",
      "description",
      "members",
    ]);

    const { user } = req.authSession;
    const chatRoomBuilder = {
      name,
      description,
      members: [
        { memberId: user._id.toHexString(), role: "admin" },
        ...members.map((mem) => {
          return { memberId: mem, role: "member" };
        }),
      ],
      roomType: "group",
      createdBy: user._id,
    };

    const room = await new ChatRoom(chatRoomBuilder).save();

    const populatedRoom = await ChatRoom.findById(room._id).populate(
      "members.memberId",
      USER_PUBLIC_FIELDS
    );
    res.send(populatedRoom);
  }
);

module.exports = router;
