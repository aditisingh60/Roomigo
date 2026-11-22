import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'sage',
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
    sage:
      'bg-[#556852] text-[#FAF6EE] hover:bg-[#435340] shadow-sm shadow-[#556852]/20 focus:ring-[#556852]',
    primary:
      'bg-[#556852] text-[#FAF6EE] hover:bg-[#435340] shadow-sm shadow-[#556852]/20 focus:ring-[#556852]',
    butter:
      'bg-[#F7E599] text-[#232B20] hover:bg-[#eed77a] border border-[#E2CD75]/60 shadow-sm focus:ring-[#F7E599] font-semibold',
    sand:
      'bg-[#F3ECE0] text-[#232B20] hover:bg-[#e7ded0] border border-[#556852]/25 shadow-sm focus:ring-[#556852]',
    secondary:
      'bg-[#EBF1EA] text-[#374435] hover:bg-[#dbe6da] border border-[#556852]/20 focus:ring-[#556852]',
    accent:
      'bg-[#D47A60] text-white hover:bg-[#c2684f] shadow-md shadow-[#D47A60]/25 focus:ring-[#D47A60]',
    outline:
      'border border-[#556852]/35 text-[#232B20] hover:bg-[#EBF1EA]/70 hover:border-[#556852]/50 focus:ring-[#556852]',
    ghost:
      'text-[#616E5E] hover:text-[#232B20] hover:bg-[#EBF1EA]/60 focus:ring-[#556852]',
    white:
      'bg-white text-[#232B20] hover:bg-[#FAF6EE] border border-[#556852]/15 shadow-sm focus:ring-[#556852]',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3 gap-2.5 font-semibold',
    pill: 'text-[11px] uppercase tracking-[0.2em] px-6 py-2.5 gap-2 font-semibold',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.sage} ${
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
