'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

const ARCHITECTURES = [
  {
    name: 'CNN Kustom',
    subtitle: 'Custom Convolutional Neural Network',
    type: 'Training from Scratch',
    accuracy: '92.08%',
    best: true,
    layers: ['Input (224×224×3)', 'Conv2D + BatchNormalization + ReLU', 'MaxPooling2D', 'Conv2D + BatchNormalization + ReLU', 'MaxPooling2D', 'Flatten', 'Dense (256)', 'Dropout (0.5)', 'Dense Output (Sigmoid)'],
    pros: ['Arsitektur sederhana dan ringan', 'Akurasi terbaik pada dataset spesifik', 'Tidak cenderung overfitting dibandingkan model besar'],
    cons: ['Memerlukan tuning parameter manual', 'Sangat bergantung pada variabilitas data latih'],
    detail: 'Dirancang kustom dengan konfigurasi layer konvolusi sederhana, batch normalization, dan pooling. Model dilatih dari awal (from scratch) dan terbukti paling adaptif untuk dataset bencana yang terbatas.',
  },
  {
    name: 'VGG16',
    subtitle: 'Pre-trained VGG16 + Transfer Learning',
    type: 'Transfer Learning',
    accuracy: '91.67%',
    best: false,
    layers: ['ImageNet Pre-trained VGG16 Base', 'Feature Extraction (Frozen)', 'Flatten', 'Dense (256)', 'Dropout (0.5)', 'Dense Output (Sigmoid)'],
    pros: ['Konvergensi latih stabil', 'Fitur visual dasar sangat kaya dari ImageNet', 'Akurasi kompetitif mendekati CNN kustom'],
    cons: ['Ukuran file model cukup besar', 'Waktu inferensi sedikit lebih lama dibanding CNN kustom'],
    detail: 'Menggunakan feature extractor pre-trained dari VGG16 (ImageNet) dengan pendekatan Transfer Learning. Layer ekstraksi fitur di-freeze, hanya classification head baru yang dilatih.',
  },
  {
    name: 'ResNet50',
    subtitle: 'Deep Residual Network + Fine-tuning',
    type: 'Transfer Learning + Fine-tuning',
    accuracy: '73.33%',
    best: false,
    layers: ['ImageNet Pre-trained ResNet50', 'Residual Blocks (Frozen)', 'Top Layers (Unfrozen)', 'Global Average Pooling', 'Dense (256)', 'Dense Output (Sigmoid)'],
    pros: ['Mampu menangani residual learning dengan baik', 'Sangat kuat jika dataset berskala besar'],
    cons: ['Performa rendah pada dataset terbatas (73.33%)', 'Kompleksitas tinggi memicu overfitting/underfitting'],
    detail: 'Mengintegrasikan skip connection ResNet50. Dilatih dengan unfreezing layer atas (fine-tuning). Namun, arsitektur yang terlalu dalam ini kurang optimal untuk mendeteksi fitur banjir/kebakaran pada dataset yang relatif kecil.',
  },
];

export default function ModelArchitecture() {
  const [expanded, setExpanded] = useState<string | null>('CNN Kustom');

  return (
    <div className="space-y-3">
      {ARCHITECTURES.map((arch) => (
        <div
          key={arch.name}
          className={cn(
            'rounded-2xl border transition-all duration-300 overflow-hidden',
            expanded === arch.name
              ? 'border-white/20 bg-white/[0.05]'
              : 'border-white/[0.08] bg-white/[0.02]'
          )}
        >
          {/* Header */}
          <button
            className="w-full flex items-center justify-between p-5 text-left"
            onClick={() => setExpanded(expanded === arch.name ? null : arch.name)}
            id={`arch-${arch.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                {arch.name.slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold">{arch.name}</h3>
                  {arch.best && <Badge variant="best">Terbaik</Badge>}
                </div>
                <p className="text-xs text-white/40">{arch.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="success">{arch.accuracy}</Badge>
              <ChevronDown
                size={16}
                className={cn(
                  'text-white/40 transition-transform duration-200',
                  expanded === arch.name && 'rotate-180'
                )}
              />
            </div>
          </button>

          {/* Body */}
          {expanded === arch.name && (
            <div className="px-5 pb-5 space-y-5 border-t border-white/[0.06]">
              <p className="text-sm text-white/50 pt-4">{arch.detail}</p>

              {/* Layers */}
              <div>
                <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Layer Architecture</p>
                <div className="flex flex-wrap gap-2">
                  {arch.layers.map((layer, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/[0.08] text-xs text-white/60">
                        {layer}
                      </span>
                      {i < arch.layers.length - 1 && (
                        <span className="text-white/20 text-xs">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Keunggulan</p>
                  <ul className="space-y-1">
                    {arch.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Keterbatasan</p>
                  <ul className="space-y-1">
                    {arch.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                        <span className="text-red-400 mt-0.5">—</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
