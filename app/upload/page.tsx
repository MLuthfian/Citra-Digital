'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DropZone from '@/components/upload/DropZone';
import ModelSelector from '@/components/upload/ModelSelector';
import ResultCard from '@/components/upload/ResultCard';
import HistoryPanel from '@/components/upload/HistoryPanel';
import { ClassificationResult } from '@/types';
import { useClassificationHistory } from '@/hooks/useClassificationHistory';
import { Loader2, Zap, History, ChevronUp, ChevronDown, AlertTriangle } from 'lucide-react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { history, addEntry, clearHistory, removeEntry } = useClassificationHistory();

  const canAnalyze = file && selectedModel && !loading;

  const handleFile = (f: File) => {
    setFile(f);
    setApiError(null);
    const reader = new FileReader();
    reader.onload = (e) => setFilePreview(e.target?.result as string ?? '');
    reader.readAsDataURL(f);
  };

  const handleAnalyze = async () => {
    if (!canAnalyze) return;
    setLoading(true);
    setResult(null);
    setApiError(null);

    try {
      const formData = new FormData();
      formData.append('image', file as File);
      formData.append('model', selectedModel as string);

      const res = await fetch('/api/classify', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error ?? 'Terjadi kesalahan saat klasifikasi.');
        setLoading(false);
        return;
      }

      const finalResult: ClassificationResult = {
        label:            (data.label as 'BANJIR' | 'KEBAKARAN') ?? 'BANJIR',
        confidence:       Number(data.confidence) || 0,
        floodProbability: Number(data.floodProbability) || 0,
        fireProbability:  Number(data.fireProbability) || 0,
        inferenceTime:    Number(data.inferenceTime) || 0,
        modelUsed:        data.modelUsed ?? (selectedModel as string),
      };

      setResult(finalResult);
      if (file) addEntry(finalResult, file, filePreview);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setApiError(`Gagal menghubungi API: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => setResult(null);
  const handleNewUpload = () => {
    setResult(null);
    setFile(null);
    setFilePreview('');
    setSelectedModel(null);
  };

  return (
    <main className="min-h-[100dvh] pt-24 pb-16">
      {/* Background ambient */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 aurora-blue" style={{ opacity: 0.6 }} />
        <div className="absolute inset-0 aurora-violet" style={{ opacity: 0.4 }} />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Page header */}
          <div className="mb-10">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-4"
              style={{
                background: 'rgba(79,110,247,0.10)',
                border: '1px solid rgba(79,110,247,0.20)',
                color: 'var(--accent-blue)',
              }}
            >
              Upload &amp; Klasifikasi Bencana
            </div>
            <h1
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              Analisis Citra Bencana
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Upload foto lokasi/kondisi bencana dan pilih model untuk mendapatkan hasil klasifikasi secara instan.
            </p>
          </div>

          {/* API Error Banner */}
          <AnimatePresence>
            {apiError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mb-4 flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
                style={{
                  background: 'rgba(239,68,68,0.10)',
                  border: '1px solid rgba(239,68,68,0.30)',
                  color: '#fca5a5',
                }}
              >
                <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#f87171' }} />
                <span>{apiError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {!result ? (
            <div className="space-y-6">
              {/* Step 1 */}
              <div>
                <StepLabel number={1} text="Upload Citra Bencana" />
                <DropZone file={file} preview={filePreview} onFile={handleFile} onClear={() => { setFile(null); setFilePreview(''); }} />
              </div>

              {/* Step 2 */}
              <div>
                <StepLabel number={2} text="Pilih Model Klasifikasi" />
                <ModelSelector selected={selectedModel} onSelect={setSelectedModel} />
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze}
                id="btn-analisis-citra"
                className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none text-white"
                style={canAnalyze ? {
                  background: 'linear-gradient(135deg, #4F6EF7 0%, #7C5CFC 100%)',
                  boxShadow: '0 4px 24px rgba(79,110,247,0.35)',
                } : {
                  background: 'rgba(79,110,247,0.20)',
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    Analisis Citra →
                  </>
                )}
              </button>

              {/* Loading skeleton */}
              {loading && (
                <div className="space-y-3">
                  {[0.75, 0.5, 0.65].map((w, i) => (
                    <div
                      key={i}
                      className="h-3 rounded-lg shimmer"
                      style={{ width: `${w * 100}%` }}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ResultCard result={result} onReset={handleReset} onNewUpload={handleNewUpload} />
            </motion.div>
          )}

          {/* History toggle */}
          <div className="mt-8">
            <button
              onClick={() => setShowHistory((v) => !v)}
              id="btn-toggle-history"
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: 'rgba(79,110,247,0.06)',
                border: '1px solid rgba(79,110,247,0.15)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(79,110,247,0.10)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(79,110,247,0.06)'; }}
            >
              <span className="flex items-center gap-2">
                <History size={14} style={{ color: 'var(--accent-blue)' }} />
                Riwayat Klasifikasi
                {history.length > 0 && (
                  <span
                    className="px-1.5 py-0.5 rounded-full text-[10px] font-bold tabular-nums"
                    style={{ background: 'rgba(79,110,247,0.20)', color: 'var(--accent-blue)' }}
                  >
                    {history.length}
                  </span>
                )}
              </span>
              {showHistory ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            <AnimatePresence>
              {showHistory && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-3">
                    <HistoryPanel
                      history={history}
                      onClear={clearHistory}
                      onRemove={removeEntry}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </main>
  );
}

function StepLabel({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #4F6EF7, #7C5CFC)' }}
      >
        {number}
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
        {text}
      </p>
    </div>
  );
}
