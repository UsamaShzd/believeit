const _ = require("lodash");
const express = require("express");
const authorize = require("../../middlewares/authorize");

const validateObjectId = require("../../helpers/validateObjectId");

const User = require("../../models/User");
const Connection = require("../../models/Connection");
const Notification = require("../../models/Notification");

const Goal = require("../../models/Goal");

const requestValidator = require("../../middlewares/requestValidator");
const {
  searchConnectionSchema,
  requestConnectionSchema,
  goalMembershipSchema,
} = require("../../validators/connection");

const {
  sendPushNotifications,
} = require("../../services/expo/pushNotification");

const getPushTokens = require("../../helpers/getPushTokens");

//////
const USER_PUBLIC_FIELDS =
  "firstname lastname image.thumbnailUrl image.imageUrl image.aspectRatio";

const router = express.Router();

router.get("/my_connections", authorize(), async (req, res) => {
  const { last_connection_id = "", pageSize = 20 } = req.query;
  const { user } = req.authSession;

  const query = {
    "members.user": user._id,
    status: "accepted",
  };

  if (last_connection_id) {
    if (!validateObjectId(last_connection_id))
      return res.status(400).send({
        error: {
          message: "Invalid last connection id",
        },
      });
    //
    query._id = {
      $lt: last_connection_id,
    };
  }
  const connections = await Connection.find(query)
    .limit(pageSize)
    .sort("-acceptedAt")
    .populate("members.user", USER_PUBLIC_FIELDS);
  res.send(connections);
});

router.get("/my_connection_requests", authorize(), async (req, res) => {
  const { last_connection_id = "", pageSize = 20 } = req.query;
  const { user } = req.authSession;

  const query = {
    "members.user": user._id,
    status: "requested",
  };

  if (last_connection_id) {
    if (!validateObjectId(last_connection_id))
      return res.status(400).send({
        error: {
          message: "Invalid last connection id",
        },
      });
    //
    query._id = {
      $lt: last_connection_id,
    };
  }
  const connections = await Connection.find(query)
    .limit(pageSize)
    .sort("-createdAt")
    .populate("members.user", USER_PUBLIC_FIELDS);
  res.send(connections);
});

router.post(
  "/search_connections",
  requestValidator(searchConnectionSchema),
  authorize(),
  async (req, res) => {
    const { name, longitude, latitude } = _.pick(req.body, [
      "name",
      "longitude",
      "latitude",
    ]);
    //
    const users = await User.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        },
      },
    });
    res.send(users);
  }
);

router.post(
  "/send_connection_request",
  requestValidator(requestConnectionSchema),
  authorize(),
  async (req, res) => {
    const { requestedUser } = _.pick(req.body, ["requestedUser"]);
    const { user } = req.authSession;

    //check if previous connection exists
    const previousConneciton = await Connection.findOne({
      $and: [
        {
          "members.user": user._id,
        },
        {
          "members.user": requestedUser,
        },
      ],
    });

    if (previousConneciton) return res.send(previousConneciton);

    const connection = await new Connection({
      initiator_id: user._id,
      members: [{ user: user._id }, { user: requestedUser }],
      status: "requested",
    }).save();

    res.send(connection);

    //sending notification
    const notification = await new Notification({
      sender: user._id,
      reciever: requestedUser,
      type: "connection_request",
      connection: connection._id,
    }).save();

    const pushTokens = await getPushTokens(requestedUser);

    const push_notification = {
      to: pushTokens,
      title: `${user.firstname} ${user.lastname}`,
      body: `${user.firstname} ${user.lastname} sent you a connection request.`,
      data: {
        ..._.pick(notification, ["_id", "type", "connection", "createdAt"]),
        sender: _.pick(user, USER_PUBLIC_FIELDS.split(" ")),
      },
      sound: "default",
    };
    sendPushNotifications(push_notification);
  }
);

