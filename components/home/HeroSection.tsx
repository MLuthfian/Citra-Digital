import Link from 'next/link';
import FloatingNode from './FloatingNode';
import { FLOATING_NODES } from '@/lib/constants';

export default function HeroSection() {
  const nodePositions = {
    resnet:    { x: 88, y: 20 },
    cnn:       { x: 9,  y: 25 },
    mobilenet: { x: 8,  y: 75 },
    f1:        { x: 90, y: 78 },
  };

  const connections = [
    ['resnet', 'cnn'],
    ['cnn', 'mobilenet'],
    ['mobilenet', 'f1'],
    ['f1', 'resnet'],
    ['cnn', 'f1'],
    ['resnet', 'mobilenet'],
  ] as const;

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden dot-grid">

      {/* Aurora background layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 aurora-blue" />
        <div className="absolute inset-0 aurora-violet" />
        <div className="absolute inset-0 aurora-cyan" />
        {/* Center radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(8,11,20,0.7) 100%)',
          }}
        />
      </div>

      {/* SVG connector lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F6EF7" stopOpacity="0" />
            <stop offset="50%" stopColor="#4F6EF7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7C5CFC" stopOpacity="0" />
          </linearGradient>
        </defs>
        {connections.map(([a, b], i) => (
          <line
            key={i}
            x1={`${nodePositions[a].x}%`}
            y1={`${nodePositions[a].y}%`}
            x2={`${nodePositions[b].x}%`}
            y2={`${nodePositions[b].y}%`}
            stroke="url(#lineGrad)"
            strokeOpacity="1"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Floating Nodes */}
      {FLOATING_NODES.map((node) => (
        <FloatingNode
          key={node.id}
          label={node.label}
          value={node.value}
          position={node.position as React.CSSProperties}
          delay={node.delay}
        />
      ))}

      {/* Center Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 hero-fade-in">

        {/* Badge pill */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
          style={{
            background: 'rgba(79,110,247,0.10)',
            border: '1px solid rgba(79,110,247,0.25)',
            color: 'rgba(160,190,255,0.85)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full pulse-glow"
            style={{ background: 'var(--accent-blue)' }}
          />
          Penelitian Deep Learning · Universitas Dian Nuswantoro
          <span style={{ color: 'rgba(100,130,255,0.50)' }}>→</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
          <span style={{ color: 'var(--text-primary)' }}>Klasifikasi Citra</span>
          <br />
          <span className="text-gradient">Banjir &amp; Kebakaran</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          Perbandingan performa model CNN Kustom, VGG16, dan ResNet50 dengan transfer learning
          untuk klasifikasi citra bencana secara otomatis.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/upload"
            id="hero-cta-upload"
            className="btn-gradient flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M7.5 1.5v9M4 7l3.5 3.5L11 7M2 13h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Upload Citra
          </Link>
          <Link
            href="/model-comparison"
            id="hero-cta-comparison"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-[rgba(79,110,247,0.08)]"
            style={{
              border: '1px solid rgba(100,130,255,0.22)',
              color: 'var(--text-secondary)',
            }}
          >
            Lihat Perbandingan Model
            <span style={{ color: 'var(--accent-blue)' }}>→</span>
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8">
          {[
            { value: '92.08%', label: 'Akurasi Terbaik' },
            { value: '3', label: 'Model Dibandingkan' },
            { value: '240', label: 'Total Data Uji' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-2xl font-bold tabular-nums"
                style={{ color: 'var(--text-primary)' }}
              >
                {stat.value}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-8 flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ border: '1px solid var(--border-default)', background: 'rgba(79,110,247,0.06)' }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M5 1.5v7M2 6l3 3 3-3" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-[10px] font-medium tracking-widest" style={{ color: 'var(--text-muted)' }}>
          01/04 · SCROLL
        </span>
      </div>

      {/* Brand label */}
      <div className="absolute bottom-8 right-8 flex items-center gap-3">
        <div className="h-px w-6" style={{ background: 'var(--border-bright)' }} />
        <span className="text-[10px] font-medium tracking-wider" style={{ color: 'var(--text-muted)' }}>
          AI HORIZONS
        </span>
      </div>
    </section>
  );
}
