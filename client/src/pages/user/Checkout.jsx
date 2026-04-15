import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';


const shippingRates = {
  'Lagos': 0,
  'Ogun': 2500, 'Oyo': 2500, 'Osun': 2500, 'Ondo': 2500, 'Ekiti': 2500,
  'Rivers': 3000, 'Delta': 3000, 'Bayelsa': 3000, 'Edo': 3000, 'Cross River': 3000, 'Akwa Ibom': 3000,
  'Anambra': 4000, 'Enugu': 4000, 'Imo': 4000, 'Abia': 4000, 'Ebonyi': 4000,
};

const getShippingFee = (state) => {
  if (!state) return 0;
  const normalizedState = state.trim().replace(' State', '').replace(' state', '');
  for (const [key, fee] of Object.entries(shippingRates)) {
    if (normalizedState.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedState.toLowerCase())) {
      return fee;
    }
  }
  return 3500; // default
};

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const [deliveryInfo, setDeliveryInfo] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [proof, setProof] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const shippingFee = getShippingFee(deliveryInfo.state);
  const grandTotal = total + shippingFee;

  const handleChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = () => {
    if (!deliveryInfo.name || !deliveryInfo.email || !deliveryInfo.phone || !deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.state) {
      setError('Please fill in all delivery details');
      return false;
    }
    if (deliveryInfo.phone.length < 10) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          items: cart,
          total: grandTotal,
          shippingFee,
          address: `${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.state}`,
          phone: deliveryInfo.phone,
          email: deliveryInfo.email,
          name: deliveryInfo.name,
          status: 'pending',
          paymentMethod: 'bank_transfer'
        })
      });
      const data = await res.json();
      if (res.ok) {
        clearCart();
        setTrackingId(data.trackingId);
        setOrderId(data._id);
        setOrderPlaced(true);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    if (uploaded) {
      return (
        <div className="max-w-lg mx-auto px-4 py-20 mt-20 text-center">
          <div className="text-6xl mb-6">�</div>
          <p className="text-slate-500 mb-6">We have received your proof of payment. Your order will be confirmed shortly.</p>
          <div className="bg-[#001F3F] text-white p-6 mb-6">
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] mb-2">Your Tracking ID</p>
            <p className="text-2xl font-serif text-[#D4AF37] font-bold">{trackingId}</p>
          </div>
          <p className="text-sm text-slate-500 mb-8">Save your tracking ID to track your order at <span className="text-[#D4AF37]">/track</span></p>
          <Link to="/shop" className="bg-[#001F3F] text-white px-8 py-3 uppercase text-xs tracking-widest">Continue Shopping</Link>
        </div>
      );
    }
    return (
      <div className="max-w-lg mx-auto px-4 py-20 mt-20 text-center">
        <div className="text-6xl mb-6">✅</div>
        <p className="text-slate-500 mb-2">Your Tracking ID:</p>
        <p className="text-2xl font-serif text-[#D4AF37] font-bold mb-8">{trackingId}</p>
        <div className="bg-[#001F3F] text-white p-8 mb-6 text-left">
          <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-4">Complete Your Payment</p>
          <p className="mb-2 text-sm">Bank: <strong>United Bank For Africa (UBA)</strong></p>
          <p className="mb-2 text-sm">Account Number: <strong className="text-[#D4AF37] text-xl">6202581943</strong></p>
          <p className="mb-2 text-sm">Account Name: <strong>Gozy Resources</strong></p>
          <p className="mt-4 pt-4 border-t border-slate-600 text-sm">Amount: <strong className="text-[#D4AF37]">₦{grandTotal.toLocaleString()}</strong></p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-6 mb-6 text-left">
          <p className="font-bold text-[#001F3F] mb-2 text-sm">Upload Proof of Payment</p>
          <p className="text-xs text-slate-400 mb-4">Upload screenshot of your transfer receipt to confirm your order</p>
          <input type="file" accept="image/*" onChange={(e) => setProof(e.target.files[0])} className="w-full text-sm mb-4" />
          <button
            onClick={async () => {
              setUploading(true);
              const formData = new FormData();
              formData.append('proof', proof);
              const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
              const token = localStorage.getItem('token');
              await fetch(API_URL + '/orders/' + orderId + '/proof', {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + token },
                body: formData
              });
              setUploading(false);
              setUploaded(true);
            }}
            className="bg-[#001F3F] text-white px-6 py-2 text-xs uppercase tracking-widest w-full"
          >
            {uploading ? 'Uploading...' : 'Upload Receipt'}
          </button>
        </div>
        <p className="text-xs text-slate-400">Or send proof to <a href="mailto:gozymasterpiece@gmail.com" className="text-[#D4AF37]">gozymasterpiece@gmail.com</a></p>
      </div>
    );
  }

