import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F6EF7]/50 disabled:opacity-40 disabled:cursor-not-allowed',
          {
            // Primary: gradient blue → violet
            'btn-gradient text-white rounded-xl': variant === 'primary',
            // Secondary: glass bordered
            'bg-transparent text-white/80 border rounded-xl hover:text-white': variant === 'secondary',
            // Ghost
            'bg-transparent text-white/50 hover:text-white hover:bg-white/5 rounded-xl': variant === 'ghost',
            // Glow: intense gradient with pulse
            'btn-gradient text-white rounded-xl pulse-glow': variant === 'glow',
          },
          variant === 'secondary' && 'border-[rgba(100,130,255,0.18)] hover:border-[rgba(100,130,255,0.40)] hover:bg-[rgba(79,110,247,0.06)]',
          {
            'text-xs px-3 py-1.5': size === 'sm',
            'text-sm px-5 py-2.5': size === 'md',
            'text-base px-7 py-3.5': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
