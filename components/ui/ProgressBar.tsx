'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  label?: string;
  showValue?: boolean;
  className?: string;
  animated?: boolean;
}

export default function ProgressBar({
  value,
  color = 'bg-emerald-400',
  label,
  showValue = true,
  className,
  animated = true,
}: ProgressBarProps) {
  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between mb-2 text-sm">
          {label && <span style={{ color: 'var(--text-secondary)' }}>{label}</span>}
          {showValue && <span className="text-white font-semibold tabular-nums">{value}%</span>}
        </div>
      )}
      <div
        className="h-2 w-full rounded-full overflow-hidden"
        style={{ background: 'rgba(100,130,255,0.10)' }}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-700 ease-out',
            color,
            animated && 'animate-progress'
          )}
          style={{
            width: `${value}%`,
            boxShadow: `0 0 8px currentColor`,
          }}
        />
      </div>
    </div>
  );
}
