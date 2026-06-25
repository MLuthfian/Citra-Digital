export default function UploadLoading() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6 animate-pulse">
        <div className="h-6 bg-white/[0.06] rounded-lg w-48" />
        <div className="h-10 bg-white/[0.06] rounded-xl w-3/4" />
        <div className="h-56 bg-white/[0.04] rounded-2xl border border-white/[0.06]" />
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-white/[0.04] rounded-2xl border border-white/[0.06]" />
          ))}
        </div>
        <div className="h-14 bg-white/[0.06] rounded-2xl" />
      </div>
    </main>
  );
}
