import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import usePaystack from '../../hooks/usePaystack';
import Button from '../../components/common/Button';

const Checkout = () => {
  const { cart, total } = useCart();
  const { user } = useAuth();
  const [deliveryInfo, setDeliveryInfo] = useState({ phone: '', address: '', city: '', state: '' });
  const [error, setError] = useState('');
  const { startPayment } = usePaystack(user?.email, deliveryInfo);

  const handleChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
    setError('');
  };

  const handleCheckout = () => {
    if (!deliveryInfo.phone || !deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.state) {
      setError('Please fill in all delivery details');
      return;
    }
    if (deliveryInfo.phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    startPayment();
  };

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
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-slate-400">Delivery Details</h3>
            {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4 text-sm">{error}</div>}
            <div className="space-y-4">
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
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-slate-400">Payment Summary</h3>
            <div className="space-y-4 text-sm mb-8">
              <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>₦{total.toLocaleString()}</span></div>
              <div className="flex justify-between text-slate-600"><span>Shipping</span><span className="text-green-600 font-bold uppercase text-[10px]">Free</span></div>
              <div className="flex justify-between text-xl font-serif text-[#001F3F] pt-4 border-t border-slate-200"><span>Total</span><span>₦{total.toLocaleString()}</span></div>
            </div>
            <Button variant="primary" className="w-full py-4" onClick={handleCheckout}>Pay with Paystack</Button>
            <p className="text-[10px] text-center mt-6 text-slate-400 uppercase tracking-widest">Secure Transaction • 256-bit Encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
