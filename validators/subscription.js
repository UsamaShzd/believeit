const yup = require("yup");

const stirpePaymentSchema = yup.object().shape({
  stripePaymentToken: yup.string().min(5).required(),
});

const googlePaySchema = yup.object().shape({
  purchaseToken: yup.string().required(),
  subscriptionId: yup.string().required(),
});

const applePaySchema = yup.object().shape({
  reciptData: yup.string().required(),
  password: yup.string().required(),
  excludeOldTransactions: yup.boolean().optional(),
  subscriptionType: yup.string().required(),
});

module.exports = {
  stirpePaymentSchema,
  googlePaySchema,
  applePaySchema,
};
