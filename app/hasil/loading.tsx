export default function HasilLoading() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="h-8 bg-white/[0.06] rounded-lg w-48" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-28 bg-white/[0.04] rounded-2xl border border-white/[0.06]" />
          ))}
        </div>
        <div className="h-64 bg-white/[0.02] rounded-2xl border border-white/[0.06]" />
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="h-20 bg-white/[0.04] rounded-2xl border border-white/[0.06]" />
          ))}
        </div>
      </div>
    </main>
  );
}
