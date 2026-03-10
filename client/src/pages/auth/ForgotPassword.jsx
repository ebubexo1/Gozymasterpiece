import React from 'react';
import useForm from '../../hooks/useForm';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const ForgotPassword = () => {
  const { values, handleChange } = useForm({ email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🚨 REPLACE THIS: Connect to your real email service (EmailJS or Backend)
    console.log("Sending reset link to:", values.email);
    alert("If an account exists, a reset link has been sent.");
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center">
        <h2 className="text-2xl font-serif text-[#001F3F] mb-4">Reset Password</h2>
        <p className="text-sm text-slate-500 mb-8">Enter your email and we'll send you a link to get back into your account.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            placeholder="Enter your email" 
            name="email" 
            type="email" 
            value={values.email} 
            onChange={handleChange} 
            required 
          />
          <Button type="submit" variant="primary" className="w-full">Send Reset Link</Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;