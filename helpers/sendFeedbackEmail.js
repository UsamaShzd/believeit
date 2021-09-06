const mailer = require("../services/mailer");

module.exports = async ({
  name = "",
  email = "",
  subject = "",
  message = "",
}) => {
  mailer.sendMail({
    to: `${email}, ${process.env.SMTP_EMAIL}`,
    subject, // Subject line
    text: "Feedback Email", // plain text body
    template: "email/feedback",
    context: {
      layout: "email",
      heading: "Feedback From " + name,
      email,
      message,
      logo: process.env.BASE_URL + "/images/email_logo.png",
    },
  });
};
