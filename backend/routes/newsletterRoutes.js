const express = require("express");
const router = express.Router();

const {
  subscribeNewsletter,
  getSubscribers,
} = require("../controllers/newsletterController");

// Subscribe to newsletter
router.post("/add", subscribeNewsletter);

// Get all subscribers
router.get("/all", getSubscribers);
  
module.exports = router;