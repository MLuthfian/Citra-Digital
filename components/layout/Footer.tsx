import Link from 'next/link';
import { NAV_ITEMS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'linear-gradient(to bottom, var(--bg-base), #060912)',
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(79,110,247,0.35), rgba(124,92,252,0.35), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #4F6EF7 0%, #7C5CFC 100%)',
                  boxShadow: '0 2px 12px rgba(79,110,247,0.25)',
                }}
              >
                <span className="text-xs font-bold text-white">DD</span>
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                DisasterDetect
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-[220px]" style={{ color: 'var(--text-muted)' }}>
              Sistem klasifikasi citra bencana alam (banjir &amp; kebakaran) berbasis deep learning dengan CNN Kustom, VGG16, dan ResNet50.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
              Navigasi
            </p>
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Research info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
              Institusi
            </p>
            <div className="space-y-2">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Universitas Dian Nuswantoro
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Prodi Informatika · Fakultas Ilmu Komputer
              </p>
              <div className="flex gap-2 mt-4 flex-wrap">
                {['ResNet50', 'VGG16', 'CNN Kustom'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[10px] font-medium rounded-lg"
                    style={{
                      background: 'rgba(79,110,247,0.10)',
                      border: '1px solid rgba(79,110,247,0.20)',
                      color: 'rgba(150,180,255,0.70)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2024 Penelitian Deep Learning · Prodi Informatika
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Akurasi terbaik{' '}
            <span style={{ color: 'var(--accent-blue)' }}>92.08%</span>
            {' '}· CNN Kustom training from scratch
          </p>
        </div>
      </div>
    </footer>
  );
}
