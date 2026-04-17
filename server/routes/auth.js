const express = require('express');
const router = express.Router();
const { register, login, getMe, forgotPassword, resetPassword, googleAuth } = require('../controllers/authController');
const protect = require('../middleware/auth');
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/google', googleAuth);
module.exports = router;

router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const { sendContactMessage } = require('../utils/emailService');
    await sendContactMessage(name, email, message);
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
