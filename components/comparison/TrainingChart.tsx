'use client';

import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TRAINING_HISTORY, MODEL_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

type ChartType = 'accuracy' | 'loss';

const CHART_CONFIG: Record<ChartType, {
  lines: { key: string; name: string; color: string }[];
  domain: [number, number];
  label: string;
}> = {
  accuracy: {
    lines: [
      { key: 'cnn_acc', name: 'CNN Kustom', color: MODEL_COLORS['CNN Kustom'] },
      { key: 'vgg16_acc', name: 'VGG16', color: MODEL_COLORS.VGG16 },
      { key: 'resnet_acc', name: 'ResNet50', color: MODEL_COLORS.ResNet50 },
    ],
    domain: [0.45, 1.0],
    label: 'Accuracy',
  },
  loss: {
    lines: [
      { key: 'cnn_loss', name: 'CNN Kustom', color: MODEL_COLORS['CNN Kustom'] },
      { key: 'vgg16_loss', name: 'VGG16', color: MODEL_COLORS.VGG16 },
      { key: 'resnet_loss', name: 'ResNet50', color: MODEL_COLORS.ResNet50 },
    ],
    domain: [0, 1.1],
    label: 'Loss',
  },
};

export default function TrainingChart() {
  const [type, setType] = useState<ChartType>('accuracy');
  const config = CHART_CONFIG[type];

  return (
    <div className="space-y-5">
      {/* Toggle */}
      <div className="flex gap-2">
        {(['accuracy', 'loss'] as ChartType[]).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
              type === t
                ? 'bg-white text-black'
                : 'text-white/50 border border-white/10 hover:text-white hover:border-white/30'
            )}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={TRAINING_HISTORY} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
            <XAxis
              dataKey="epoch"
              stroke="rgba(255,255,255,0.2)"
              tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }}
              label={{ value: 'Epoch', position: 'insideBottomRight', offset: 0, fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.2)"
              tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }}
              domain={config.domain}
              tickFormatter={(v) => v.toFixed(2)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111111',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '12px',
                color: 'white',
              }}
              formatter={(value) => [typeof value === 'number' ? value.toFixed(4) : value, '']}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}
            />
            {config.lines.map((line) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                name={line.name}
                stroke={line.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend description */}
      <div className="grid grid-cols-3 gap-3">
        {config.lines.map((line) => (
          <div key={line.key} className="flex items-center gap-2 text-xs text-white/40">
            <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: line.color }} />
            {line.name}
          </div>
        ))}
      </div>
    </div>
  );
}
