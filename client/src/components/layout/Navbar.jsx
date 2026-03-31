import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import SearchBar from '../shop/SearchBar';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart, setDrawerOpen } = useCart();
  const { wishlist } = useWishlist();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-[#001F3F]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo - UPDATED */}
            <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-[#001F3F]">
              GOZY<span className="text-[#D4AF37]">RESOURCES</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 items-center">
              {['Home', 'Shop', 'About', 'Contact', 'Track'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : item === 'Track' ? '/track' : `/${item.toLowerCase()}`}
                  className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#001F3F] hover:text-[#D4AF37] transition-colors"
                >
                  {item}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#D4AF37] hover:text-[#001F3F] transition-colors"
                >
                  Admin
                </Link>
              )}
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-[#001F3F] hover:text-[#D4AF37] transition-colors hidden sm:block"
              >
                <Search size={20} />
              </button>
              <Link 
                to={user ? "/user/dashboard" : "/login"} 
                className="text-[#001F3F] hover:text-[#D4AF37]"
              >
                <User size={20} />
              </Link>
              <button
                onClick={() => setDrawerOpen(true)}
                className="relative p-2 text-[#001F3F] hover:text-[#D4AF37]"
              >
                <ShoppingBag size={22} />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-[#D4AF37] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px]">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 p-6 space-y-4 shadow-xl">
            <Link to="/shop" className="block text-sm uppercase tracking-widest font-bold" onClick={() => setIsMobileMenuOpen(false)}>
              Shop All
            </Link>
            <Link to="/login" className="block text-sm uppercase tracking-widest font-bold" onClick={() => setIsMobileMenuOpen(false)}>
              Account
            </Link>
            {isAdmin && (
              <Link to="/admin/dashboard" className="block text-sm uppercase tracking-widest font-bold text-[#D4AF37]" onClick={() => setIsMobileMenuOpen(false)}>
                Admin Dashboard
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
