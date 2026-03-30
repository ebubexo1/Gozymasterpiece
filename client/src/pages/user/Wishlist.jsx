import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 mt-20 text-center">
        <Heart size={48} className="mx-auto text-slate-300 mb-4" />
        <h2 className="text-2xl font-serif text-[#001F3F] mb-4">Your Wishlist is Empty</h2>
        <p className="text-slate-400 mb-8">Save items you love to buy later</p>
        <Link to="/shop" className="bg-[#001F3F] text-white px-8 py-3 uppercase text-xs tracking-widest">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 mt-20">
      <h1 className="text-3xl font-serif text-[#001F3F] mb-8">My Wishlist ({wishlist.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map(product => (
          <div key={product._id} className="border border-slate-100 p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
            <h3 className="font-serif text-[#001F3F] text-sm mb-1">{product.name}</h3>
            <p className="text-[#D4AF37] font-bold mb-4">₦{Number(product.price).toLocaleString()}</p>
            <div className="flex gap-2">
              <button onClick={() => { addToCart(product); removeFromWishlist(product._id); }} className="flex-1 bg-[#001F3F] text-white py-2 text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                <ShoppingBag size={14} /> Add to Cart
              </button>
              <button onClick={() => removeFromWishlist(product._id)} className="p-2 border border-slate-200 text-red-400 hover:bg-red-50">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
