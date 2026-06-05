import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const ConfirmDelivery = () => {
  const { trackingId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${API_URL}/orders/track/${trackingId}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setOrder(data);
      } catch (err) {
        setError('Order not found');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [trackingId]);

  const handleConfirm = async () => {
    setError('');
    if (!code.trim()) { setError('Enter the delivery code the customer gave you'); return; }
    setConfirming(true);
    try {
      const response = await fetch(`${API_URL}/orders/${order._id}/confirm-delivery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not confirm');
      setConfirmed(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setConfirming(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-slate-400">Loading order...</p>
    </div>
  );

  if (error && !order) return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-red-500">{error}</p>
    </div>
  );

  if (confirmed) return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl font-serif text-[#001F3F] mb-2">Delivery Confirmed!</h1>
        <p className="text-slate-400">Order {order.trackingId} has been marked as delivered.</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <h1 className="text-3xl font-serif text-[#001F3F] mb-2">Confirm Delivery</h1>
      <p className="text-slate-400 text-sm mb-8">Confirm that you have delivered this order</p>

      <div className="bg-white border border-slate-200 p-6 mb-6">
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-4">Order Details</p>
        <p className="font-serif text-[#001F3F] text-xl mb-4">{order.trackingId}</p>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-bold">Customer:</span> {order.user?.name}</p>
          <p><span className="font-bold">Address:</span> {order.address}</p>
          <p><span className="font-bold">Phone:</span> {order.phone}</p>
          <p><span className="font-bold">Total:</span> ₦{Number(order.total).toLocaleString()}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 mb-2">Items:</p>
          {order.items?.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-600 mb-1">
              <img src={item.image} alt={item.name} className="w-8 h-8 object-cover" />
              {item.name} x{item.quantity}
            </div>
          ))}
        </div>
      </div>

      {order.status === 'delivered' ? (
        <div className="bg-green-50 text-green-800 p-4 text-center text-sm">
          This order has already been delivered ✅
        </div>
      ) : (
        <div>
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Delivery Code</label>
          <input
            type="text"
            inputMode="numeric"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(''); }}
            placeholder="4-digit code from the customer"
            className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none mb-2 mt-2 text-center text-2xl tracking-widest"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleConfirm}
            disabled={confirming}
            className="w-full bg-[#001F3F] text-white py-4 uppercase text-xs tracking-widest font-bold"
          >
            {confirming ? 'Confirming...' : 'I Delivered This Order ✓'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ConfirmDelivery;