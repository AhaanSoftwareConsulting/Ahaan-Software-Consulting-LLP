const express = require("express");
const router = express.Router();

const {
  subscribeNewsletter,
  getSubscribers,
} = require("../controllers/newsletterController");

router.post("/", subscribeNewsletter);
router.get("/", getSubscribers);

module.exports = router;