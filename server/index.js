if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'https://gozymasterpiece.vercel.app'], credentials: true }));
app.use((req, res, next) => { if (req.originalUrl === "/api/payments/webhook") { let data = ""; req.on("data", chunk => { data += chunk; }); req.on("end", () => { req.rawBody = data; req.body = JSON.parse(data); next(); }); } else { express.json()(req, res, next); } });
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/payments', require('./routes/payment'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/analytics', require('./routes/analytics'));

app.get('/', (req, res) => res.json({ message: 'Server is running!' }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch(err => console.error('MongoDB error:', err));
