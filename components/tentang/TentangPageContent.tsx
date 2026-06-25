'use client';

import { motion } from 'framer-motion';

const RESEARCHERS = [
  { name: 'Peneliti 1', role: 'Ketua Penelitian', nim: '...' },
  { name: 'Peneliti 2', role: 'Anggota', nim: '...' },
  { name: 'Peneliti 3', role: 'Anggota', nim: '...' },
  { name: 'Peneliti 4', role: 'Anggota', nim: '...' },
];

const TECH_STACK = [
  'Python 3.x', 'TensorFlow 2.x', 'Keras', 'CNN Kustom',
  'VGG16', 'ResNet50', 'Kaggle Dataset', 'Adam Optimizer',
  'NumPy', 'Matplotlib', 'scikit-learn',
];

const REFERENCES = [
  'Simonyan, K., & Zisserman, A. (2014). Very Deep Convolutional Networks for Large-Scale Image Recognition. arXiv.',
  'He, K., et al. (2016). Deep Residual Learning for Image Recognition. CVPR.',
  'Goodfellow, I., Bengio, Y., & Courville, A. (2016). Deep Learning. MIT Press.',
  'Kaggle Flood & Fire Images Dataset. Retrieved from: https://www.kaggle.com/datasets',
  'Chollet, F. (2017). Deep Learning with Python. Manning Publications.',
];

export default function TentangPageContent() {
  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-12"
      >
        {/* Header */}
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-4 animate-pulse-glow"
            style={{
              background: 'rgba(79,110,247,0.10)',
              border: '1px solid rgba(79,110,247,0.20)',
              color: 'var(--accent-blue)',
            }}
          >
            Tentang Penelitian
          </div>
          <h1 className="text-2xl sm:text-3.5xl font-bold text-white mb-4 leading-tight text-gradient">
            Analisis Performa Model Deep Learning Dalam Klasifikasi Citra Banjir dan Kebakaran Menggunakan CNN, VGG16, dan ResNet50
          </h1>
          <div className="flex flex-wrap gap-2.5 mt-5">
            <span className="px-3.5 py-1 rounded-full text-xs border border-[rgba(100,130,255,0.1)] text-[#96AADC]/60 bg-[rgba(13,17,32,0.4)] backdrop-blur-md">
              Universitas Dian Nuswantoro
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs border border-[rgba(100,130,255,0.1)] text-[#96AADC]/60 bg-[rgba(13,17,32,0.4)] backdrop-blur-md">
              Prodi Informatika
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs border border-[rgba(100,130,255,0.1)] text-[#96AADC]/60 bg-[rgba(13,17,32,0.4)] backdrop-blur-md">
              Fakultas Ilmu Komputer
            </span>
          </div>
        </div>

        {/* Description */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel rounded-2xl p-6 relative overflow-hidden border-l-4 border-l-[#7C5CFC]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#7C5CFC]/5 to-transparent blur-2xl pointer-events-none" />
          <h2 className="text-sm font-semibold text-white/80 mb-3 tracking-wide uppercase">Deskripsi Penelitian</h2>
          <p className="text-sm text-[#96AADC]/80 leading-relaxed">
            Penelitian ini bertujuan untuk menganalisis dan membandingkan kinerja tiga model deep learning — CNN kustom (training from scratch), VGG16, dan ResNet50 — dalam mengklasifikasikan citra bencana alam ke dalam dua kelas: Banjir (Flood) dan Kebakaran (Fire) menggunakan dataset dari Kaggle berjumlah 1.600 citra. Pendekatan training dari scratch dan transfer learning diterapkan untuk mengukur performa model dengan metrik akurasi, precision, recall, dan F1-score. Hasil penelitian menunjukkan bahwa arsitektur CNN kustom yang dirancang sederhana mencapai akurasi tertinggi sebesar 92.08%.
          </p>
        </motion.div>

        {/* Researchers */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-[#96AADC]/50 uppercase tracking-wider">Tim Peneliti</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RESEARCHERS.map((r, i) => (
              <div
                key={i}
                className="glass-panel rounded-xl p-4 flex items-center gap-4 hover:border-[rgba(100,130,255,0.25)] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F6EF7]/20 to-[#7C5CFC]/20 border border-[rgba(79,110,247,0.25)] flex items-center justify-center text-sm font-bold text-[#4F6EF7] flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm text-white font-medium group-hover:text-[#4F6EF7] transition-colors">{r.name}</p>
                  <p className="text-xs text-[#96AADC]/50 mt-0.5">{r.role} · Universitas Dian Nuswantoro</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-[#96AADC]/50 uppercase tracking-wider">Stack Teknologi Penelitian</h2>
          <div className="flex flex-wrap gap-2.5">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-full text-xs border border-[rgba(100,130,255,0.12)] bg-[rgba(79,110,247,0.03)] text-[#96AADC]/70 hover:text-white hover:border-[#4F6EF7] hover:bg-[rgba(79,110,247,0.10)] transition-all duration-300 shadow-sm select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* References */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-[#96AADC]/50 uppercase tracking-wider">Daftar Pustaka</h2>
          <div className="glass-panel rounded-2xl overflow-hidden">
            {REFERENCES.map((ref, i) => (
              <div
                key={i}
                className="px-5 py-4 border-b border-[rgba(100,130,255,0.08)] last:border-0 flex gap-4 hover:bg-[rgba(255,255,255,0.01)] transition-colors duration-250"
              >
                <span className="text-xs text-[#4F6EF7] flex-shrink-0 font-mono mt-0.5 font-semibold">[{i + 1}]</span>
                <p className="text-xs text-[#96AADC]/65 leading-relaxed">{ref}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
