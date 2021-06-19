const moment = require("moment");

const MIN_INTERVAL = 20;

module.exports = ({ startTime, endTime, numberOfNotifications }) => {
  const start = moment(startTime, "HH:mm");
  const end = moment(endTime, "HH:mm");

  let diff = Math.round(
    moment.duration(end.diff(start)).minutes() / numberOfNotifications
  );

  diff = diff < MIN_INTERVAL ? MIN_INTERVAL : diff;

  const schedule = [];

  for (let i = 0; i < numberOfNotifications; ++i) {
    schedule.push(start.toDate());
    start.add(diff || MIN_INTERVAL, "minutes");
  }

  return schedule;
};
