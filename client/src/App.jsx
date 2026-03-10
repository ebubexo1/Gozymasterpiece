import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import useAnalytics from './hooks/useAnalytics';

// Public Pages
import Home from './pages/public/Home';
import Shop from './pages/public/Shop';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import ProductDetail from './pages/public/ProductDetail';
import ShippingPolicy from './pages/public/ShippingPolicy';
import Returns from './pages/public/Returns';
import TrackOrder from './pages/public/TrackOrder';
import PaymentVerify from './pages/public/PaymentVerify';
import ConfirmDelivery from './pages/public/ConfirmDelivery';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// User Pages
import Dashboard from './pages/user/Dashboard';
import Checkout from './pages/user/Checkout';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();        
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();
  if (!user) {
    return <Navigate to="/login" />; 
  }
  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-serif text-[#001F3F] mb-4">Access Denied</h1>
        <p className="text-slate-600 mb-8">You don't have permission to access this page.</p>
        <Navigate to="/" />
      </div>
    );
  }
  return children;
};

const AppInner = () => {
  useAnalytics();
  return null;
};

const App = () => {
  const { drawerOpen, setDrawerOpen } = useCart();
  return (
    <Router>
      <AppInner />
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow"> 
          <Routes>
            {/* Public Routes */}    
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/payment/verify" element={<PaymentVerify />} />
            <Route path="/confirm-delivery/:trackingId" element={<ConfirmDelivery />} />
            
            {/* User Routes */}      
            <Route
              path="/user/dashboard" 
              element={
                <ProtectedRoute>     
                  <Dashboard />      
                </ProtectedRoute>    
              }
            />
            <Route
              path="/user/checkout"  
              element={
                <ProtectedRoute>     
                  <Checkout />       
                </ProtectedRoute>    
              }
            />
            
            {/* Admin Routes - Protected */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard /> 
                </AdminRoute>        
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        {/* Cart Drawer */}
        <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
    </Router>
  );
};

export default App;
