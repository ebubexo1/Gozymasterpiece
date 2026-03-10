import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../shop/CartDrawer';

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;