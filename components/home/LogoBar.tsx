'use client';

import { TECH_LOGOS } from '@/lib/constants';

export default function LogoBar() {
  const items = [...TECH_LOGOS, ...TECH_LOGOS]; // doubled for seamless loop

  return (
    <div
      className="py-6 overflow-hidden"
      style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'rgba(10,13,24,0.60)',
      }}
    >
      <p className="text-center text-[10px] font-medium uppercase tracking-widest mb-5" style={{ color: 'var(--text-muted)' }}>
        Teknologi yang Digunakan
      </p>
      <div className="relative" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)' }}>
        <div className="flex gap-10 marquee-track" style={{ width: 'max-content' }}>
          {items.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center gap-2.5 flex-shrink-0 transition-all duration-200"
              style={{ opacity: 0.35 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.80'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.35'; }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                style={{
                  background: 'rgba(79,110,247,0.10)',
                  border: '1px solid rgba(79,110,247,0.15)',
                }}
              >
                {logo.symbol}
              </div>
              <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
