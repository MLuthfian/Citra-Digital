'use client';

import { useState } from 'react';
import { CONFUSION_MATRICES, MODEL_METRICS } from '@/lib/constants';
import { cn } from '@/lib/utils';

type ModelName = 'CNN Kustom' | 'VGG16' | 'ResNet50';

export default function ConfusionMatrix() {
  const [selected, setSelected] = useState<ModelName>('CNN Kustom');
  const matrix = CONFUSION_MATRICES[selected];

  const total = matrix.tp + matrix.tn + matrix.fp + matrix.fn;
  const correct = matrix.tp + matrix.tn;
  const accuracy = ((correct / total) * 100).toFixed(2);

  const cells = [
    { label: 'True Positive', short: 'TP', value: matrix.tp, type: 'positive' },
    { label: 'False Negative', short: 'FN', value: matrix.fn, type: 'negative' },
    { label: 'False Positive', short: 'FP', value: matrix.fp, type: 'negative' },
    { label: 'True Negative', short: 'TN', value: matrix.tn, type: 'positive' },
  ];

  return (
    <div className="space-y-6">
      {/* Model selector pills */}
      <div className="flex gap-2">
        {(['CNN Kustom', 'VGG16', 'ResNet50'] as ModelName[]).map((name) => (
          <button
            key={name}
            onClick={() => setSelected(name)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
              selected === name
                ? 'bg-white text-black'
                : 'text-white/50 border border-white/10 hover:text-white hover:border-white/30'
            )}
            id={`confusion-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Matrix grid */}
      <div className="flex flex-col items-center gap-2">
        {/* Predicted header */}
        <div className="self-center ml-20">
          <p className="text-xs text-white/30 tracking-widest uppercase text-center mb-2">Predicted</p>
          <div className="grid grid-cols-2 gap-1 ml-0">
            <p className="text-xs text-white/40 text-center w-32">Banjir</p>
            <p className="text-xs text-white/40 text-center w-32">Kebakaran</p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          {/* Actual label */}
          <div className="flex items-center" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            <p className="text-xs text-white/30 tracking-widest uppercase">Actual</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-1">
            {cells.map((cell, i) => (
              <div
                key={cell.short}
                className={cn(
                  'w-32 h-28 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all duration-300',
                  cell.type === 'positive'
                    ? 'bg-emerald-500/10 border-emerald-500/20'
                    : 'bg-red-500/10 border-red-500/20'
                )}
              >
                <p className={cn(
                  'text-3xl font-bold',
                  cell.type === 'positive' ? 'text-emerald-400' : 'text-red-400'
                )}>
                  {cell.value}
                </p>
                <p className={cn(
                  'text-xs font-medium',
                  cell.type === 'positive' ? 'text-emerald-400/70' : 'text-red-400/70'
                )}>
                  {cell.short}
                </p>
                <p className="text-[10px] text-white/30">{cell.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/[0.06]">
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
          <p className="text-xl font-bold text-emerald-400">{correct}</p>
          <p className="text-xs text-white/30 mt-0.5">Total Benar</p>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
          <p className="text-xl font-bold text-red-400">{total - correct}</p>
          <p className="text-xs text-white/30 mt-0.5">Total Salah</p>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
          <p className="text-xl font-bold text-white">{accuracy}%</p>
          <p className="text-xs text-white/30 mt-0.5">Akurasi</p>
        </div>
      </div>
    </div>
  );
}
