const express = require("express");
const axios = require("axios");
const _ = require("lodash");

const ClickReport = require("../../../models/ClickReport");
const requestValidator = require("../../../middlewares/requestValidator");

const {
  googleSearchApiSchema,
  trackClickSchema,
} = require("../../../validators/google/search");
const authorize = require("../../../middlewares/authorize");

const router = express.Router();

const ZEN_SERP_API = process.env.ZEN_SERP_API;
router.post(
  "/articles",
  requestValidator(googleSearchApiSchema),
  async (req, res) => {
    const { searchQuery } = _.pick(req.body, ["searchQuery"]);
    const result = await axios.get("https://app.zenserp.com/api/v2/search", {
      headers: {
        apiKey: ZEN_SERP_API,
      },
      params: {
        q: searchQuery,
      },
    });

    const filtered = result.data.organic.filter((blog) => {
      if (blog.title && blog.url) return true;
      return false;
    });

    res.send(filtered.slice(0, 3));
  }
);

router.post(
  "/track_article_click",
  authorize(),
  requestValidator(trackClickSchema),
  async (req, res) => {
    const { link } = _.pick(req.body, ["link"]);
    const { user } = req.authSession;

    const clickReport = await new ClickReport({ link, user: user._id });

    res.send(clickReport);
  }
);
module.exports = router;
