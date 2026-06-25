'use client';

import { motion } from 'framer-motion';
import StatsBar from './StatsBar';
import TrainingParams from './TrainingParams';
import RankingCards from './RankingCards';

export default function HasilPageContent() {
  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-12"
      >
        {/* Page header */}
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-4"
            style={{
              background: 'rgba(124,92,252,0.10)',
              border: '1px solid rgba(124,92,252,0.20)',
              color: 'var(--accent-violet)',
            }}
          >
            Hasil Penelitian
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-gradient"
          >
            Dashboard Hasil Analisis
          </h1>
          <p className="text-sm max-w-2xl text-[#96AADC]/70">
            Ringkasan komprehensif hasil penelitian deep learning untuk klasifikasi citra bencana banjir dan kebakaran.
          </p>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <StatsBar />
        </motion.div>

        {/* Grid Layout for Training Parameters & Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Col: Preprocessing & Training Parameters */}
          <motion.section 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 glass-panel rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#4F6EF7]/5 to-transparent blur-2xl pointer-events-none" />
            <TrainingParams />
          </motion.section>

          {/* Right Col: Rankings & Conclusions */}
          <motion.section 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <RankingCards />
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
