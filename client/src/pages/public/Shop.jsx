import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Wrist Watches', 'Sunshades', 'Waist Belt', 'Wrist Bangles', 'Cufflinks Pen', 'Traveling Luggage', 'Duffel Traveling Bag', 'Bag Pack', 'Laptop Bag'];

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => { setProducts(data); setFiltered(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (category === 'All') { setFiltered(products); }
    else { setFiltered(products.filter(p => p.category === category)); }
  }, [category, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 mt-10">
      <h1 className="text-4xl font-serif text-[#001F3F] mb-8">Shop</h1>

      {/* Categories - horizontal scroll on mobile, vertical sidebar on desktop */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-40 md:shrink-0">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Categories</p>
          {/* Mobile: horizontal scrollable row */}
          <div className="flex md:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`whitespace-nowrap text-xs py-2 px-3 uppercase tracking-widest border rounded-full ${category === cat ? 'bg-[#001F3F] text-white border-[#001F3F]' : 'text-slate-600 border-slate-300'}`}>
                {cat}
              </button>
            ))}
          </div>
          {/* Desktop: vertical list */}
          <div className="hidden md:flex md:flex-col space-y-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`block w-full text-left text-sm py-2 px-3 uppercase tracking-widest ${category === cat ? 'bg-[#001F3F] text-white' : 'text-slate-600 hover:text-[#001F3F]'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {loading ? (
            <p className="text-slate-400">Loading products...</p>
          ) : filtered.length === 0 ? (
            <p className="text-slate-400">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map(product => (
                <Link key={product._id} to={`/product/${product._id}`} className="group">
                  <div className="overflow-hidden bg-slate-50 mb-3">
                    <img src={product.image} alt={product.name}
                      className="w-full h-44 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">{product.category}</p>
                  <h3 className="font-serif text-[#001F3F] mb-1 text-sm md:text-base">{product.name}</h3>
                  <p className="text-[#D4AF37] font-bold text-sm md:text-base">₦{Number(product.price).toLocaleString()}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
