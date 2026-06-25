'use client';

import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
}

interface TabGroupProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function TabGroup({ tabs, activeTab, onChange, className }: TabGroupProps) {
  return (
    <div className={cn('flex gap-1 p-1 rounded-xl border border-[rgba(100,130,255,0.12)] bg-[#0D1120]', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap',
            activeTab === tab.id
              ? 'btn-gradient text-white shadow-sm'
              : 'text-[rgba(150,170,220,0.50)] hover:text-white/80 hover:bg-[rgba(79,110,247,0.06)]'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
