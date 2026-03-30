const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const protect = require('../middleware/auth');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;

router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const Product = require('../models/Product');
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user.id.toString());
    if (alreadyReviewed) return res.status(400).json({ message: 'You already reviewed this product' });
    const review = { user: req.user.id, name: req.user.name, rating: Number(rating), comment };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({ message: 'Review added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
