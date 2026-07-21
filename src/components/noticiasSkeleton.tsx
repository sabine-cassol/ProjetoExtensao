export function NoticiasSkeleton() {
  return (
    <main className="flex-1 bg-zinc-50/50 animate-pulse">
      <div className="min-h-full">
        <div className="w-full mx-auto">
          <div className="h-9 w-60 bg-zinc-200 rounded-md mb-2"></div>
          <div className="h-4 w-80 bg-zinc-200 rounded-md mb-8"></div>

          <div className="grid gap-6 mt-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <article
                key={index}
                className="bg-white p-6 rounded-lg border border-zinc-200 flex flex-col justify-between"
              >
                <div className="flex items-center">
                  <div className="w-24 h-24 bg-zinc-200 rounded-xl mr-4 shrink-0"></div>

                  <div className="w-full">
                    {/* Título */}
                    <div className="h-6 w-3/4 bg-zinc-200 rounded mb-2"></div>
                    <div className="h-3 w-24 bg-zinc-200 rounded mb-3"></div>
                    <div className="space-y-1.5">
                      <div className="h-4 w-full bg-zinc-200 rounded"></div>
                      <div className="h-4 w-4/5 bg-zinc-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-8 pt-6">
            <div className="h-9 w-20 bg-zinc-200 rounded-lg"></div>
            <div className="flex gap-1">
              <div className="w-9 h-9 bg-zinc-200 rounded-md"></div>
              <div className="w-9 h-9 bg-zinc-200 rounded-md"></div>
              <div className="w-9 h-9 bg-zinc-200 rounded-md"></div>
            </div>
            <div className="h-9 w-20 bg-zinc-200 rounded-lg"></div>
          </div>

        </div>
      </div>
    </main>
  );
}