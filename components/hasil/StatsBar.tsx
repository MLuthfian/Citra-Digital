import { Database, BarChart2, Layers, Clock } from 'lucide-react';

const STATS = [
  { label: 'Total Model Diuji', value: '3', icon: Layers, suffix: '', color: '#4F6EF7', glow: 'rgba(79, 110, 247, 0.15)' },
  { label: 'Akurasi Tertinggi', value: '98.63', icon: BarChart2, suffix: '%', color: '#7C5CFC', glow: 'rgba(124, 92, 252, 0.15)' },
  { label: 'Dataset', value: 'Kaggle', icon: Database, suffix: '', color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.15)' },
  { label: 'Total Epoch Training', value: '20', icon: Clock, suffix: ' epoch', color: '#4F6EF7', glow: 'rgba(79, 110, 247, 0.15)' },
];

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="glass-panel rounded-2xl p-5 flex flex-col gap-3 hover:border-[rgba(100,130,255,0.25)] transition-all duration-300 group relative overflow-hidden"
          >
            {/* Hover card glow */}
            <div 
              className="absolute -right-10 -bottom-10 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: stat.color }}
            />
            
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
              style={{ 
                backgroundColor: stat.glow,
                borderColor: stat.color === '#4F6EF7' 
                  ? 'rgba(79, 110, 247, 0.25)' 
                  : stat.color === '#7C5CFC' 
                  ? 'rgba(124, 92, 252, 0.25)' 
                  : 'rgba(56, 189, 248, 0.25)' 
              }}
            >
              <Icon size={18} style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white tracking-tight">
                {stat.value}
                <span className="text-white/45 text-sm font-normal ml-0.5">{stat.suffix}</span>
              </p>
              <p className="text-xs text-[#96AADC]/60 mt-1 font-medium tracking-wide">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
