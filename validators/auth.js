const yup = require("yup");

const email = yup.string().trim().email().min(5).max(100).required();
const password = yup.string().trim().min(5).max(25).required();

exports.loginSchema = yup.object().shape({
  email,
  password,
});

exports.signupSchema = yup.object().shape({
  firstname: yup.string().trim().min(5).max(100).required(),
  lastname: yup.string().trim().min(5).max(100).required(),
  email,
  password,
});

exports.verifyEmailSchema = yup.object().shape({
  verificationCode: yup.string().trim().min(6).max(6).required(),
});

exports.requestPasswordResetSchema = yup.object().shape({
  email,
});

exports.passwordResetVerifiationSchema = yup.object().shape({
  email,
  resetCode: yup.string().trim().min(6).max(6).required(),
});

exports.resetPasswordSchema = yup.object().shape({
  email,
  resetCode: yup.string().trim().min(6).max(6).required(),
  password,
});

exports.changePasswordSchema = yup.object().shape({
  previousPassword: password,
  password,
});
