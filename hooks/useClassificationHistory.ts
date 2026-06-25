'use client';

import { useState, useEffect, useCallback } from 'react';
import { ClassificationResult } from '@/types';

export interface HistoryEntry extends ClassificationResult {
  id: string;
  timestamp: number;
  fileName: string;
  filePreview: string; // base64 data URL
}

const STORAGE_KEY = 'disaster_detect_history';
const MAX_ENTRIES = 20;

export function useClassificationHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as HistoryEntry[];
        setHistory(parsed);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const addEntry = useCallback(
    (result: ClassificationResult, file: File, preview: string) => {
      const entry: HistoryEntry = {
        ...result,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: Date.now(),
        fileName: file.name,
        filePreview: preview,
      };

      setHistory((prev) => {
        const updated = [entry, ...prev].slice(0, MAX_ENTRIES);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // storage full — try without preview thumbnails
          const slim = updated.map((e) => ({ ...e, filePreview: '' }));
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(slim)); } catch { /* */ }
        }
        return updated;
      });
    },
    []
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch { /* */ }
      return updated;
    });
  }, []);

  return { history, addEntry, clearHistory, removeEntry };
}
