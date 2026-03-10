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

module.exports = router;
