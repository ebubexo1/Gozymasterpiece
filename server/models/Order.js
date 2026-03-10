const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ product: String, name: String, price: Number, quantity: Number, image: String }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'processing', 'out_for_delivery', 'delivered', 'cancelled'], default: 'pending' },
  trackingId: { type: String },
  deliveryType: { type: String, enum: ['local_dispatch', 'shipping'], default: 'local_dispatch' },
  deliveryCode: { type: String },
  rider: { name: { type: String }, phone: { type: String } },
  shipping: { company: { type: String }, trackingNumber: { type: String } },
  reference: { type: String, required: true },
  paymentMethod: { type: String },
  address: { type: String },
  phone: { type: String }
}, { timestamps: true });
orderSchema.pre('save', async function() {
  const noTracking = this.trackingId == null;
  if (this.isNew && noTracking) {
    const date = new Date();
    const dateStr = date.getFullYear().toString() + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0');
    const count = await mongoose.model('Order').countDocuments();
    this.trackingId = 'TRK-' + dateStr + '-' + String(count + 1).padStart(3, '0');
  }
  const noCode = this.deliveryCode == null;
  if (this.status === 'out_for_delivery' && noCode) {
    this.deliveryCode = String(Math.floor(1000 + Math.random() * 9000));
  }
});
module.exports = mongoose.model('Order', orderSchema);
