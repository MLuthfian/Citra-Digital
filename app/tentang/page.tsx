import type { Metadata } from 'next';
import TentangPageContent from '@/components/tentang/TentangPageContent';

export const metadata: Metadata = {
  title: 'Tentang Penelitian — DisasterDetect',
  description: 'Informasi tentang penelitian perbandingan CNN Kustom, VGG16, dan ResNet50 oleh mahasiswa Universitas Dian Nuswantoro untuk klasifikasi citra bencana (banjir dan kebakaran).',
};

export default function TentangPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background aurora glow layers */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 aurora-violet" style={{ opacity: 0.4 }} />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 20% 60%, rgba(79,110,247,0.12) 0%, transparent 55%)' }}
        />
      </div>

      <TentangPageContent />
    </main>
  );
}
