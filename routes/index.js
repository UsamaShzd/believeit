const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("email/verify_email", {
    layout: "email",
    verificationCode: "123456",
    heading: "Welcome To Believe-It",
    baseUrl: process.env.BASE_URL,
    logo: process.env.BASE_URL + "/images/email_logo.png",
  });
});

module.exports = router;
