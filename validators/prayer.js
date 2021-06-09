const yup = require("yup");

const createPrayerSchema = yup.object().shape({
  prayer: yup.string().trim().min(3).required(),
  translation: yup.string().trim().min(3).required(),
  type: yup.string().trim().min(3).required(),
  prayerDays: yup.array().of(yup.string().required()).optional(),
});

module.exports = {
  createPrayerSchema,
  editPrayerSchema: createPrayerSchema,
};
