const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus, trackOrder } = require('../controllers/orderController');
const protect = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/track/:trackingId', trackOrder);
router.get('/', protect, getAllOrders);
router.put('/:id/status', protect, updateOrderStatus);

router.post('/:id/confirm-delivery', async (req, res) => {
  try {
    const Order = require('../models/Order');
    
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    
    order.status = 'delivered';
    await order.save();
    res.json({ message: 'Delivery confirmed!', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/:id/proof', async (req, res) => {
  try {
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
      const Order = require('../models/Order');
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      order.proofOfPayment = req.file.path;
      await order.save();
      res.json({ message: 'Proof uploaded successfully', order });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
