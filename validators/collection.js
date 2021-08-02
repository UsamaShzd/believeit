const yup = require("yup");

const createCollectionSchema = yup.object().shape({
  name: yup.string().trim().min(1).max(100).required(),
});

module.exports = {
  createCollectionSchema,
  editCollectionSchema: createCollectionSchema,
};
