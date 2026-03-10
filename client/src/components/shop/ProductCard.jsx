import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigating when clicking Add to Cart
    addToCart(product);
  };

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white cursor-pointer"
      onClick={handleClick}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Quick Add Button - Appears on Hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-[#001F3F] text-white py-3 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <ShoppingBag size={14} />
            Add to Bag
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-serif text-[#001F3F] uppercase tracking-wide">
            {product.name}
          </h3>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
            {product.category}
          </p>
        </div>
        <p className="text-sm font-bold text-[#D4AF37]">
          ₦{product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
