export function ProjetosSkeleton() {
  return (
    <main className="animate-pulse">
      <div className="h-9 w-40 bg-zinc-200 rounded-md"></div>

      <div className="mt-4">
        <div className="h-10 w-36 bg-zinc-200 rounded-lg"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-zinc-200 flex flex-col justify-between h-[180px]">
            <div>
              <div className="h-5 w-3/4 bg-zinc-200 rounded mb-3"></div>

              <div className="flex items-center gap-2 mb-3">
                <div className="h-4 w-16 bg-zinc-200 rounded"></div>
                <div className="h-4 w-4 bg-zinc-200 rounded-full"></div>
                <div className="h-4 w-12 bg-zinc-200 rounded"></div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-zinc-200 rounded"></div>
                <div className="h-4 w-32 bg-zinc-200 rounded"></div>
              </div>
            </div>

            <div className="flex justify-center items-center mt-6 pt-4 border-zinc-100">
              <div className="h-4 w-36 bg-zinc-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}