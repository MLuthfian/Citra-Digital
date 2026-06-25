'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, FileImage } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropZoneProps {
  onFile: (file: File) => void;
  file: File | null;
  preview: string; // base64 data URL managed by parent
  onClear: () => void;
}

export default function DropZone({ onFile, file, preview, onClear }: DropZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    if (!f) return;
    onFile(f);
  }, [onFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  if (file && preview) {
    return (
      <div
        className="relative rounded-2xl overflow-hidden group"
        style={{ border: '1px solid var(--border-default)' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview} alt="Preview" className="w-full h-56 object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,11,20,0.90) 0%, rgba(8,11,20,0.20) 50%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileImage size={15} style={{ color: 'var(--text-muted)' }} />
            <div>
              <p className="text-sm font-medium text-white truncate max-w-[200px]">{file.name}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{(file.size / 1024).toFixed(0)} KB</p>
            </div>
          </div>
          <button
            onClick={onClear}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: 'rgba(79,110,247,0.10)',
              border: '1px solid rgba(79,110,247,0.20)',
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.20)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(79,110,247,0.10)'; }}
            aria-label="Hapus gambar"
          >
            <X size={13} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative rounded-2xl border-2 border-dashed cursor-pointer p-10 flex flex-col items-center justify-center gap-4 min-h-[220px] transition-all duration-200'
      )}
      style={{
        borderColor: isDragActive ? 'rgba(79,110,247,0.60)' : 'rgba(79,110,247,0.18)',
        background: isDragActive ? 'rgba(79,110,247,0.06)' : 'rgba(13,17,32,0.40)',
      }}
    >
      <input {...getInputProps()} />
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200"
        style={{
          background: isDragActive ? 'rgba(79,110,247,0.18)' : 'rgba(79,110,247,0.08)',
          border: '1px solid rgba(79,110,247,0.20)',
          boxShadow: isDragActive ? '0 0 24px rgba(79,110,247,0.20)' : 'none',
        }}
      >
        <UploadCloud
          size={24}
          style={{ color: isDragActive ? 'var(--accent-blue)' : 'var(--text-muted)' }}
        />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
          {isDragActive ? 'Lepaskan file di sini' : 'Seret foto bencana ke sini'}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          atau klik untuk memilih file (JPG, PNG, WEBP — maks 10MB)
        </p>
      </div>
    </div>
  );
}
