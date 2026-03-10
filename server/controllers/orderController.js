const Order = require('../models/Order');
const User = require('../models/User');
const { sendOrderConfirmation, sendStatusUpdate } = require('../utils/emailService');

const createOrder = async (req, res) => {
  try {
    const { items, total, reference, paymentMethod, address, phone } = req.body;
    const order = new Order({
      user: req.user.id,
      items, total, reference, paymentMethod, address, phone
    });
    await order.save();

    // Send confirmation email
    try {
      const user = await User.findById(req.user.id);
      await sendOrderConfirmation(user.email, user.name, order);
    } catch (emailErr) {
      console.error('Order email failed:', emailErr.message);
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status, deliveryType, riderName, riderPhone, shippingCompany, shippingTracking } = req.body;
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    if (deliveryType) order.deliveryType = deliveryType;
    if (deliveryType === 'local_dispatch' && riderName) {
      order.rider = { name: riderName, phone: riderPhone };
    }
    if (deliveryType === 'shipping' && shippingCompany) {
      order.shipping = { company: shippingCompany, trackingNumber: shippingTracking };
    }
    await order.save();

    // Send status update email
    try {
      await sendStatusUpdate(order.user.email, order.user.name, order);
    } catch (emailErr) {
      console.error('Status email failed:', emailErr.message);
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const trackOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ trackingId: req.params.trackingId }).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus, trackOrder };
