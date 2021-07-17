const moment = require("moment");
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
  ethnicity: yup.string().optional(),
});

const updateUserNotificationsSchema = yup.object().shape({
  emailChatNotifications: yup.boolean().required(),
  textChatNotifications: yup.boolean().required(),
  emailMilestoneNotifications: yup.boolean().required(),
  textMilestoneNotifications: yup.boolean().required(),

  goalPlan: yup.string().required("Goal Plan time cannot be empty"),

  affirmationReminderTime: yup.object().shape({
    amTime: yup.string().required("Affirmation AM time cannot be empty"),
    pmTime: yup.string().required("Affirmation PM time cannot be empty"),
  }),

  eCoaching: yup
    .object()
    .shape({
      numberOfNotifications: yup.number().min(0).max(7).required(),
      startTime: yup.string().required("start time cannot be empty"),
      endTime: yup
        .string()
        .required("end time cannot be empty")
        .test("is-greater", "end time should be greater", function (value) {
          const { startTime } = this.options.parent;

          return moment(value, "HH:mm").isSameOrAfter(
            moment(startTime, "HH:mm").toDate()
          );
        }),
    })
    .required(),

  prayers: yup
    .object()
    .shape({
      numberOfNotifications: yup.number().min(0).max(7).required(),
      startTime: yup.string().required("start time cannot be empty"),
      endTime: yup
        .string()
        .required("end time cannot be empty")
        .test("is-greater", "end time should be greater", function (value) {
          const { startTime } = this.options.parent;

          return moment(value, "HH:mm").isSameOrAfter(
            moment(startTime, "HH:mm").toDate()
          );
        }),
    })
    .required(),

  motivationalQoutes: yup
    .object()
    .shape({
      numberOfNotifications: yup.number().min(0).max(7).required(),
      startTime: yup.string().required("start time cannot be empty"),
      endTime: yup
        .string()
        .required("end time cannot be empty")
        .test("is-greater", "end time should be greater", function (value) {
          const { startTime } = this.options.parent;

          return moment(value, "HH:mm").isSameOrAfter(
            moment(startTime, "HH:mm").toDate()
          );
        }),
    })
    .required(),

  extraAffirmations: yup
    .object()
    .shape({
      numberOfNotifications: yup.number().min(0).max(7).required(),
      startTime: yup.string().required("start time cannot be empty"),
      endTime: yup
        .string()
        .required("end time cannot be empty")
        .test("is-greater", "end time should be greater", function (value) {
          const { startTime } = this.options.parent;

          return moment(value, "HH:mm").isSameOrAfter(
            moment(startTime, "HH:mm").toDate()
          );
        }),
    })
    .required(),
});

module.exports = {
  updateProfilePicSchema,
  updateLocationSchema,
  updateUserDetails,
  updateUserNotificationsSchema,
};
