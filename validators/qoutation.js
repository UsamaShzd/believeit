const yup = require("yup");

const createQoutationSchema = yup.object().shape({
  qoutation: yup.string().min(1).max(3000).required(),
  category: yup.string().objectId().required(),
});

module.exports = {
  createQoutationSchema,
  editQoutationSchema: createQoutationSchema,
};
