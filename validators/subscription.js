const yup = require("yup");

const stirpePaymentSchema = yup.object().shape({
  stripePaymentToken: yup.string().min(5).required(),
});

module.exports = {
  stirpePaymentSchema,
};
