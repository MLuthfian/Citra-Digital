'use client';

import { HistoryEntry } from '@/hooks/useClassificationHistory';
import { Waves, Flame, Trash2, Clock, Cpu, X } from 'lucide-react';

interface HistoryPanelProps {
  history: HistoryEntry[];
  onClear: () => void;
  onRemove: (id: string) => void;
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function HistoryPanel({ history, onClear, onRemove }: HistoryPanelProps) {
  if (history.length === 0) {
    return (
      <div
        className="rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-3"
        style={{ border: '1px solid var(--border-subtle)', background: 'rgba(13,17,32,0.40)' }}
      >
        <Clock size={28} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
        <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          Belum ada riwayat klasifikasi
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
          Upload dan analisis gambar untuk melihat histori di sini
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          Riwayat ({history.length})
        </p>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-xs transition-colors duration-150"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#ef4444'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
          aria-label="Hapus semua riwayat"
          id="btn-clear-history"
        >
          <Trash2 size={11} />
          Hapus Semua
        </button>
      </div>

      {/* Entries */}
      <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(79,110,247,0.20) transparent' }}>
        {history.map((entry) => {
          const isBanjir = entry.label === 'BANJIR';
          const accentColor = isBanjir ? '#38BDF8' : '#F97316';
          const accentBg = isBanjir ? 'rgba(56,189,248,0.08)' : 'rgba(249,115,22,0.08)';
          const accentBorder = isBanjir ? 'rgba(56,189,248,0.20)' : 'rgba(249,115,22,0.20)';

          return (
            <div
              key={entry.id}
              className="relative rounded-xl p-3 flex items-center gap-3 group transition-all duration-150"
              style={{
                background: 'rgba(13,17,32,0.60)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {/* Thumbnail */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center"
                style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
              >
                {entry.filePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={entry.filePreview} alt={entry.fileName} className="w-full h-full object-cover" />
                ) : (
                  isBanjir
                    ? <Waves size={20} style={{ color: accentColor }} />
                    : <Flame size={20} style={{ color: accentColor }} />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold" style={{ color: accentColor }}>
                    {isBanjir ? '🌊' : '🔥'} {entry.label}
                  </span>
                  <span className="text-xs tabular-nums font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    {entry.confidence}%
                  </span>
                </div>
                <p className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>{entry.fileName}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[10px] flex items-center gap-1" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
                    <Cpu size={9} /> {entry.modelUsed}
                  </span>
                  <span className="text-[10px] flex items-center gap-1" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
                    <Clock size={9} /> {formatTime(entry.timestamp)}
                  </span>
                </div>
              </div>

              {/* Remove button */}
              <button
                onClick={() => onRemove(entry.id)}
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444' }}
                aria-label={`Hapus ${entry.fileName}`}
              >
                <X size={10} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
