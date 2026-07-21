export function AtividadesSkeleton() {
  return (
    <section className="mt-6 animate-pulse">
      <div className="h-6 w-28 bg-zinc-200 rounded mb-3"></div>

      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="min-w-full border border-gray-200 p-4 bg-white shadow-sm">

            <div className="flex items-start justify-between mb-2">
              <div className="h-5 w-1/2 bg-zinc-200 rounded"></div>
              <div className="h-7 w-14 bg-zinc-200 rounded-sm"></div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className="h-3.5 w-8 bg-zinc-200 rounded"></div>
              <div className="h-3 w-1 bg-zinc-200 rounded"></div>
              <div className="h-3.5 w-20 bg-zinc-200 rounded"></div>
            </div>

            <div className="space-y-1.5">
              <div className="h-4 w-full bg-zinc-200 rounded"></div>
              <div className="h-4 w-3/4 bg-zinc-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}