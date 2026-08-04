const express = require("express");
const Visitor = require("../models/Visitor");
const router = express.Router();

router.get("/count", async (req, res) => {
  try {
    let data = await Visitor.findOne();

    // যদি ডাটাবেজে না থাকে → নতুন counter তৈরি
    if (!data) {
      data = await Visitor.create({ count: 1 });
      return res.json({ success: true, visitors: data.count });
    }

    // ————————————————
    // 🚀 Prevent Double Count from React Strict Mode
    // ————————————————
    // যদি একই IP থেকে 5 সেকেন্ডের মধ্যে আবার হিট করে → count বাড়াবে না
    const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const now = Date.now();

    if (!data.lastVisit) {
      data.lastVisit = {};
    }

    if (data.lastVisit[userIp] && now - data.lastVisit[userIp] < 5000) {
      return res.json({
        success: true,
        visitors: data.count,
      });
    }

    // নতুন ভিজিট → count বাড়বে
    data.count += 1;
    data.lastVisit[userIp] = now;
    await data.save();

    res.json({
      success: true,
      visitors: data.count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// ⭐ NEW: Fetch Total Visitors (Admin Panel)
router.get("/total", async (req, res) => {
  try {
    let data = await Visitor.findOne();

    // যদি কখনো visitor না আসে
    if (!data) {
      return res.json({ success: true, totalVisitors: 0 });
    }

    res.json({
      success: true,
      totalVisitors: data.count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
