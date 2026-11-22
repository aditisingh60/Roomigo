import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]';

  const variants = {
    primary:
      'bg-[#7056D8] text-white hover:bg-[#5d44c8] shadow-md shadow-[#7056D8]/20 focus:ring-[#7056D8]',
    secondary:
      'bg-[#F0ECFF] text-[#7056D8] hover:bg-[#e4ddfc] border border-[#7056D8]/15 focus:ring-[#7056D8]',
    accent:
      'bg-[#FF8BA7] text-white hover:bg-[#f67493] shadow-md shadow-[#FF8BA7]/25 focus:ring-[#FF8BA7]',
    outline:
      'border border-[#252333]/15 text-[#252333] hover:bg-[#F0ECFF]/60 hover:border-[#7056D8]/30 focus:ring-[#7056D8]',
    ghost:
      'text-[#656377] hover:text-[#252333] hover:bg-[#F0ECFF]/60 focus:ring-[#7056D8]',
    white:
      'bg-white text-[#252333] hover:bg-slate-50 shadow-sm focus:ring-[#7056D8]',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
      {children}
    </button>
  );
};

export default Button;
