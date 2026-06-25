'use client';

import { ClassificationResult } from '@/types';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import { Clock, Cpu, RefreshCw, UploadCloud, Waves, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultCardProps {
  result: ClassificationResult;
  onReset: () => void;
  onNewUpload: () => void;
}

export default function ResultCard({ result, onReset, onNewUpload }: ResultCardProps) {
  const isBanjir = result.label === 'BANJIR';
  const statusColor = isBanjir ? '#38BDF8' : '#F97316';
  const statusBg = isBanjir ? 'rgba(56,189,248,0.10)' : 'rgba(249,115,22,0.10)';
  const statusBorder = isBanjir ? 'rgba(56,189,248,0.25)' : 'rgba(249,115,22,0.25)';

  return (
    <Card className="p-6 space-y-6" glow>
      {/* Result badge */}
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: statusBg,
            border: `1px solid ${statusBorder}`,
            boxShadow: `0 0 32px ${statusBg}`,
          }}
        >
          {isBanjir ? (
            <Waves size={28} style={{ color: statusColor }} />
          ) : (
            <Flame size={28} style={{ color: statusColor }} />
          )}
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
            Hasil Klasifikasi
          </p>
          <h2
            className={cn('text-3xl font-bold tracking-wide')}
            style={{ color: statusColor }}
          >
            {isBanjir ? '🌊 BANJIR (FLOOD)' : '🔥 KEBAKARAN (FIRE)'}
          </h2>
        </div>
      </div>

      {/* Confidence */}
      <div className="space-y-3">
        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          Tingkat Keyakinan Model
        </p>
        <ProgressBar
          value={result.confidence}
          color={isBanjir ? 'bg-cyan-400' : 'bg-orange-500'}
          showValue
        />
      </div>

      {/* Probability breakdown */}
      <div className="space-y-3">
        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          Distribusi Probabilitas
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '🌊 Probabilitas Banjir', value: result.floodProbability, color: '#38BDF8' },
            { label: '🔥 Probabilitas Kebakaran', value: result.fireProbability, color: '#F97316' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl p-3"
              style={{
                background: 'rgba(13,17,32,0.60)',
                border: '1px solid var(--border-default)',
              }}
            >
              <p className="text-[10px] mb-1 font-mono" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
              <p className="text-xl font-bold tabular-nums" style={{ color: item.color }}>
                {item.value}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Meta info */}
      <div
        className="flex gap-5 pt-4"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
          <Cpu size={11} />
          <span>{result.modelUsed}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
          <Clock size={11} />
          <span>{result.inferenceTime}s inferensi</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="ghost"
          onClick={onReset}
          className="flex-1 justify-center gap-2"
          id="btn-analisis-ulang"
        >
          <RefreshCw size={14} />
          Analisis Ulang
        </Button>
        <Button
          variant="secondary"
          onClick={onNewUpload}
          className="flex-1 justify-center gap-2"
          id="btn-upload-baru"
        >
          <UploadCloud size={14} />
          Upload Gambar Baru
        </Button>
      </div>
    </Card>
  );
}
