import React, { useState } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL + '/auth/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (e) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <p className="text-[#D4AF37] text-xs uppercase tracking-[0.4em] mb-4">Get In Touch</p>
        <h1 className="text-4xl font-serif text-[#001F3F] mb-6">Contact Us</h1>
        <p className="text-slate-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>
      {success ? (
        <div className="text-center py-10">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-serif text-[#001F3F] mb-2">Message Sent!</h2>
          <p className="text-slate-500 mb-6">Thank you for reaching out. We will get back to you soon.</p>
          <button onClick={() => setSuccess(false)} className="text-[#D4AF37] underline text-sm">Send another message</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">{error}</div>}
          <Input label="Name" type="text" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="6" required
              className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none transition-colors text-sm text-[#001F3F]" />
          </div>
          <div className="text-center">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      )}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-slate-100 pt-12">
        <div>
          <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-2">Email</p>
          <a href="mailto:gozymasterpiece@gmail.com" className="text-sm text-slate-600 hover:text-[#001F3F]">gozymasterpiece@gmail.com</a>
        </div>
        <div>
          <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-2">Phone</p>
          <a href="tel:+2348167823409" className="text-sm text-slate-600 hover:text-[#001F3F]">08167823409 / 07063718709</a>
        </div>
        <div>
          <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-2">Location</p>
          <p className="text-sm text-slate-600">Lagos, Nigeria</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
