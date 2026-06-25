import type { Metadata } from 'next';
import HasilPageContent from '@/components/hasil/HasilPageContent';

export const metadata: Metadata = {
  title: 'Hasil Analisis — DisasterDetect',
  description: 'Dashboard ringkasan hasil penelitian perbandingan CNN Kustom, VGG16, dan ResNet50 untuk klasifikasi citra bencana (banjir dan kebakaran).',
};

export default function HasilPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background aurora glow layers */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 aurora-blue" style={{ opacity: 0.4 }} />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(124,92,252,0.12) 0%, transparent 55%)' }}
        />
      </div>

      <HasilPageContent />
    </main>
  );
}
