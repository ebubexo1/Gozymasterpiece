import React, { useState } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center">
        <h2 className="text-2xl font-serif text-[#001F3F] mb-4">Reset Password</h2>
        <p className="text-sm text-slate-500 mb-8">Enter your email and we'll send you a link to reset your password.</p>
        {message ? (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              placeholder="Enter your email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" className="w-full">
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
