import React from 'react';

const Input = ({ label, name, id, ...props }) => {
  const inputId = id || name;
  
  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        autoComplete={name}
        className="w-full px-4 py-3 border border-slate-200 focus:border-[#D4AF37] outline-none transition-colors text-sm text-[#001F3F]"
        {...props}
      />
    </div>
  );
};

export default Input;
