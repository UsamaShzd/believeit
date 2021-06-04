const moment = require("moment");

exports.getDatesOfRepeatingDays = (startDate, endDate, repeatingDays = []) => {
  startDate = moment(startDate, "MM/DD/YYYY");
  endDate = moment(endDate, "MM/DD/YYYY").toDate();
  const result = [];
  while (startDate.toDate() <= endDate) {
    const dayName = startDate.format("dddd").toLowerCase();
    if (repeatingDays.includes(dayName)) {
      result.push(startDate.toDate());
    }
    startDate.add(1, "days");
  }
  return result;
};
