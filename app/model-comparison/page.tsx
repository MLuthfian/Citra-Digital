'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TabGroup from '@/components/ui/TabGroup';
import MetricsTable from '@/components/comparison/MetricsTable';
import TrainingChart from '@/components/comparison/TrainingChart';
import ConfusionMatrix from '@/components/comparison/ConfusionMatrix';
import ModelArchitecture from '@/components/comparison/ModelArchitecture';

const TABS = [
  { id: 'metrics', label: 'Akurasi & Metrik' },
  { id: 'training', label: 'Grafik Training' },
  { id: 'confusion', label: 'Confusion Matrix' },
  { id: 'architecture', label: 'Arsitektur Model' },
];

export default function ModelComparisonPage() {
  const [activeTab, setActiveTab] = useState('metrics');

  return (
    <main className="min-h-[100dvh] pt-24 pb-16">
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 aurora-blue" style={{ opacity: 0.5 }} />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(124,92,252,0.12) 0%, transparent 55%)' }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          {/* Page header */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-4"
              style={{
                background: 'rgba(79,110,247,0.10)',
                border: '1px solid rgba(79,110,247,0.20)',
                color: 'var(--accent-blue)',
              }}
            >
              Perbandingan Model
            </div>
            <h1
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              Kinerja Model Deep Learning
            </h1>
            <p className="text-sm max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              Perbandingan interaktif CNN Kustom, VGG16, dan ResNet50 berdasarkan metrik, grafik training, dan confusion matrix.
            </p>
          </div>

          {/* Tabs */}
          <div className="overflow-x-auto">
            <TabGroup
              tabs={TABS}
              activeTab={activeTab}
              onChange={setActiveTab}
              className="min-w-max"
            />
          </div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(13,17,32,0.60)',
              border: '1px solid var(--border-default)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {activeTab === 'metrics' && <MetricsTable />}
            {activeTab === 'training' && <TrainingChart />}
            {activeTab === 'confusion' && <ConfusionMatrix />}
            {activeTab === 'architecture' && <ModelArchitecture />}
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
