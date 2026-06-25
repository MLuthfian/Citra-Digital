import { MODEL_METRICS, MODEL_COLORS } from '@/lib/constants';
import Badge from '@/components/ui/Badge';

export default function MetricsTable() {
  const best = MODEL_METRICS.find((m) => m.best);

  const topMetrics = [
    { label: 'Best Accuracy', value: `${best?.accuracy.toFixed(2)}%`, model: best?.name },
    { label: 'Best Precision', value: `${(best?.precision! * 100).toFixed(2)}%`, model: best?.name },
    { label: 'Best Recall', value: `${(best?.recall! * 100).toFixed(2)}%`, model: best?.name },
    { label: 'Best F1-Score', value: `${(best?.f1! * 100).toFixed(2)}%`, model: best?.name },
  ];

  return (
    <div className="space-y-8">
      {/* Top metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {topMetrics.map((m, i) => (
          <div
            key={m.label}
            className="rounded-2xl p-4"
            style={{
              background: i === 0
                ? 'linear-gradient(135deg, rgba(79,110,247,0.12) 0%, rgba(124,92,252,0.08) 100%)'
                : 'rgba(79,110,247,0.06)',
              border: `1px solid rgba(79,110,247,${i === 0 ? 0.30 : 0.14})`,
            }}
          >
            <p className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
              {m.label}
            </p>
            <p
              className="text-2xl font-bold tabular-nums mb-1.5"
              style={{ color: i === 0 ? 'var(--accent-blue)' : 'var(--text-primary)' }}
            >
              {m.value}
            </p>
            <Badge variant="best">{m.model}</Badge>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div
        className="overflow-x-auto rounded-2xl"
        style={{ border: '1px solid var(--border-default)' }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-default)', background: 'rgba(13,17,32,0.60)' }}>
              {['Model', 'Accuracy', 'Precision', 'Recall', 'F1-Score'].map((h, i) => (
                <th
                  key={h}
                  className={`py-3.5 text-xs font-semibold uppercase tracking-wider ${i === 0 ? 'text-left px-5' : 'text-center px-5'}`}
                  style={{ color: 'var(--text-muted)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODEL_METRICS.map((model) => (
              <tr
                key={model.name}
                className="transition-colors duration-150"
                style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  borderLeft: model.best ? '2px solid rgba(79,110,247,0.60)' : '2px solid transparent',
                  background: model.best ? 'rgba(79,110,247,0.04)' : 'transparent',
                }}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: MODEL_COLORS[model.name], boxShadow: `0 0 6px ${MODEL_COLORS[model.name]}` }}
                    />
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{model.name}</span>
                    {model.best && <Badge variant="best" className="text-[10px]">Terbaik</Badge>}
                  </div>
                  <p className="text-xs mt-0.5 pl-[18px]" style={{ color: 'var(--text-muted)' }}>{model.type}</p>
                </td>
                <td className="px-5 py-4 text-center">
                  <span
                    className="font-semibold tabular-nums"
                    style={{ color: model.best ? 'var(--accent-blue)' : 'var(--text-secondary)' }}
                  >
                    {model.accuracy.toFixed(2)}%
                  </span>
                </td>
                <td className="px-5 py-4 text-center tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                  {(model.precision * 100).toFixed(2)}%
                </td>
                <td className="px-5 py-4 text-center tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                  {(model.recall * 100).toFixed(2)}%
                </td>
                <td className="px-5 py-4 text-center tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                  {(model.f1 * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar chart */}
      <div className="space-y-6">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Perbandingan Visual</h3>
        {(['accuracy', 'precision', 'recall', 'f1'] as const).map((metric) => (
          <div key={metric} className="space-y-2.5">
            <p className="text-xs font-medium capitalize" style={{ color: 'var(--text-muted)' }}>
              {metric === 'accuracy' ? 'Accuracy' : metric === 'f1' ? 'F1-Score' : metric.charAt(0).toUpperCase() + metric.slice(1)}
            </p>
            {MODEL_METRICS.map((model) => {
              const val = metric === 'accuracy' ? model.accuracy : model[metric] * 100;
              return (
                <div key={model.name} className="flex items-center gap-3">
                  <span className="text-xs w-24 flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                    {model.name}
                  </span>
                  <div
                    className="flex-1 h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'rgba(100,130,255,0.08)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700 animate-progress"
                      style={{
                        width: `${val}%`,
                        backgroundColor: MODEL_COLORS[model.name],
                        boxShadow: `0 0 8px ${MODEL_COLORS[model.name]}60`,
                      }}
                    />
                  </div>
                  <span
                    className="text-xs w-14 text-right tabular-nums font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {val.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
