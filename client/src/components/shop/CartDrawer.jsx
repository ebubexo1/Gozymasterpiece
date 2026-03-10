import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = () => {
  const { cart, isDrawerOpen, setDrawerOpen, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
          />
          
          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-serif text-[#001F3F]">Shopping Bag ({cart.length})</h2>
              <X className="cursor-pointer text-slate-400 hover:text-black" onClick={() => setDrawerOpen(false)} />
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <p className="uppercase tracking-[0.2em] text-xs">Your bag is empty</p>
                  <button 
                    onClick={() => setDrawerOpen(false)}
                    className="mt-4 text-[#D4AF37] font-bold text-xs uppercase underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-4 group">
                    <img src={item.image} className="w-20 h-24 object-cover bg-gray-50" alt={item.name} />
                    <div className="flex-grow">
                      <h4 className="text-xs uppercase font-bold tracking-widest text-[#001F3F]">{item.name}</h4>
                      <p className="text-[#D4AF37] font-bold mt-1 text-sm">₦{item.price.toLocaleString()}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-slate-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs uppercase tracking-[0.3em] font-bold text-slate-400">Subtotal</span>
                  <span className="text-xl font-bold text-[#001F3F]">₦{totalPrice.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => { setDrawerOpen(false); navigate('/checkout'); }}
                  className="w-full bg-[#001F3F] text-white py-4 flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.3em] font-bold hover:bg-[#D4AF37] transition-colors"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;