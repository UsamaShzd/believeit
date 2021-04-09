const yup = require("yup");

exports.updateProfilePicSchema = yup.object().shape({
  image: yup
    .string()
    .required("Image is required")
    .objectId("Invalid Image Id."),
});
