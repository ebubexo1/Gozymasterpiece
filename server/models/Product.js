const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String },
    rating: { type: Number, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  sizes: [{ type: String }],
  colors: [{ type: String }]
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);