if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-serif mb-4">Your bag is empty</h2>
        <Link to="/shop" className="text-[#D4AF37] underline uppercase text-xs tracking-widest">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 mt-20">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-grow">
          <h2 className="text-3xl font-serif text-[#001F3F] mb-8">Checkout</h2>
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-slate-400">Your Details</h3>
            {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4 text-sm">{error}</div>}
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Full Name *</label>
                <input type="text" name="name" value={deliveryInfo.name} onChange={handleChange} placeholder="e.g. John Doe" className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Email Address *</label>
                <input type="email" name="email" value={deliveryInfo.email} onChange={handleChange} placeholder="e.g. john@gmail.com" className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Phone Number *</label>
                <input type="tel" name="phone" value={deliveryInfo.phone} onChange={handleChange} placeholder="e.g. 08012345678" className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Delivery Address *</label>
                <input type="text" name="address" value={deliveryInfo.address} onChange={handleChange} placeholder="House number, Street name" className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">City *</label>
                  <input type="text" name="city" value={deliveryInfo.city} onChange={handleChange} placeholder="e.g. Lagos" className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">State *</label>
                  <select name="state" value={deliveryInfo.state} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none">
                  <option value="">Select State</option>
                  <option value="Lagos">Lagos (Free Delivery)</option>
                  <optgroup label="South West - ₦2,500">
                    <option value="Ogun">Ogun</option>
                    <option value="Oyo">Oyo</option>
                    <option value="Osun">Osun</option>
                    <option value="Ondo">Ondo</option>
                    <option value="Ekiti">Ekiti</option>
                  </optgroup>
                  <optgroup label="South South - ₦3,000">
                    <option value="Rivers">Rivers</option>
                    <option value="Delta">Delta</option>
                    <option value="Bayelsa">Bayelsa</option>
                    <option value="Edo">Edo</option>
                    <option value="Cross River">Cross River</option>
                    <option value="Akwa Ibom">Akwa Ibom</option>
                  </optgroup>
                  <optgroup label="South East - ₦4,000">
                    <option value="Anambra">Anambra</option>
                    <option value="Enugu">Enugu</option>
                    <option value="Imo">Imo</option>
                    <option value="Abia">Abia</option>
                    <option value="Ebonyi">Ebonyi</option>
                  </optgroup>
                </select>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-slate-400">Order Items</h3>
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item._id || item.id} className="flex gap-6 items-center border-b border-slate-100 pb-6">
                <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-slate-50" />
                <div className="flex-grow">
                  <h4 className="font-serif text-[#001F3F]">{item.name}</h4>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-[#001F3F]">₦{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-96">
          <div className="bg-[#f9f9f9] p-8 border border-slate-100 sticky top-24">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-slate-400">Order Summary</h3>
            <div className="space-y-4 text-sm mb-8">
              <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>₦{total.toLocaleString()}</span></div>
              <div className="flex justify-between text-slate-600"><span>Shipping</span><span className={shippingFee === 0 ? 'text-green-600 font-bold uppercase text-[10px]' : 'font-bold text-[#001F3F]'}>{shippingFee === 0 ? 'FREE' : '₦' + shippingFee.toLocaleString()}</span></div>
              <div className="flex justify-between text-xl font-serif text-[#001F3F] pt-4 border-t border-slate-200"><span>Total</span><span>₦{grandTotal.toLocaleString()}</span></div>
            </div>
            <div className="bg-[#001F3F] text-white p-4 mb-6">
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-3">Payment via Bank Transfer</p>
              <p className="text-sm">Bank: <strong>UBA</strong></p>
              <p className="text-sm">Account: <strong className="text-[#D4AF37]">6202581943</strong></p>
              <p className="text-sm">Name: <strong>Gozy Resources</strong></p>
            </div>
            <Button variant="primary" className="w-full py-4" onClick={handlePlaceOrder}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </Button>
            <p className="text-[10px] text-center mt-6 text-slate-400 uppercase tracking-widest">Transfer payment after placing order</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
