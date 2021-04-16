const yup = require("yup");

const createGroupChatSchema = yup.object().shape({
  name: yup.string().trim().min(0).max(200),
  description: yup.string().trim().min(0).max(500),
  members: yup.array().of(yup.string().objectId()).min(1).required(),
});

module.exports = {
  createGroupChatSchema,
};
