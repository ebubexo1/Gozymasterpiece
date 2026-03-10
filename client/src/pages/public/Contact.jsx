import React, { useState } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <p className="text-[#D4AF37] text-xs uppercase tracking-[0.4em] mb-4">Get In Touch</p>
        <h1 className="text-4xl font-serif text-[#001F3F] mb-6">Contact Us</h1>
        <p className="text-slate-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <div className="flex flex-col space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            required
            className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none transition-colors text-sm text-[#001F3F]"
          />
        </div>

        <div className="text-center">
          <Button type="submit" variant="primary">Send Message</Button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
