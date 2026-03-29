import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';

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
          total,
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
    return (
      <div className="max-w-lg mx-auto px-4 py-20 mt-20 text-center">
        <div className="text-6xl mb-6">���</div>
        <h1 className="text-3xl font-serif text-[#001F3F] mb-4">Order Placed!</h1>
        <p className="text-slate-500 mb-2">Your Tracking ID:</p>
        <p className="text-2xl font-serif text-[#D4AF37] font-bold mb-8">{trackingId}</p>
        <div className="bg-[#001F3F] text-white p-8 mb-6 text-left">
          <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-4">Complete Your Payment</p>
          <p className="mb-2 text-sm">Bank: <strong>United Bank For Africa (UBA)</strong></p>
          <p className="mb-2 text-sm">Account Number: <strong className="text-[#D4AF37] text-xl">1029768625</strong></p>
          <p className="mb-2 text-sm">Account Name: <strong>GOZY MASTERPIECE LIMITED</strong></p>
          <p className="mt-4 pt-4 border-t border-slate-600 text-sm">Amount: <strong className="text-[#D4AF37]">₦{total.toLocaleString()}</strong></p>
        </div>
        <div className="bg-slate-50 p-4 mb-6 text-sm text-slate-600 text-left">
          <p className="font-bold text-[#001F3F] mb-2">After Payment:</p>
          <p>Send your proof of payment and tracking ID to:</p>
          <p className="mt-2">��� <a href="mailto:gozymasterpiece@gmail.com" className="text-[#D4AF37]">gozymasterpiece@gmail.com</a></p>
          <p>��� <a href="tel:+2348167823409" className="text-[#D4AF37]">08167823409</a> / <a href="tel:+2347063718709" className="text-[#D4AF37]">07063718709</a></p>
        </div>
        <div className="mb-6">
          <div className="bg-slate-50 border border-slate-200 p-6 text-left">
            <p className="font-bold text-[#001F3F] mb-2 text-sm">Upload Proof of Payment</p>
            <p className="text-xs text-slate-400 mb-4">Upload screenshot of your transfer receipt</p>
            <input type="file" accept="image/*" onChange={(e) => setProof(e.target.files[0])} className="w-full text-sm mb-4" />
            <button
              onClick={async () => {
                setUploading(true);
                const formData = new FormData();
                formData.append('proof', proof);
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const token = localStorage.getItem('token');
                await fetch(`${API_URL}/orders/${orderId}/proof`, {
                  method: 'POST',
                  headers: { Authorization: `Bearer ${token}` },
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
        ) : (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm">
            ✅ Proof of payment uploaded successfully!
          </div>
        )}
      </div>
      <Link to="/shop" className="bg-[#001F3F] text-white px-8 py-3 uppercase text-xs tracking-widest">Continue Shopping</Link>
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
                  <input type="text" name="state" value={deliveryInfo.state} onChange={handleChange} placeholder="e.g. Lagos State" className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none" />
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
              <div className="flex justify-between text-slate-600"><span>Shipping</span><span className="text-green-600 font-bold uppercase text-[10px]">Free</span></div>
              <div className="flex justify-between text-xl font-serif text-[#001F3F] pt-4 border-t border-slate-200"><span>Total</span><span>₦{total.toLocaleString()}</span></div>
            </div>
            <div className="bg-[#001F3F] text-white p-4 mb-6">
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-3">Payment via Bank Transfer</p>
              <p className="text-sm">Bank: <strong>UBA</strong></p>
              <p className="text-sm">Account: <strong className="text-[#D4AF37]">1029768625</strong></p>
              <p className="text-sm">Name: <strong>GOZY MASTERPIECE LIMITED</strong></p>
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
