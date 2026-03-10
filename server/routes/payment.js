const express = require('express');
const router = express.Router();
const { verifyPayment, webhookHandler } = require('../controllers/paymentController');
const protect = require('../middleware/auth');

router.post('/verify', protect, verifyPayment);
router.post('/webhook', webhookHandler);

module.exports = router;
