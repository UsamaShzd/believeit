const _ = require("lodash");
const express = require("express");
const authorize = require("../../middlewares/authorize");

const validateObjectId = require("../../helpers/validateObjectId");

const User = require("../../models/User");
const Connection = require("../../models/Connection");

const requestValidator = require("../../middlewares/requestValidator");
const {
  searchConnectionSchema,
  requestConnectionSchema,
} = require("../../validators/connection");

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
    const { name } = _.pick(req.body, ["name"]);
    //
    const users = await User.find();
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

module.exports = router;
