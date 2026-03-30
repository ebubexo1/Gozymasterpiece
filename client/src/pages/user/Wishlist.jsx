import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Trash2 } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 mt-20 text-center">
        <div className="text-6xl mb-4">♡</div>
        <h2 className="text-2xl font-serif text-[#001F3F] mb-4">Your Wishlist is Empty</h2>
        <p className="text-slate-400 mb-8">Save items you love to your wishlist</p>
        <Link to="/shop" className="bg-[#001F3F] text-white px-8 py-3 uppercase text-xs tracking-widest">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 mt-10">
      <h1 className="text-3xl font-serif text-[#001F3F] mb-2">My Wishlist</h1>
      <p className="text-slate-400 text-sm mb-10">{wishlist.length} saved items</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product._id} className="bg-white border border-slate-100 group">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <button onClick={() => removeFromWishlist(product._id)} className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md text-red-400 hover:text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-serif text-[#001F3F] mb-1">{product.name}</h3>
              <p className="text-xs text-slate-400 mb-3">{product.category}</p>
              <p className="text-sm font-bold text-[#D4AF37] mb-4">₦{Number(product.price).toLocaleString()}</p>
              <button
                onClick={() => { addToCart(product); removeFromWishlist(product._id); }}
                className="w-full bg-[#001F3F] text-white py-2 text-xs uppercase tracking-widest"
              >
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
