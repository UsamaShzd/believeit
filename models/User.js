const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ImageMedia = require("./media/ImageMedia");

const roles = require("../enums/roles");
const subscription_plans = require("../enums/subscription_plans");

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
  },

  lastname: {
    type: String,
    trim: true,
  },

  email: {
    type: String,
    trim: true,
    index: true,
  },

  image: ImageMedia.schema,

  password: {
    type: String,
    default: "",
  },

  emailVerified: {
    type: Boolean,
    default: false,
  },

  emailVerificationCode: {
    type: String,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  passwordResetCode: {
    type: String,
    trim: true,
  },

  role: {
    type: String,
    trim: true,
    default: roles.USER,
    enum: Object.entries(roles).map((role) => role[1]),
  },

  activeGoals: {
    type: Number,
    default: 0,
  },

  location: {
    type: pointSchema,
    index: "2dsphere",
  },

  subscription: {
    type: {
      type: String,
      trim: true,
      enum: Object.entries(subscription_plans).map((plan) => plan.name),
    },

    subscriptionStart: {
      type: Date,
    },

    subscriptionEnd: {
      type: Date,
    },

    isUnlimited: {
      type: Boolean,
      default: false,
    },

    isTrial: {
      type: Boolean,
    },
  },

  categoryScore: {
    type: Object,
  },

  wellnessScore: {
    type: Number,
    default: 0,
  },
  clarityOnPurposeScore: {
    type: Number,
    default: 0,
  },
});

userSchema.methods.hashPassword = async function (password) {
  //generating password hash
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const genereteRandomCode = () => Math.floor(100000 + Math.random() * 900000);

userSchema.methods.generateEmailVerificationCode = function () {
  if (!this.emailVerificationCode)
    this.emailVerificationCode = genereteRandomCode();
  return this.emailVerificationCode;
};

userSchema.methods.generatePasswordResetCode = function () {
  this.passwordResetCode = genereteRandomCode();
  return this.passwordResetCode;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
