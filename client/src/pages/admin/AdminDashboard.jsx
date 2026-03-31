import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Button from '../../components/common/Button';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const copyToClipboard = (text) => {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert('Copied: ' + text);
};

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFilter, setOrderFilter] = useState('active');
  const [orderUpdate, setOrderUpdate] = useState({ status: '', deliveryType: 'local_dispatch', riderName: '', riderPhone: '', shippingCompany: '', shippingTracking: '' });
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', description: '', stock: '', image: '', sizes: '', colors: '' });

  useEffect(() => { fetchProducts(); fetchOrders(); fetchAnalytics(); }, []);

  useEffect(() => {
    const interval = setInterval(() => { fetchOrders(); }, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try { const data = await api.getProducts(); setProducts(data); }
    catch (error) { console.error('Error fetching products:', error); }
    finally { setLoading(false); }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/analytics/stats`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      setAnalytics(data);
    } catch (error) { console.error('Analytics error:', error); }
  };

  const fetchOrders = async () => {
    try { const data = await api.getAllOrders(); setOrders(data); }
    catch (error) { console.error('Error fetching orders:', error); }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/upload`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: formData });
    const data = await response.json();
    return data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let imageUrl = newProduct.image;
      if (imageFile) imageUrl = await uploadImage(imageFile);
      const productData = { ...newProduct, image: imageUrl, price: Number(newProduct.price), stock: Number(newProduct.stock), sizes: newProduct.sizes ? newProduct.sizes.split(",").map(s => s.trim()).filter(Boolean) : [], colors: newProduct.colors ? newProduct.colors.split(",").map(c => c.trim()).filter(Boolean) : [] };
      if (editingProduct) { await api.updateProduct(editingProduct._id, productData); alert('Product updated!'); }
      else { await api.createProduct(productData); alert('Product added!'); }
      setNewProduct({ name: '', price: '', category: '', description: '', stock: '', image: '' });
      setImageFile(null); setImagePreview(''); setEditingProduct(null); setShowForm(false);
      fetchProducts();
    } catch (error) { alert('Error: ' + error.message); }
    finally { setSubmitting(false); }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({ name: product.name, price: product.price, category: product.category, description: product.description, stock: product.stock, image: product.image, sizes: product.sizes ? product.sizes.join(", ") : "", colors: product.colors ? product.colors.join(", ") : "" });
    setImagePreview(product.image);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try { await api.deleteProduct(id); fetchProducts(); }
    catch (error) { alert('Error deleting product'); }
  };

  const handleOrderUpdate = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(orderUpdate)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      alert('Order updated!');
      setSelectedOrder(null);
      fetchOrders();
    } catch (error) { alert('Error: ' + error.message); }
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-blue-100 text-blue-800',
    processing: 'bg-purple-100 text-purple-800',
    out_for_delivery: 'bg-orange-100 text-orange-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-serif text-[#001F3F] mb-8">Admin Dashboard</h1>
      <div className="flex gap-4 mb-8 border-b border-slate-200">
        {['products', 'orders', 'analytics'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`pb-3 px-2 text-xs uppercase tracking-widest font-bold ${activeTab === tab ? 'border-b-2 border-[#001F3F] text-[#001F3F]' : 'text-slate-400'}`}>
            {tab} {tab === 'orders' && `(${orders.length})`}
          </button>
        ))}
      </div>

      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif text-[#001F3F]">Products ({products.length})</h2>
            <Button variant="primary" onClick={() => { setShowForm(!showForm); setEditingProduct(null); setNewProduct({ name: '', price: '', category: '', description: '', stock: '', image: '' }); setImagePreview(''); }}>
              {showForm ? 'Cancel' : '+ Add Product'}
            </Button>
          </div>
          {showForm && (
            <div className="bg-white p-8 rounded-lg shadow-md mb-12 border border-slate-100">
              <h2 className="text-2xl font-serif text-[#001F3F] mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Product Name</label>
                    <input className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} required />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Price (N)</label>
                    <input type="number" className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} required />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Category</label>
                    <select className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none" value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} required>
                      <option value="">Select Category</option>
                      <option value="Wrist Watches">Wrist Watches</option>
                      <option value="Sunshades">Sunshades</option>
                      <option value="Waist Belt">Waist Belt</option>
                      <option value="Wrist Bangles">Wrist Bangles</option>
                      <option value="Cufflinks Pen">Cufflinks Pen</option>
                      <option value="Traveling Luggage">Traveling Luggage</option>
                      <option value="Duffel Traveling Bag">Duffel Traveling Bag</option>
                      <option value="Bag Pack">Bag Pack</option>
                      <option value="Laptop Bag">Laptop Bag</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Stock</label>
                    <input type="number" className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} required />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Description</label>
                  <textarea rows="3" className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} required />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Sizes (comma separated e.g. S, M, L, XL)</label>
                  <input type="text" className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none" value={newProduct.sizes} onChange={(e) => setNewProduct({...newProduct, sizes: e.target.value})} placeholder="e.g. S, M, L, XL or leave empty" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Colors (comma separated e.g. Red, Blue, Black)</label>
                  <input type="text" className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none" value={newProduct.colors} onChange={(e) => setNewProduct({...newProduct, colors: e.target.value})} placeholder="e.g. Red, Blue, Black or leave empty" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Product Image</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-3 border border-slate-200 outline-none" />
                  {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover mt-2 border" />}
                </div>
                <Button type="submit" variant="primary" disabled={submitting}>{submitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}</Button>
              </form>
            </div>
          )}
          {loading ? <p className="text-slate-400">Loading...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="border border-slate-200 p-4">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 bg-slate-50" />
                  <h3 className="font-serif text-[#001F3F] mb-2">{product.name}</h3>
                  <p className="text-[#D4AF37] font-bold">N{Number(product.price).toLocaleString()}</p>
                  <p className="text-xs text-slate-400 mt-1">{product.category} - Stock: {product.stock}</p>
                  <div className="mt-4 space-x-2">
                    <Button variant="outline" className="text-xs" onClick={() => handleEdit(product)}>Edit</Button>
                    <Button variant="ghost" className="text-xs text-red-500" onClick={() => handleDelete(product._id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <h2 className="text-2xl font-serif text-[#001F3F] mb-6">All Orders ({orders.length})</h2>
          <div className="flex gap-3 mb-6">
            {[{key:'active',label:'Active'},{key:'completed',label:'Completed'},{key:'cancelled',label:'Cancelled'}].map(f => (
              <button key={f.key} onClick={() => setOrderFilter(f.key)}
                className={`text-xs px-4 py-2 uppercase tracking-widest ${orderFilter === f.key ? 'bg-[#001F3F] text-white' : 'border border-slate-300 text-slate-600'}`}>{f.label}</button>
            ))}
          </div>
          {orders.length === 0 ? <p className="text-slate-400">No orders yet.</p> : (
            <div className="space-y-4">
              {orders.filter(order => {
                if (orderFilter === 'active') return ['pending','paid','processing','out_for_delivery'].includes(order.status);
                if (orderFilter === 'completed') return order.status === 'delivered';
                if (orderFilter === 'cancelled') return order.status === 'cancelled';
                return true;
              }).map((order) => (
                <div key={order._id} className="border border-slate-200 p-6">
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                      <p className="font-serif text-[#001F3F] text-lg">{order.trackingId}</p>
                      <p className="text-xs text-slate-400 mt-1">{order.user?.name} - {order.user?.email}</p>
                      <p className="text-xs text-slate-400">{order.address}</p>
                      <p className="text-xs text-slate-400">Phone: {order.phone}</p>
                      <p className="text-sm font-bold text-[#D4AF37] mt-2">N{Number(order.total).toLocaleString()}</p>
                      <p className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-widest ${statusColors[order.status]}`}>
                        {order.status?.replace('_', ' ')}
                      </span>
                      {order.trackingId && (
                        <button onClick={() => copyToClipboard(window.location.origin + '/confirm-delivery/' + order.trackingId)}
                          className="text-xs text-blue-500 underline">
                          Copy Rider Link
                        </button>
                      )}
                      <button onClick={() => { setSelectedOrder(order); setOrderUpdate({ status: order.status, deliveryType: order.deliveryType || 'local_dispatch', riderName: order.rider?.name || '', riderPhone: order.rider?.phone || '', shippingCompany: order.shipping?.company || '', shippingTracking: order.shipping?.trackingNumber || '' }); }}
                        className="text-xs bg-[#001F3F] text-white px-3 py-1 uppercase tracking-widest">
                        Update
                      </button>
                    </div>
                  </div>
                  <div className="mt-3">
                    {order.proofOfPayment ? (
                      <a href={order.proofOfPayment} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded">
                        ✅ View Proof of Payment
                      </a>
                    ) : order.paymentMethod === 'bank_transfer' ? (
                      <span className="text-xs text-orange-500 bg-orange-50 border border-orange-200 px-3 py-1 rounded">⏳ Awaiting Proof of Payment</span>
                    ) : null}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex gap-3 flex-wrap">
                      {order.items?.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <img src={item.image} alt={item.name} className="w-8 h-8 object-cover" />
                          {item.name} x{item.quantity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      
      {activeTab === 'analytics' && (
        <div>
          <h2 className="text-2xl font-serif text-[#001F3F] mb-8">Website Analytics</h2>
          {!analytics ? <p className="text-slate-400">Loading analytics...</p> : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#001F3F] text-white p-6">
                  <p className="text-xs uppercase tracking-widest text-[#D4AF37] mb-2">Today</p>
                  <p className="text-4xl font-serif">{analytics.todayVisits}</p>
                  <p className="text-xs text-slate-300 mt-1">visitors today</p>
                </div>
                <div className="bg-white border border-slate-200 p-6">
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">This Month</p>
                  <p className="text-4xl font-serif text-[#001F3F]">{analytics.monthVisits}</p>
                  <p className="text-xs text-slate-400 mt-1">visitors this month</p>
                </div>
                <div className="bg-white border border-slate-200 p-6">
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">All Time</p>
                  <p className="text-4xl font-serif text-[#001F3F]">{analytics.totalVisits}</p>
                  <p className="text-xs text-slate-400 mt-1">total visitors</p>
                </div>
              </div>
              <div className="bg-white border border-slate-200 p-6">
                <h3 className="font-serif text-[#001F3F] mb-4">Top Pages</h3>
                <div className="space-y-3">
                  {analytics.topPages?.map((page, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">{page._id}</span>
                      <span className="text-sm font-bold text-[#001F3F]">{page.count} visits</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-slate-200 p-6">
                <h3 className="font-serif text-[#001F3F] mb-4">Last 7 Days</h3>
                <div className="space-y-2">
                  {analytics.dailyVisits?.map((day, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">{day._id}</span>
                      <div className="flex items-center gap-2">
                        <div className="bg-[#D4AF37] h-2 rounded" style={{width: `${day.count * 10}px`, minWidth: '4px'}}></div>
                        <span className="text-sm font-bold text-[#001F3F]">{day.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 max-w-md w-full">
            <h3 className="text-xl font-serif text-[#001F3F] mb-6">Update Order {selectedOrder.trackingId}</h3>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Status</label>
                <select className="w-full px-4 py-3 border border-slate-200 outline-none" value={orderUpdate.status} onChange={(e) => setOrderUpdate({...orderUpdate, status: e.target.value})}>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="processing">Processing</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Delivery Type</label>
                <select className="w-full px-4 py-3 border border-slate-200 outline-none" value={orderUpdate.deliveryType} onChange={(e) => setOrderUpdate({...orderUpdate, deliveryType: e.target.value})}>
                  <option value="local_dispatch">Local Dispatch (Rider)</option>
                  <option value="shipping">Shipping (DHL/GIG etc)</option>
                </select>
              </div>
              {orderUpdate.deliveryType === 'local_dispatch' && (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Rider Name</label>
                    <input className="w-full px-4 py-3 border border-slate-200 outline-none" value={orderUpdate.riderName} onChange={(e) => setOrderUpdate({...orderUpdate, riderName: e.target.value})} placeholder="e.g. Emeka" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Rider Phone</label>
                    <input className="w-full px-4 py-3 border border-slate-200 outline-none" value={orderUpdate.riderPhone} onChange={(e) => setOrderUpdate({...orderUpdate, riderPhone: e.target.value})} placeholder="e.g. 08012345678" />
                  </div>
                  <div className="bg-blue-50 p-4 text-xs text-blue-800">
                    <p className="font-bold mb-2">Rider Confirmation Link:</p>
                    <p className="break-all mb-2">{window.location.origin}/confirm-delivery/{selectedOrder.trackingId}</p>
                    <button onClick={() => copyToClipboard(window.location.origin + '/confirm-delivery/' + selectedOrder.trackingId)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs">
                      Copy Link
                    </button>
                  </div>
                </div>
              )}
              {orderUpdate.deliveryType === 'shipping' && (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Shipping Company</label>
                    <select className="w-full px-4 py-3 border border-slate-200 outline-none" value={orderUpdate.shippingCompany} onChange={(e) => setOrderUpdate({...orderUpdate, shippingCompany: e.target.value})}>
                      <option value="">Select Company</option>
                      <option value="DHL">DHL</option>
                      <option value="GIG Logistics">GIG Logistics</option>
                      <option value="RedStar">RedStar Express</option>
                      <option value="Aramex">Aramex</option>
                      <option value="FedEx">FedEx</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Tracking Number</label>
                    <input className="w-full px-4 py-3 border border-slate-200 outline-none" value={orderUpdate.shippingTracking} onChange={(e) => setOrderUpdate({...orderUpdate, shippingTracking: e.target.value})} placeholder="e.g. 1234567890" />
                  </div>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <Button variant="primary" onClick={() => handleOrderUpdate(selectedOrder._id)}>Save Changes</Button>
                <Button variant="outline" onClick={() => setSelectedOrder(null)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;







