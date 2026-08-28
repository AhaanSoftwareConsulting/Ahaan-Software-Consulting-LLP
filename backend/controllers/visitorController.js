// controllers/visitorController.js
const { Op } = require('sequelize');
const sequelize = require('../config/db');
const Visitor = require('../models/Visitor');

// POST /api/visitor/track
exports.trackVisit = async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    await Visitor.create({ ip_address: ip });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log visit' });
  }
};

// GET /api/visitor/total
exports.getTotal = async (req, res) => {
  try {
    const total = await Visitor.count();
    res.json({ totalVisitors: total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch total' });
  }
};

// GET /api/visitor/stats?range=daily|weekly|monthly
exports.getStats = async (req, res) => {
  try {
    const { range = 'daily' } = req.query;
    let query;

    if (range === 'daily') {
      query = `
        SELECT DATE(visited_at) AS label, COUNT(*) AS count
        FROM visitors
        WHERE visited_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        GROUP BY DATE(visited_at)
        ORDER BY DATE(visited_at) ASC
      `;
    } else if (range === 'weekly') {
      query = `
        SELECT YEARWEEK(visited_at, 3) AS label, COUNT(*) AS count
        FROM visitors
        WHERE visited_at >= DATE_SUB(CURDATE(), INTERVAL 12 WEEK)
        GROUP BY YEARWEEK(visited_at, 3)
        ORDER BY YEARWEEK(visited_at, 3) ASC
      `;
    } else if (range === 'monthly') {
      query = `
        SELECT DATE_FORMAT(visited_at, '%Y-%m') AS label, COUNT(*) AS count
        FROM visitors
        WHERE visited_at >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        GROUP BY DATE_FORMAT(visited_at, '%Y-%m')
        ORDER BY DATE_FORMAT(visited_at, '%Y-%m') ASC
      `;
    } else {
      return res.status(400).json({ error: 'Invalid range' });
    }

    const [rows] = await sequelize.query(query);

    // MySQL sometimes returns COUNT(*) as a string via raw queries — normalize it
    const data = rows.map((row) => ({
      ...row,
      count: Number(row.count),
    }));

    res.json({ range, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};