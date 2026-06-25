import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'best' | 'blue' | 'violet';
}

export default function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-white/8 text-white/60 border border-white/10': variant === 'default',
          'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20': variant === 'success',
          'bg-red-500/15 text-red-400 border border-red-500/20': variant === 'danger',
          'bg-amber-500/15 text-amber-400 border border-amber-500/20': variant === 'warning',
          // Best: blue/violet gradient
          'text-white font-semibold border border-[rgba(79,110,247,0.35)]': variant === 'best',
          'bg-[rgba(79,110,247,0.15)] text-[#7EB9FF] border border-[rgba(79,110,247,0.25)]': variant === 'blue',
          'bg-[rgba(124,92,252,0.15)] text-[#B89BFF] border border-[rgba(124,92,252,0.25)]': variant === 'violet',
        },
        variant === 'best' && 'bg-gradient-to-r from-[rgba(79,110,247,0.20)] to-[rgba(124,92,252,0.20)]',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
