import { cn } from '@/lib/utils';

interface FloatingNodeProps {
  label: string;
  value: string;
  position: React.CSSProperties;
  delay?: string;
  className?: string;
}

export default function FloatingNode({ label, value, position, delay = '0s', className }: FloatingNodeProps) {
  return (
    <div
      className={cn('absolute flex flex-col items-center gap-2 select-none floating-node', className)}
      style={{ ...position, animationDelay: delay }}
    >
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(13,17,32,0.80)',
          border: '1px solid rgba(79,110,247,0.30)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 20px rgba(79,110,247,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
          animationDelay: delay,
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #4F6EF7, #7C5CFC)',
            boxShadow: '0 0 8px rgba(79,110,247,0.70)',
          }}
        />
      </div>
      <div className="text-center">
        <p className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{label}</p>
        <p
          className="text-sm font-bold tabular-nums"
          style={{ color: 'var(--text-primary)' }}
        >
          {value}%
        </p>
      </div>
    </div>
  );
}
