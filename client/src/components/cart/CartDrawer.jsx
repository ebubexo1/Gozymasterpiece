import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, total, itemCount } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#D4AF37]" />
            <h2 className="text-lg font-serif text-[#001F3F]">Your Cart</h2>
            <span className="text-xs text-slate-400">({itemCount} items)</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-[#001F3F]">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-400 text-sm">Your cart is empty</p>
              <Link to="/shop" onClick={onClose}>
                <Button variant="ghost" className="mt-4">Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-slate-100 pb-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover bg-gray-100"
                  />
                  <div className="flex-grow">
                    <h3 className="text-sm font-serif text-[#001F3F] mb-1">{item.name}</h3>
                    <p className="text-xs text-slate-400 mb-2">₦{item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 border border-slate-300 flex items-center justify-center text-xs hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 border border-slate-300 flex items-center justify-center text-xs hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-slate-200 p-6 space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-[#001F3F]">Total</span>
              <span className="text-[#D4AF37]">₦{total.toLocaleString()}</span>
            </div>
            <Link to="/user/checkout" onClick={onClose}>
              <Button variant="primary" className="w-full">
                Proceed to Checkout
              </Button>
            </Link>
            <Link to="/shop" onClick={onClose}>
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
