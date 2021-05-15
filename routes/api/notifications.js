const express = require("express");

const Notification = require("../../models/Notification");
const authorize = require("../../middlewares/authorize");

const USER_PUBLIC_FIELDS =
  "firstname lastname image.thumbnailUrl image.imageUrl image.aspectRatio";

const router = express.Router();

router.get("/my_notifications", authorize(), async (req, res) => {
  const { last_notification_id = "", pageSize = 20 } = req.query;
  const { user } = req.authSession;

  const query = {
    reciever: user._id,
  };

  if (last_notification_id) {
    if (!validateObjectId(last_notification_id))
      return res.status(400).send({
        error: {
          message: "Invalid last notification id",
        },
      });
    //
    query._id = {
      $lt: last_notification_id,
    };
  }
  const notifications = await Notification.find(query)
    .limit(pageSize)
    .sort("-createdAt")
    .populate("sender", USER_PUBLIC_FIELDS);

  res.send(notifications);
});

module.exports = router;
