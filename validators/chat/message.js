const yup = require("yup");

const createChatMessageSchema = yup.object().shape({
  chatRoom: yup.string().objectId().required(),
  isDirectMessage: yup.boolean().required(),
  customIdentifier: yup.string().required(),
  content: yup
    .object({
      message: yup.string().min(0).max(5000),
      tags: yup
        .array()
        .of(
          yup.object({
            startIndex: yup
              .number("Invalid Tag Start Index")
              .min(0)
              .required("Tag start index is required"),
            endIndex: yup
              .number("Invalid Tag End Index")
              .min(0)
              .required("Tag end index is required"),
            user: yup
              .string()
              .objectId("Invalid User ID.")
              .required("Taged user ID is required"),
          })
        )
        .min(0)
        .max(1000),
    })
    .required(),
});

module.exports = {
  createChatMessageSchema,
};

//customIdentifier
