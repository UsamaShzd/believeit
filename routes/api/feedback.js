const express = require("express");
const authorize = require("../../middlewares/authorize");
const requestValidator = require("../../middlewares/requestValidator");

const { feedBackSchema } = require("../../validators/feedback");
const sendFeedbackEmail = require("../../helpers/sendFeedbackEmail");
const router = express.Router();

router.post(
  "/",
  requestValidator(feedBackSchema),
  authorize(),
  async (req, res) => {
    //TODO: send email

    sendFeedbackEmail(req.body);
    res.send({ message: "Feedback Email sent" });
  }
);

router.get("/", (req, res) => {
  const feedback = {
    name: "Usama Shehzad",
    email: "UsamaShzd99@gmail.com",
    subject: "Feedback Email",
    message: "Feedback Message",
  };

  const { name, email, subject, message } = feedback;
  res.render("email/feedback", {
    layout: "email",
    heading: "Feedback From " + name,
    email,
    message,
    logo: process.env.BASE_URL + "/images/email_logo.png",
  });
});

module.exports = router;
