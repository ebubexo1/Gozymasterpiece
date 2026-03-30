import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { WishlistProvider } from './context/WishlistContext';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <WishlistProvider>
      <CartProvider>
          <App />
        </CartProvider>
      </WishlistProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
