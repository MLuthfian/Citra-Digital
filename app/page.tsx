import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import LogoBar from '@/components/home/LogoBar';

export const metadata: Metadata = {
  title: 'DisasterDetect — Klasifikasi Citra Bencana Berbasis Deep Learning',
  description:
    'Sistem klasifikasi citra bencana alam (banjir dan kebakaran) menggunakan CNN Kustom, VGG16, dan ResNet50. Penelitian Universitas Dian Nuswantoro.',
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <LogoBar />
    </main>
  );
}
