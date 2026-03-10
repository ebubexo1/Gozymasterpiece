import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

const Dashboard = () => {
  const { user } = useAuth();
  const { cart } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="bg-white border border-slate-100 p-10 text-center shadow-sm">
        <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-2">Member Account</p>
        <h1 className="text-4xl font-serif text-[#001F3F] mb-6">Welcome, {user?.name || 'Customer'}</h1>
        
        <div className="h-px bg-slate-100 w-20 mx-auto mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-[#001F3F]">Current Session</h3>
            <p className="text-sm text-slate-500">You have {cart.length} items in your bag ready for purchase.</p>
            <Link to="/user/checkout">
              <Button variant="primary" className="w-full">Proceed to Checkout</Button>
            </Link>
          </div>

          <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-100 pt-8 md:pt-0 md:pl-8">
            <h3 className="font-serif text-xl text-[#001F3F]">Continue Shopping</h3>
            <p className="text-sm text-slate-500">Explore our latest arrivals in Apparel and Accessories.</p>
            <Link to="/shop">
              <Button variant="outline" className="w-full">Back to Store</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;