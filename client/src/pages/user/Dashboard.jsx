import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  out_for_delivery: 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700'
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const copyTrackingId = (trackingId) => {
    navigator.clipboard.writeText(trackingId);
    setCopied(trackingId);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 mt-10">
      {/* Header */}
      <div className="bg-[#001F3F] text-white p-8 mb-8">
        <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-2">Member Account</p>
        <h1 className="text-3xl font-serif mb-1">Welcome, {user?.name || 'Customer'}</h1>
        <p className="text-slate-300 text-sm">{user?.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border border-slate-100 p-4 text-center">
          <p className="text-2xl font-serif text-[#001F3F]">{orders.length}</p>
          <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Total Orders</p>
        </div>
        <div className="border border-slate-100 p-4 text-center">
          <p className="text-2xl font-serif text-[#001F3F]">{orders.filter(o => o.status === 'delivered').length}</p>
          <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Delivered</p>
        </div>
        <div className="border border-slate-100 p-4 text-center">
          <p className="text-2xl font-serif text-[#001F3F]">{cart.length}</p>
          <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">In Cart</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-100 mb-8">
        {['orders', 'account'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`text-xs uppercase tracking-widest pb-3 font-bold ${activeTab === tab ? 'border-b-2 border-[#001F3F] text-[#001F3F]' : 'text-slate-400'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          {loading ? (
            <p className="text-slate-400 text-center py-10">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 mb-6">You haven't placed any orders yet</p>
              <Link to="/shop" className="bg-[#001F3F] text-white px-8 py-3 uppercase text-xs tracking-widest">Start Shopping</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order._id} className="border border-slate-100 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-serif text-[#001F3F] text-lg">{order.trackingId}</p>
                      <p className="text-xs text-slate-400 mt-1">{new Date(order.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-widest ${statusColors[order.status]}`}>
                        {order.status?.replace(/_/g, ' ')}
                      </span>
                      <p className="font-bold text-[#D4AF37]">₦{Number(order.total).toLocaleString()}</p>
                    </div>
                  </div>
                  {/* Order Items */}
                  <div className="space-y-2 mb-4">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex gap-3 items-center">
                        {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />}
                        <div>
                          <p className="text-sm text-[#001F3F]">{item.name}</p>
                          <p className="text-xs text-slate-400">Qty: {item.quantity} • ₦{Number(item.price).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400">Delivery: {order.address}</p>
                    <button onClick={() => copyTrackingId(order.trackingId)}
                      className="text-xs bg-slate-50 border border-slate-200 px-3 py-1 text-[#001F3F]">
                      {copied === order.trackingId ? '✓ Copied!' : 'Copy Tracking ID'}
                    </button>
                  </div>
                  {order.status === 'out_for_delivery' && order.deliveryCode && (
                    <div className="mt-4 bg-[#001F3F] text-white p-4 text-center">
                      <p className="text-xs text-[#D4AF37] uppercase tracking-widest mb-2">Delivery Code</p>
                      <p className="text-3xl font-serif tracking-widest">{order.deliveryCode}</p>
                      <p className="text-xs text-slate-300 mt-2">Show this to your rider</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Account Tab */}
      {activeTab === 'account' && (
        <div className="space-y-4">
          <div className="border border-slate-100 p-6">
            <h3 className="font-serif text-[#001F3F] mb-4">Account Details</h3>
            <p className="text-sm text-slate-600 mb-2"><span className="font-bold">Name:</span> {user?.name}</p>
            <p className="text-sm text-slate-600 mb-2"><span className="font-bold">Email:</span> {user?.email}</p>
            <p className="text-sm text-slate-600"><span className="font-bold">Member since:</span> {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
          </div>
          <div className="flex gap-4">
            <Link to="/shop" className="flex-1 border border-[#001F3F] text-[#001F3F] py-3 text-xs uppercase tracking-widest text-center">Continue Shopping</Link>
            <button onClick={logout} className="flex-1 bg-red-50 border border-red-200 text-red-600 py-3 text-xs uppercase tracking-widest">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
