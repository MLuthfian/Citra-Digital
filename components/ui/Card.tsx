import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  variant?: 'default' | 'elevated' | 'bright';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = false, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-300',
          variant === 'default' && 'glass-panel',
          variant === 'elevated' && 'bg-[#0D1120] border border-[rgba(100,130,255,0.12)] backdrop-blur-md',
          variant === 'bright' && 'glass-panel-bright',
          glow && 'hover:border-[rgba(79,110,247,0.30)] hover:shadow-[0_0_30px_rgba(79,110,247,0.10)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
export default Card;
