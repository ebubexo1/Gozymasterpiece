const axios = require('axios');
const crypto = require('crypto');
const Order = require('../models/Order');
const User = require('../models/User');
const { sendPaymentConfirmation } = require('../utils/emailService');

const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.body;
    const response = await axios.get('https://api.paystack.co/transaction/verify/' + reference, {
      headers: { Authorization: 'Bearer ' + process.env.PAYSTACK_SECRET_KEY }
    });
    const { status, amount, channel } = response.data.data;
    if (status === 'success') {
      res.json({ status: 'success', amount, channel });
    } else {
      res.status(400).json({ status: 'failed', message: 'Payment not successful' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const webhookHandler = async (req, res) => {
  try {
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body)).digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      return res.status(401).send('Invalid signature');
    }

    const event = req.body;
    if (event.event === 'charge.success') {
      const { reference, metadata, amount, channel } = event.data;
      const email = event.data.customer.email;

      const existingOrder = await Order.findOne({ reference });
      if (existingOrder) return res.sendStatus(200);

      const user = await User.findOne({ email });
      if (!user) return res.sendStatus(200);

      const customFields = metadata?.custom_fields || [];
      const phone = customFields.find(f => f.variable_name === 'phone')?.value || '';
      const address = customFields.find(f => f.variable_name === 'address')?.value || '';
      const itemsStr = customFields.find(f => f.variable_name === 'items')?.value || '[]';

      let items = [];
      try { items = JSON.parse(itemsStr); } catch(e) { items = []; }

      const order = await Order.create({
        user: user._id,
        reference,
        total: amount / 100,
        items,
        status: 'paid',
        paymentMethod: channel,
        phone,
        address
      });

      // Send payment confirmation email
      try {
        await sendPaymentConfirmation(email, user.name, order);
      } catch (emailErr) {
        console.error('Payment email failed:', emailErr.message);
      }

      console.log('Order created via webhook:', order.trackingId);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Webhook error:', error);
    res.sendStatus(500);
  }
};

module.exports = { verifyPayment, webhookHandler };
