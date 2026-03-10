const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');
const protect = require('../middleware/auth');

router.post('/track', async (req, res) => {
  try {
    const { page, referrer } = req.body;
    await Analytics.create({
      page,
      referrer,
      userAgent: req.headers['user-agent'],
      ip: req.ip
    });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

router.get('/stats', protect, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const totalVisits = await Analytics.countDocuments();
    const todayVisits = await Analytics.countDocuments({ createdAt: { $gte: today } });
    const monthVisits = await Analytics.countDocuments({ createdAt: { $gte: thisMonth } });

    const topPages = await Analytics.aggregate([
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const dailyVisits = await Analytics.aggregate([
      { $match: { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({ totalVisits, todayVisits, monthVisits, topPages, dailyVisits });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
