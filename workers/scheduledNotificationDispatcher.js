const _ = require("lodash");

const ScheduledNotification = require("../models/ScheduledNotification");
const Notification = require("../models/Notification");
const User = require("../models/User");

const getPushTokens = require("../helpers/getPushTokens");

const { sendPushNotifications } = require("../services/expo/pushNotification");

module.exports = async () => {
  const scheduledNotifications = await ScheduledNotification.find({
    dispatchAt: { $lte: new Date() },
  });

  console.log("scheduled Notifications to dispatch =>", scheduledNotifications);
  scheduledNotifications.forEach(async (scheduledNotif) => {
    //creating notification in database

    const { reciever, type, prayer, eCoaching } = scheduledNotif;

    const notificationBody = {
      reciever,
      type,
    };

    switch (type) {
      case "prayer_notification":
        notificationBody.prayer = prayer;
        break;
      case "e_coaching_notification":
        notificationBody.eCoaching = eCoaching;
        break;
    }

    //creating notification
    const notification = await new Notification(notificationBody).save();
    //deleting scheduled notification
    await ScheduledNotification.findByIdAndDelete(scheduledNotif._id);

    //updating user notificadtion count
    const user = await User.findByIdAndUpdate(
      reciever,
      { $inc: { notificationCount: 1 } },
      { new: true }
    );
    //sending a push notificaton
    const pushtokens = await getPushTokens(reciever.toHexString());

    //construct push notification
    const push_notification = {
      to: pushtokens,
      sound: "default",
    };
    switch (type) {
      case "prayer_notification":
        push_notification.title = prayer.name;
        push_notification.body = prayer.prayer;
        push_notification.data = _.pick(prayer, [
          "_id",
          "name",
          "prayer",
          "translation",
          "type",
        ]);
        break;
      case "e_coaching_notification":
        push_notification.title = "E-Coaching Notification";
        push_notification.body = eCoaching;
        push_notification.data = {
          eCoachingMessage: eCoaching,
        };
        break;
    }
    sendPushNotifications(push_notification);
  });
};
