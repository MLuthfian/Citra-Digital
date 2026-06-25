'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b'
          : 'bg-transparent'
      )}
      style={scrolled ? {
        background: 'rgba(8,11,20,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderColor: 'var(--border-subtle)',
      } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="DisasterDetect home">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:shadow-[0_0_16px_rgba(79,110,247,0.40)]"
              style={{
                background: 'linear-gradient(135deg, #4F6EF7 0%, #7C5CFC 100%)',
                boxShadow: '0 2px 12px rgba(79,110,247,0.30)',
              }}
            >
              <span className="text-xs font-bold text-white tracking-tight">DD</span>
            </div>
            <span
              className="text-sm font-semibold tracking-tight transition-all duration-200"
              style={{ color: 'var(--text-primary)' }}
            >
              DisasterDetect
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-3 py-2 rounded-lg text-sm transition-all duration-200 font-medium',
                    isActive
                      ? 'text-white'
                      : 'hover:text-white hover:bg-[rgba(79,110,247,0.06)]'
                  )}
                  style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                      style={{ background: 'linear-gradient(90deg, #4F6EF7, #7C5CFC)' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/upload"
              id="nav-cta-mulai-analisis"
              className="btn-gradient flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-xl"
            >
              Mulai Analisis
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-[rgba(79,110,247,0.08)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ color: 'var(--text-secondary)' }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-b px-4 pb-4"
          style={{
            background: 'rgba(8,11,20,0.95)',
            backdropFilter: 'blur(20px)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block px-3 py-2.5 rounded-lg text-sm transition-colors font-medium mt-0.5',
                pathname === item.href
                  ? 'text-white bg-[rgba(79,110,247,0.12)]'
                  : 'hover:text-white hover:bg-[rgba(79,110,247,0.06)]'
              )}
              style={{ color: pathname === item.href ? 'var(--text-primary)' : 'var(--text-muted)' }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/upload"
            onClick={() => setMobileOpen(false)}
            className="mt-3 btn-gradient flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white rounded-xl"
          >
            Mulai Analisis ↗
          </Link>
        </div>
      )}
    </nav>
  );
}
