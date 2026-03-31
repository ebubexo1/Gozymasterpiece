import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 mt-10">
      <h1 className="text-4xl font-serif text-[#001F3F] mb-2">My Wishlist</h1>
      <p className="text-slate-400 text-sm mb-10">{wishlist.length} saved items</p>
      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400 mb-6">Your wishlist is empty</p>
          <Link to="/shop" className="bg-[#001F3F] text-white px-8 py-3 uppercase text-xs tracking-widest">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(product => (
            <div key={product._id} className="border border-slate-100 p-4">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest mb-1">{product.category}</p>
              <h3 className="font-serif text-[#001F3F] mb-2">{product.name}</h3>
              <p className="text-slate-600 mb-4">₦{Number(product.price).toLocaleString()}</p>
              <div className="flex gap-2">
                <button onClick={() => { addToCart(product); removeFromWishlist(product._id); }} className="flex-1 bg-[#001F3F] text-white py-2 text-xs uppercase tracking-widest">Add to Cart</button>
                <button onClick={() => removeFromWishlist(product._id)} className="border border-red-300 text-red-400 px-3 py-2 text-xs">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
