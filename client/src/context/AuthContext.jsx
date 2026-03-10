import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

const ADMIN_EMAILS = [
  'admin@gozyresources.com',
  'owner@gozyresources.com',
  'ebube7440@gmail.com',
  // Add your email here
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await api.login(email, password);
      
      setUser(data);                                    // ✅ was data.user
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(data)); // ✅ was data.user
      localStorage.setItem('token', data.token);
      
      return { success: true, user: data };             // ✅ was data.user
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const data = await api.register(userData);
      
      setUser(data);                                    // ✅ was data.user
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(data)); // ✅ was data.user
      localStorage.setItem('token', data.token);
      
      return { success: true, user: data };             // ✅ was data.user
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('user', JSON.stringify(updatedUserData));
  };

  const isAdmin = user && user.role === "admin";

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      loading, 
      login, 
      register,
      logout, 
      updateUser,
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;