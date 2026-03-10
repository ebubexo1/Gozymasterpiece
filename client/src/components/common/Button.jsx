import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false
}) => {
  const baseStyles = "px-8 py-3 uppercase text-[10px] tracking-[0.2em] font-bold transition-all duration-300 active:scale-95 disabled:opacity-50";
  const variants = {
    primary: "bg-[#001F3F] text-white hover:bg-[#002d5c]",
    outline: "border border-[#001F3F] text-[#001F3F] hover:bg-[#001F3F] hover:text-white",
    gold: "bg-[#D4AF37] text-white hover:bg-[#b8952e]",
    ghost: "text-[#001F3F] hover:text-[#D4AF37]"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