router.post(
  "/send_goal_membership_request",
  requestValidator(goalMembershipSchema),
  authorize(),
  async (req, res) => {
    const { requestedUser, goalRef } = _.pick(req.body, [
      "requestedUser",
      "goalRef",
    ]);
    const { user } = req.authSession;

    const goal = await Goal.findOneAndUpdate(
      {
        _id: goalRef,
        createdBy: user._id,
        "members.memberId": { $ne: requestedUser },
      },
      {
        $addToSet: {
          members: { memberId: requestedUser, status: "requested" },
        },
      },
      { new: true }
    );

    if (!goal)
      return res.status(400).send({
        error: { message: "It seems you have alredy requested this user." },
      });

    //save notification
    const notification = await new Notification({
      sender: user._id,
      reciever: requestedUser,
      goalMembeship: goal._id,
    }).save();

    res.send({ message: "Membership request sent." });
  }
);

router.put("/accept_connection_request/:id", authorize(), async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res
      .status(404)
      .send({ error: { message: "Connection not found!" } });

  const connection = await Connection.findByIdAndUpdate(
    id,
    { status: "accepted", acceptedAt: Date.now() },
    { new: true }
  );

  if (!connection)
    return res
      .status(404)
      .send({ error: { message: "Connection not found!" } });

  res.send(connection);
});

router.put("/accept_goal_membership/:id", authorize(), async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res
      .status(404)
      .send({ error: { message: "Connection not found!" } });

  const { user } = req.authSession;
  const goal = await Goal.findById(id);

  if (!goal)
    return res.status(404).send({
      error: {
        message: "Goal not found",
      },
    });

  let includes = false;
  goal.members = goal.members.map((m) => {
    if (`${m.memberId}` === `${user._id}`) {
      m.status = "accepted";
      includes = true;
    }
    return m;
  });

  if (!includes)
    return res.status(404).send({
      error: {
        message: "You are not requested to join this goal's membership.",
      },
    });
  //
  await goal.save();

  //remove notification

  const notification = await Notification.deleteMany({
    sender: goal.createdBy,
    reciever: user._id,
    goalMembeship: goal._id,
  });

  //if not connected then connect
  const previousConneciton = await Connection.findOne({
    $and: [
      {
        "members.user": user._id,
      },
      {
        "members.user": goal.createdBy,
      },
    ],
  });

  if (!previousConneciton) {
    const connection = await new Connection({
      initiator_id: goal.createdBy,
      members: [{ user: user._id }, { user: goal.createdBy }],
      status: "accepted",
      acceptedAt: Date.now(),
    }).save();
  }

  if (previousConneciton && previousConneciton.status === "requested") {
    previousConneciton.status = "accepted";
    await previousConneciton.save();
  }
  res.send({ message: "Membership request accepted." });
});

router.delete("/cancel_connection/:id", authorize(), async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res
      .status(404)
      .send({ error: { message: "Connection not found!" } });

  const { user } = req.authSession;

  const connection = await Connection.findOneAndRemove({
    _id: id,
    "members.user": user._id,
  });

  if (!connection)
    return res
      .status(404)
      .send({ error: { message: "Connection not found!" } });

  res.send(connection);
});

router.delete("/decline_goal_membership/:id", authorize(), async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res
      .status(404)
      .send({ error: { message: "Connection not found!" } });

  const { user } = req.authSession;
  const goal = await Goal.findOneAndUpdate(
    {
      _id: id,
      // members: {
      //   memberId: user._id,
      // },
    },
    {
      $pull: {
        members: { memberId: user._id },
      },
    }
  );

  if (!goal)
    return res.status(404).send({
      error: {
        message: "Goal not found",
      },
    });

  //remove notification

  const notification = await Notification.deleteMany({
    sender: goal.createdBy,
    reciever: user._id,
    goalMembeship: goal._id,
  });

  res.send({ message: "Membership request declined." });
});

module.exports = router;
