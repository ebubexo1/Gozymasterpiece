import React from 'react';

const SectionTitle = ({ title, subtitle, center = true }) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
      <p className="text-[#D4AF37] text-xs uppercase tracking-[0.5em] mb-2">{subtitle}</p>
      <h2 className="text-3xl md:text-4xl font-serif text-[#001F3F]">{title}</h2>
      <div className={`h-px bg-slate-100 w-24 mt-4 ${center ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionTitle;
