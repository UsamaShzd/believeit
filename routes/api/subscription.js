const path = require("path");
const express = require("express");
const axios = require("axios");
const moment = require("moment");
const { google } = require("googleapis");
const authorize = require("../../middlewares/authorize");

const _ = require("lodash");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const androidpublisher = google.androidpublisher("v3");

const sanitizeUser = require("../../sanitizers/user");

const { FREE, MONTHLY, YEARLY } = require("../../enums/subscription_plans");
const requestValidator = require("../../middlewares/requestValidator");

const {
  stirpePaymentSchema,
  monthlyGooglePaySchema,
  monthlyApplePaySchema,
} = require("../../validators/subscription");

const applePayValidationUrl =
  process.env.NODE_ENV === "development"
    ? "https://sandbox.itunes.apple.com/verifyReceipt"
    : "https://buy.itunes.apple.com/verifyReceipt";

const router = express.Router();

router.post("/subscribe_free_plan", authorize(), async (req, res) => {
  const { user } = req.authSession;
  const currentDate = Date.now();

  const plan = {
    type: FREE.name,
    isTrial: false,
    isUnlimited: FREE.isUnlimited,
    subscriptionStart: currentDate,
    subscriptionEnd: null,
  };

  user.subscription = plan;
  await user.save();
  res.send(_.pick(user, ["subscription"]));
});

router.post(
  "/subscribe_monthly_plan/stripe",
  requestValidator(stirpePaymentSchema),
  authorize(),
  async (req, res) => {
    const { user } = req.authSession;
    const { stripePaymentToken } = _.pick(req.body, ["stripePaymentToken"]);

    if (!user.stripeCustomerId) {
      // create customer
      const customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstname} ${user.lastname}`,
        source: stripePaymentToken,
      });

      user.stripeCustomerId = customer.id;
      await user.save();
    }

    //
    const charge = await stripe.charges.create({
      amount: MONTHLY.price * 100,
      currency: "usd",

      description: "User subscribed to monthly plan.",
      metadata: {
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
      },
      customer: user.stripeCustomerId,
    });

    const startDate = moment();
    const endDate = moment().add(1, "months");
    if (user.subscription && user.subscription.type === MONTHLY.name) {
      user.subscription.type = MONTHLY.name;
      user.subscription.subscriptionStart = startDate.toDate();
      user.subscription.subscriptionEnd = endDate.toDate();
      user.subscription.isUnlimited = MONTHLY.isUnlimited;
      user.subscription.isTrial = false;
      user.subscription.maxActiveGoals = MONTHLY.maxActiveGoals;
    } else {
      user.subscription = {
        type: MONTHLY.name,
        subscriptionStart: startDate.toDate(),
        subscriptionEnd: endDate.toDate(),
        isUnlimited: MONTHLY.isUnlimited,
        isTrial: false,
        maxActiveGoals: MONTHLY.maxActiveGoals,
      };
    }

    await user.save();
    res.send(_.pick(user, ["subscription"]));
  }
);

router.post(
  "/subscribe_monthly_plan_google_pay",
  requestValidator(monthlyGooglePaySchema),
  authorize(),
  async (req, res) => {
    //me.believeit.www

    res.send(req.body);
  }
);

router.post(
  "/subscribe_monthly_plan_apple_pay",
  requestValidator(monthlyApplePaySchema),
  authorize(),
  async (req, res) => {
    //me.believeit.www

    const { reciptData, password, excludeOldTransactions } = _.pick(req.body, [
      "reciptData",
      "password",
      "excludeOldTransactions",
    ]);

    res.send(req.body);
  }
);

router.post(
  "/subscribe_yearly_plan_google_pay",
  requestValidator(monthlyGooglePaySchema),
  authorize(),
  async (req, res) => {
    const { purchaseToken, packageName, productId } = _.pick(req.body, [
      "purchaseToken",
      "packageName",
      "productId",
    ]);

    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, "../../google_service_account.json"),
      scopes: ["https://www.googleapis.com/auth/androidpublisher"],
    });

    // Acquire an auth client, and bind it to all future calls
    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    res.send(req.body);

    // const verificationUrl = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/subscriptions/${productId}/tokens/${purchaseToken}`;

    // try {
    //   const verificationResult = await axios.get(verificationUrl);
    //   res.send(verificationResult.data);
    // } catch (err) {
    //   res.send(err.response.data);
    // }
  }
);

router.post(
  "/subscribe_yearly_plan_apple_pay",
  requestValidator(monthlyGooglePaySchema),
  authorize(),
  async (req, res) => {
    //me.believeit.www
  }
);
module.exports = router;
