const express = require("express");

const moment = require("moment");
const authorize = require("../../middlewares/authorize");

const _ = require("lodash");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const sanitizeUser = require("../../sanitizers/user");

const { FREE, MONTHLY } = require("../../enums/subscription_plans");
const requestValidator = require("../../middlewares/requestValidator");

const { stirpePaymentSchema } = require("../../validators/subscription");
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

// router.get("/my_stripe_payment_methods", authorize(), async (req, res) => {
//   //
//   // const paymentMethod = await stripe.paymentMethods.retrieve(
//   //   "pm_1IxAzF2eZvKYlo2CdRanIWVf"
//   // );

//   const { user } = req.authSession;
//   const customer = await stripe.customers.retrieve(user.stripeCustomerId);

//   res.send(customer);
// });

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

module.exports = router;
