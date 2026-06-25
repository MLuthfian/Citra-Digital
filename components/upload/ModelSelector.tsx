'use client';

import { MODEL_METRICS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface ModelSelectorProps {
  selected: string | null;
  onSelect: (name: string) => void;
}

// Geometric SVG icons per model
const ModelIcon = ({ name }: { name: string }) => {
  if (name === 'CNN Kustom') return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/>
      <rect x="12" y="2" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.6"/>
      <rect x="2" y="12" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.6"/>
      <rect x="12" y="12" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/>
    </svg>
  );
  if (name === 'VGG16') return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <polygon points="10,2 18,7 18,13 10,18 2,13 2,7" fill="currentColor" opacity="0.8"/>
      <circle cx="10" cy="10" r="3" fill="rgba(8,11,20,0.8)"/>
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L18 6.5V13.5L10 18L2 13.5V6.5L10 2Z" fill="currentColor" opacity="0.9"/>
      <path d="M10 6L14 8.5V13.5L10 16L6 13.5V8.5L10 6Z" fill="rgba(8,11,20,0.7)"/>
    </svg>
  );
};

const MODEL_COLOR_MAP: Record<string, string> = {
  'CNN Kustom': '#4F6EF7',
  VGG16: '#7C5CFC',
  ResNet50: '#38BDF8',
};

export default function ModelSelector({ selected, onSelect }: ModelSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {MODEL_METRICS.map((model) => {
        const isSelected = selected === model.name;
        const accentColor = MODEL_COLOR_MAP[model.name];
        return (
          <button
            key={model.name}
            onClick={() => onSelect(model.name)}
            className={cn(
              'relative text-left rounded-2xl p-4 transition-all duration-200 focus:outline-none'
            )}
            style={{
              border: isSelected
                ? `1px solid rgba(${hexToRgb(accentColor)}, 0.45)`
                : '1px solid var(--border-default)',
              background: isSelected
                ? `rgba(${hexToRgb(accentColor)}, 0.07)`
                : 'rgba(13,17,32,0.50)',
              boxShadow: isSelected
                ? `0 0 24px rgba(${hexToRgb(accentColor)}, 0.12)`
                : 'none',
            }}
            aria-pressed={isSelected}
            id={`model-${model.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          >
            {model.best && (
              <div className="absolute top-3 right-3">
                <Badge variant="best">✦ Terbaik</Badge>
              </div>
            )}

            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{
                background: `rgba(${hexToRgb(accentColor)}, 0.12)`,
                border: `1px solid rgba(${hexToRgb(accentColor)}, 0.25)`,
                color: accentColor,
              }}
            >
              <ModelIcon name={model.name} />
            </div>

            <h3 className="text-white font-semibold text-sm mb-0.5">{model.name}</h3>
            <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{model.type}</p>

            <div className="flex items-center gap-2">
              <span
                className="text-xs font-bold tabular-nums"
                style={{ color: accentColor }}
              >
                {model.accuracy.toFixed(2)}%
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>akurasi</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
