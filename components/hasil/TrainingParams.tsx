import { TRAINING_PARAMS } from '@/lib/constants';

const PARAMS = [
  { label: 'Epoch', value: String(TRAINING_PARAMS.epoch) },
  { label: 'Batch Size', value: String(TRAINING_PARAMS.batchSize) },
  { label: 'Optimizer', value: TRAINING_PARAMS.optimizer },
  { label: 'Learning Rate', value: String(TRAINING_PARAMS.learningRate) },
  { label: 'Loss Function', value: TRAINING_PARAMS.lossFunction },
  { label: 'Input Size', value: `${TRAINING_PARAMS.inputSize} px` },
  { label: 'Train Split', value: `${TRAINING_PARAMS.split.train}%` },
  { label: 'Val Split', value: `${TRAINING_PARAMS.split.val}%` },
  { label: 'Test Split', value: `${TRAINING_PARAMS.split.test}%` },
];

const PIPELINE_STEPS = [
  { num: '①', label: 'Dataset Kaggle' },
  { num: '②', label: 'Resize 224×224' },
  { num: '③', label: 'Normalisasi (0–1)' },
  { num: '④', label: 'Augmentasi Data' },
  { num: '⑤', label: 'Training' },
];

const AUGMENTATION = [
  { label: 'Rotasi', value: 'hingga 30°' },
  { label: 'Horizontal Flipping', value: 'Aktif' },
  { label: 'Zoom', value: 'hingga 30%' },
  { label: 'Brightness Adjustment', value: 'Aktif' },
];

export default function TrainingParams() {
  return (
    <div className="space-y-8">
      {/* Parameter grid */}
      <div>
        <h3 className="text-sm font-medium text-[#96AADC]/50 uppercase tracking-wider mb-4">Parameter Training</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PARAMS.map((p) => (
            <div
              key={p.label}
              className="glass-panel rounded-xl p-3.5 hover:border-[rgba(100,130,255,0.25)] transition-all duration-300 group"
            >
              <p className="text-xs text-[#96AADC]/50 font-medium mb-1">{p.label}</p>
              <p className="text-sm text-white font-semibold group-hover:text-[#4F6EF7] transition-colors">{p.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline */}
      <div>
        <h3 className="text-sm font-medium text-[#96AADC]/50 uppercase tracking-wider mb-4">Preprocessing Pipeline</h3>
        <div className="flex flex-wrap items-center gap-3">
          {PIPELINE_STEPS.map((step, i) => (
            <div key={step.num} className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[rgba(100,130,255,0.12)] bg-[rgba(13,17,32,0.4)] hover:border-[rgba(79,110,247,0.3)] hover:bg-[rgba(79,110,247,0.03)] transition-all duration-300 shadow-md">
                <span className="text-[#4F6EF7] font-semibold text-sm">{step.num}</span>
                <span className="text-sm text-[#F0F4FF]/80 font-medium">{step.label}</span>
              </div>
              {i < PIPELINE_STEPS.length - 1 && (
                <span className="text-white/20 select-none font-bold">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Augmentation */}
      <div>
        <h3 className="text-sm font-medium text-[#96AADC]/50 uppercase tracking-wider mb-4">Detail Augmentasi Data</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {AUGMENTATION.map((a) => (
            <div 
              key={a.label} 
              className="glass-panel rounded-xl p-3.5 hover:border-[rgba(100,130,255,0.25)] transition-all duration-300 group"
            >
              <p className="text-xs text-[#96AADC]/50 font-medium mb-1">{a.label}</p>
              <p className="text-sm text-[#38BDF8] font-semibold group-hover:text-[#4F6EF7] transition-colors">{a.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
