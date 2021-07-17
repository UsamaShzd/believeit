const yup = require("yup");

const stirpePaymentSchema = yup.object().shape({
  stripePaymentToken: yup.string().min(5).required(),
});

const monthlyGooglePaySchema = yup.object().shape({
  purchaseToken: yup.string().required(),
  packageName: yup.string().required(),
  productId: yup.string().required(),
});

const monthlyApplePaySchema = yup.object().shape({
  reciptData: yup.string().required(),
  password: yup.string().required(),
  excludeOldTransactions: yup.boolean().optional(),
});

module.exports = {
  stirpePaymentSchema,
  monthlyGooglePaySchema,
  monthlyApplePaySchema,
};
