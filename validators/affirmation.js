const yup = require("yup");

const createAffirmationSchema = yup.object().shape({
  affirmation: yup.string().min(5).max(3000).required(),
  category: yup.string().objectId().required(),
});

module.exports = {
  createAffirmationSchema,
  editAffirmationSchema: createAffirmationSchema,
};
