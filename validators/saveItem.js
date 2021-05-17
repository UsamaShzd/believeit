const yup = require("yup");

const saveItemSchema = yup.object().shape({
  content: yup.string().objectId().required(),
  type: yup.string().oneOf(["qoutation", "post"]).required(),
});

const unsaveItemSchema = yup.object().shape({
  content: yup.string().objectId().required(),
});

module.exports = {
  saveItemSchema,
  unsaveItemSchema,
};
