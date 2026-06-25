import { MODEL_METRICS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const MEDALS = ['🥇', '🥈', '🥉'];
const RECOMMENDATIONS = ['Rekomendasi Terbaik', 'Kompetitif', 'Efisien'];

const SUGGESTIONS = [
  {
    icon: '📊',
    title: 'Dataset Lebih Besar & Beragam',
    desc: 'Perluas dataset dengan citra dari berbagai kondisi dan lokasi untuk meningkatkan generalisasi model.',
  },
  {
    icon: '🔬',
    title: 'Eksplorasi EfficientNet / ViT',
    desc: 'Coba arsitektur state-of-the-art seperti EfficientNetV2 atau Vision Transformer untuk perbandingan lebih lanjut.',
  },
  {
    icon: '🔄',
    title: 'Augmentasi Data Lebih Kompleks',
    desc: 'Implementasikan augmentasi lanjutan seperti MixUp, CutOut, atau RandAugment untuk robustness lebih tinggi.',
  },
  {
    icon: '👁',
    title: 'Integrasi Grad-CAM',
    desc: 'Tambahkan visualisasi Grad-CAM untuk interpretabilitas model — menunjukkan area kerusakan yang menjadi fokus prediksi.',
  },
];

// Sort by accuracy descending
const RANKED = [...MODEL_METRICS].sort((a, b) => b.accuracy - a.accuracy);

export default function RankingCards() {
  return (
    <div className="space-y-8">
      {/* Ranking */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-[#96AADC]/50 uppercase tracking-wider mb-4">Peringkat Model</h3>
        {RANKED.map((model, i) => (
          <div
            key={model.name}
            className={cn(
              'rounded-2xl border p-5 flex items-center gap-4 transition-all duration-300 relative overflow-hidden group',
              i === 0 
                ? 'border-[rgba(251,191,36,0.25)] bg-[rgba(251,191,36,0.03)] shadow-[0_0_24px_rgba(251,191,36,0.04)]' 
                : 'glass-panel hover:border-[rgba(100,130,255,0.25)]'
            )}
          >
            {/* Background highlight glow on hover */}
            <div 
              className={cn(
                "absolute -right-12 -bottom-12 w-28 h-28 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                i === 0 ? "bg-amber-500/10" : "bg-[#4F6EF7]/10"
              )}
            />

            <span className="text-3xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]">{MEDALS[i]}</span>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h4 className={cn("font-semibold text-lg", i === 0 ? "text-[#fbbf24]" : "text-white")}>{model.name}</h4>
                <span className={cn("text-2xl font-bold tracking-tight", i === 0 ? "text-[#fbbf24]" : "text-[#4F6EF7]")}>{model.accuracy.toFixed(2)}%</span>
              </div>
              <p className="text-xs text-[#96AADC]/60 mt-0.5">{model.type} · {RECOMMENDATIONS[i]}</p>
            </div>
            <div
              className="h-12 w-1 rounded-full flex-shrink-0"
              style={{
                background: i === 0
                  ? 'linear-gradient(to bottom, #fbbf24, #f59e0b)'
                  : i === 1
                  ? 'linear-gradient(to bottom, #94a3b8, #64748b)'
                  : 'linear-gradient(to bottom, #b45309, #78350f)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Conclusion paragraph */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border-l-4 border-l-[#4F6EF7]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#4F6EF7]/5 to-transparent blur-2xl pointer-events-none" />
        <h3 className="text-sm font-semibold text-white/80 mb-3 tracking-wide uppercase">Kesimpulan Penelitian</h3>
        <p className="text-sm text-[#96AADC]/85 leading-relaxed">
          Berdasarkan eksperimen menggunakan dataset Bencana Alam (Banjir & Kebakaran) dari Kaggle berjumlah 1.600 citra dengan pembagian 70/15/15%,
          model <strong className="text-white font-semibold">CNN Kustom</strong> dengan pendekatan training dari scratch
          mencapai akurasi tertinggi sebesar <strong className="text-[#38BDF8] font-bold">92.08%</strong>, unggul dari VGG16 (91.67%)
          dan ResNet50 (73.33%). Arsitektur CNN Kustom yang dirancang sederhana terbukti lebih efektif meminimalkan
          risiko overfitting pada dataset berskala terbatas, menghasilkan ekstraksi fitur visual bencana alam yang lebih representatif dibanding model pre-trained transfer learning yang terlalu dalam.
        </p>
      </div>

      {/* Suggestions */}
      <div>
        <h3 className="text-sm font-medium text-[#96AADC]/50 uppercase tracking-wider mb-4">Saran Pengembangan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUGGESTIONS.map((s) => (
            <div
              key={s.title}
              className="glass-panel rounded-2xl p-5 flex gap-4 hover:border-[rgba(100,130,255,0.25)] transition-all duration-300 group"
            >
              <span className="text-3xl flex-shrink-0 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-300">{s.icon}</span>
              <div>
                <h4 className="text-sm text-white font-medium mb-1 group-hover:text-[#4F6EF7] transition-colors">{s.title}</h4>
                <p className="text-xs text-[#96AADC]/60 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
