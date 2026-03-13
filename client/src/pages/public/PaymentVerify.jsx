import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useCart } from '../../context/CartContext';

const PaymentVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [processed, setProcessed] = useState(false);
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);
  const { clearCart } = useCart();

  useEffect(() => {
    const verify = async () => {
      if (processed) return;
      setProcessed(true);
      const reference = searchParams.get('reference');
      if (!reference) { navigate('/'); return; }
      try {
        const verification = await api.verifyPayment(reference);
        if (verification.status === 'success') {
          const pending = JSON.parse(localStorage.getItem('pendingOrder') || '{}');
          const createdOrder = await api.createOrder({
            reference,
            total: pending.total,
            items: pending.items,
            status: 'paid',
            paymentMethod: 'card',
            phone: pending.phone,
            address: pending.address
          });
          localStorage.removeItem('pendingOrder');
          clearCart();
          setOrder(createdOrder);
          setStatus('success');
        } else {
          setStatus('failed');
        }
      } catch (error) {
        setStatus('error');
      }
    };
    verify();
  }, []);

  const copyTrackingId = () => {
    navigator.clipboard.writeText(order.trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === 'verifying') return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <p className="text-[#001F3F] font-serif text-xl">Verifying payment...</p>
        <p className="text-slate-400 text-sm mt-2">Please wait, do not close this page</p>
      </div>
    </div>
  );

  if (status === 'failed' || status === 'error') return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">‚ùå</div>
        <h2 className="text-2xl font-serif text-[#001F3F] mb-2">Payment Failed</h2>
        <p className="text-slate-400 mb-6">Please contact support</p>
        <Link to="/shop" className="bg-[#001F3F] text-white px-6 py-3 uppercase text-xs tracking-widest">Back to Shop</Link>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">Ìæâ</div>
        <h1 className="text-3xl font-serif text-[#001F3F] mb-2">Order Confirmed!</h1>
        <p className="text-slate-400 mb-8">Thank you for your purchase</p>
        <div className="bg-[#001F3F] text-white p-8 mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-3">Your Tracking ID</p>
          <p className="text-3xl font-serif tracking-wider mb-4">{order?.trackingId}</p>
          <button
            onClick={copyTrackingId}
            className="bg-[#D4AF37] text-[#001F3F] px-6 py-2 text-xs uppercase tracking-widest font-bold"
          >
            {copied ? '‚úì Copied!' : 'Copy Tracking ID'}
          </button>
        </div>
        <div className="bg-slate-50 p-4 mb-6 text-left text-sm text-slate-600">
          <p className="font-bold text-[#001F3F] mb-2">Order Summary</p>
          <p>Total: ‚Ç¶{Number(order?.total).toLocaleString()}</p>
          <p>Delivery: {order?.address}</p>
          <p>Phone: {order?.phone}</p>
        </div>
        <p className="text-xs text-slate-400 mb-6">Save your tracking ID to track your order at <span className="text-[#D4AF37]">/track</span></p>
        <div className="flex gap-3 justify-center">
          <Link to="/shop" className="border border-[#001F3F] text-[#001F3F] px-6 py-3 text-xs uppercase tracking-widest">Continue Shopping</Link>
          <Link to="/user/dashboard" className="bg-[#001F3F] text-white px-6 py-3 text-xs uppercase tracking-widest">My Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentVerify;
