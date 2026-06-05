const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus, trackOrder } = require('../controllers/orderController');
const protect = require('../middleware/auth');
const admin = require('../middleware/admin');
const Order = require('../models/Order');

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/track/:trackingId', trackOrder);
router.get('/', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

// Rider confirms delivery with the 4-digit code the customer shows them.
// No login (riders are not users), but the code must match the order.
router.post('/:id/confirm-delivery', async (req, res) => {
  try {
    const { code } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.status === 'delivered') return res.json({ message: 'Already delivered', order });
    if (order.status !== 'out_for_delivery') {
      return res.status(400).json({ message: 'This order is not out for delivery yet' });
    }
    if (!code || String(code).trim() !== String(order.deliveryCode)) {
      return res.status(401).json({ message: 'Invalid delivery code' });
    }
    order.status = 'delivered';
    await order.save();
    res.json({ message: 'Delivery confirmed!', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Customer uploads proof of payment for their OWN order.
router.post('/:id/proof', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not your order' });
    }
    const multer = require('multer');
    const { CloudinaryStorage } = require('multer-storage-cloudinary');
    const cloudinary = require('cloudinary').v2;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    const storage = new CloudinaryStorage({
      cloudinary,
      params: { folder: 'gozy-proof', allowed_formats: ['jpg', 'jpeg', 'png'] }
    });
    const upload = multer({ storage }).single('proof');
    upload(req, res, async (err) => {
      if (err) return res.status(500).json({ message: err.message });
      order.proofOfPayment = req.file.path;
      await order.save();
      try {
        const { sendProofUploadNotification } = require('../utils/emailService');
        await sendProofUploadNotification(order);
      } catch (e) { console.error('Proof email error:', e.message); }
      res.json({ message: 'Proof uploaded successfully', order });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
