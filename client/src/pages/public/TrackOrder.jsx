import React, { useState } from 'react';
import { api } from '../../services/api';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const statusSteps = ['pending', 'paid', 'processing', 'out_for_delivery', 'delivered'];
  const statusLabels = {
    pending: 'Order Placed',
    paid: 'Payment Confirmed',
    processing: 'Processing',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered'
  };

  const handleTrack = async () => {
    if (!trackingId) { setError('Enter a tracking ID'); return; }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"}/orders/track/${trackingId}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setOrder(data);
    } catch (err) {
      setError('Order not found. Check your tracking ID.');
    } finally {
      setLoading(false);
    }
  };

  const currentStep = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 mt-10">
      <h1 className="text-4xl font-serif text-[#001F3F] mb-2">Track Order</h1>
      <p className="text-slate-400 text-sm mb-10">Enter your tracking ID to see your order status</p>

      <div className="flex gap-3 mb-10">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
          placeholder="e.g. TRK-20260225-001"
          className="flex-grow px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none"
        />
        <button
          onClick={handleTrack}
          disabled={loading}
          className="bg-[#001F3F] text-white px-6 py-3 uppercase text-xs tracking-widest"
        >
          {loading ? 'Searching...' : 'Track'}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

      {order && (
        <div className="bg-white border border-slate-100 p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Tracking ID</p>
              <p className="font-serif text-[#001F3F] text-lg">{order.trackingId}</p>
            </div>
            <span className="bg-[#D4AF37] text-white text-xs px-3 py-1 uppercase tracking-widest">
              {statusLabels[order.status]}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {statusSteps.map((step, index) => (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div className={`w-4 h-4 rounded-full border-2 ${index <= currentStep ? 'bg-[#001F3F] border-[#001F3F]' : 'bg-white border-slate-300'}`} />
                  <p className="text-[9px] text-slate-400 uppercase tracking-wider mt-1 text-center">{statusLabels[step].split(' ')[0]}</p>
                </div>
              ))}
            </div>
            <div className="h-1 bg-slate-100 rounded mt-2">
              <div className="h-1 bg-[#001F3F] rounded transition-all" style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }} />
            </div>
          </div>

          {/* Delivery Info */}
          {order.status === 'out_for_delivery' && (
            <div className="bg-[#001F3F] text-white p-6 mb-6">
              <p className="text-xs uppercase tracking-widest mb-4 text-[#D4AF37]">Your Delivery Code</p>
              <p className="text-5xl font-serif tracking-widest mb-4">{order.deliveryCode}</p>
              <p className="text-xs text-slate-300">Show this code to the rider at delivery</p>
              {order.deliveryType === 'local_dispatch' && order.rider?.name && (
                <div className="mt-4 pt-4 border-t border-slate-600">
                  <p className="text-xs text-slate-300">Rider: <span className="text-white">{order.rider.name}</span></p>
                  <p className="text-xs text-slate-300">Phone: <span className="text-white">{order.rider.phone}</span></p>
                </div>
              )}
              {order.deliveryType === 'shipping' && order.shipping?.company && (
                <div className="mt-4 pt-4 border-t border-slate-600">
                  <p className="text-xs text-slate-300">Courier: <span className="text-white">{order.shipping.company}</span></p>
                  <p className="text-xs text-slate-300">Tracking: <span className="text-white">{order.shipping.trackingNumber}</span></p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2 text-sm text-slate-600">
            <p><span className="font-bold">Delivery Address:</span> {order.address}</p>
            <p><span className="font-bold">Order Total:</span> ₦{Number(order.total).toLocaleString()}</p>
            <p><span className="font-bold">Order Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
