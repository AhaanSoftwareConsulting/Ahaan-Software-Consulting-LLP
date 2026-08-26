const Newsletter = require("../models/NewsletterSQL");

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const formattedEmail = email.trim().toLowerCase();

    // Check if email already exists
    const alreadyExists = await Newsletter.findOne({
      where: { email: formattedEmail },
    });

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    // Create new subscriber
    const subscriber = await Newsletter.create({ email: formattedEmail });

    res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      data: subscriber,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: subscribers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  subscribeNewsletter,
  getSubscribers,
};