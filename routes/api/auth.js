const express = require("express");
const _ = require("lodash");

const User = require("../../models/User");
const AuthSession = require("../../models/AuthSession");

const authorize = require("../../middlewares/authorize");
const requestValidator = require("../../middlewares/requestValidator");
const {
  signupSchema,
  loginSchema,
  verifyEmailSchema,
  requestPasswordResetSchema,
  passwordResetVerifiationSchema,
  resetPasswordSchema,
  changePasswordSchema,
} = require("../../validators/auth");
const jwt = require("../../services/jwt");

const sanitizeUser = require("../../sanitizers/user");
const { response } = require("express");

const router = express.Router();

// @route /me
router.get("/me", authorize("", { emailVerifid: false }), (req, res) => {
  res.send(sanitizeUser(req.authSession.user));
});

// @route /signup
router.post("/signup", requestValidator(signupSchema), async (req, res) => {
  const body = _.pick(req.body, ["firstname", "lastname", "email", "password"]);

  //check if user exists
  const previousUser = await User.findOne({ email: body.email });
  if (previousUser)
    return res.status(409).send({
      error: {
        message: "User already exists!",
      },
    });

  const user = new User({ ...body, createdAt: new Date() });
  user.password = await user.hashPassword(body.password);

  const emailVerificationCode = user.generateEmailVerificationCode();

  await user.save();
  createUserSessionAndSendResponse(res, user);
});

// @route /signin
router.post("/signin", requestValidator(loginSchema), async (req, res) => {
  const { email, password } = _.pick(req.body, ["email", "password"]);

  //check if user exists
  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).send({
      error: {
        message: "Invalid email or password!",
      },
    });

  //check password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect)
    return res.status(404).send({
      error: {
        message: "Invalid email or password!",
      },
    });

  createUserSessionAndSendResponse(res, user);
});

// @route /request_password_reset
router.post(
  "/request_password_reset",
  requestValidator(requestPasswordResetSchema),
  async (req, res) => {
    const { email } = _.pick(req.body, ["email"]);
    //check if email already exists
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).send({
        error: {
          message: "User not found!",
        },
      });

    const passwordResetCode = user.generatePasswordResetCode();
    await user.save();

    res.send({
      message: "Password reset code has been sent to your email.",
    });
  }
);
// @route /password_reset_code_verification
router.post(
  "/password_reset_code_verification",
  requestValidator(passwordResetVerifiationSchema),
  async (req, res) => {
    const body = _.pick(req.body, ["email", "resetCode"]);
    const { email, resetCode } = body;
    const user = await User.findOne({ email });
    if (!user) res.status(404).send({ error: { message: "User not found!" } });

    if (user.passwordResetCode !== resetCode)
      return res.status(400).send({ error: { message: "Invalid Code" } });

    res.send({ message: "OK!" });
  }
);

// @route /change_password
router.put(
  "/change_password",
  requestValidator(changePasswordSchema),
  authorize("", { emailVerified: false }),
  async (req, res) => {
    const body = _.pick(req.body, ["password", "previousPassword"]);
    const { previousPassword, password } = body;

    const { user } = req.authSession;

    const isPreviousPassValid = await user.comparePassword(previousPassword);
    if (!isPreviousPassValid)
      return res.status(400).send({
        error: {
          message: "Invalid Password",
        },
      });

    user.password = await user.hashPassword(password);
    user.save();

    res.send({ message: "Password Changed Successfully" });
  }
);

// @route /reset_password
router.put(
  "/reset_password",
  requestValidator(resetPasswordSchema),
  async (req, res) => {
    const body = _.pick(req.body, ["email", "resetCode", "password"]);

    const { email, password, resetCode } = body;
    //check if email already exists

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).send({
        error: {
          message: "User not found!",
        },
      });

    if (user.passwordResetCode !== resetCode)
      return res.status(400).send({
        error: {
          message: "Invalid reset code.",
        },
      });

    //generating password hash
    user.password = await user.hashPassword(password);
    user.passwordResetCode = "";
    await user.save();

    res.send({ message: "password reset successfull" });
  }
);

// @route /verify_email
router.put(
  "/verify_email",
  requestValidator(verifyEmailSchema),
  authorize("", { emailVerified: false }),
  async (req, res) => {
    const body = _.pick(req.body, ["verificationCode"]);
    const { user } = req.authSession;

    if (user.emailVerificationCode !== body.verificationCode)
      return res.status(400).send({
        error: {
          message: "Invalid verification code.",
        },
      });

    user.emailVerified = true;
    user.emailVerificationCode = "";

    await user.save();
    res.send({ message: "your email is verified." });
  }
);

const createUserSessionAndSendResponse = async (res, user) => {
  const session = await new AuthSession({
    user: user._id,
    createdAt: new Date(),
  }).save();

  const token = jwt.encrypt({ _id: session._id });
  res.header("token", token).header("Access-Control-Expose-Headers", "token");
  res.send({ token, user: sanitizeUser(user) });
};

module.exports = router;
