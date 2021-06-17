const yup = require("yup");

const updateProfilePicSchema = yup.object().shape({
  image: yup
    .string()
    .required("Image is required")
    .objectId("Invalid Image Id."),
});

const updateLocationSchema = yup.object().shape({
  longitude: yup.number().required(),
  latitude: yup.number().required(),
});

const updateUserDetails = yup.object().shape({
  firstname: yup.string().trim().min(5).max(100).required(),
  lastname: yup.string().trim().min(5).max(100).required(),
  gender: yup.string().optional(),
  relationshipStatus: yup.string().optional(),
  employmentStatus: yup.string().optional(),
  numberOfchildrens: yup.number().optional(),
  topHobbies: yup.array().of(yup.string().optional()).optional(),
});

module.exports = {
  updateProfilePicSchema,
  updateLocationSchema,
  updateUserDetails,
};
