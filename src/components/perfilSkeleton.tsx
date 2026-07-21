export function PerfilSkeleton() {
  return (
    <section className="flex-1 flex text-center justify-center items-center animate-pulse">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 border border-zinc-300">
        <div className="space-y-6">
          
          <div>
            <div className="h-8 w-40 bg-zinc-200 rounded-md mx-auto mb-2"></div>
            <div className="h-4 w-64 bg-zinc-200 rounded-md mx-auto"></div>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex flex-col p-4 gap-4">
              
              <div>
                <div className="h-4 w-28 bg-zinc-200 rounded"></div>
                <div className="h-10 w-full bg-zinc-200 rounded-md mt-2"></div>
              </div>

              <div>
                <div className="h-4 w-16 bg-zinc-200 rounded"></div>
                <div className="h-10 w-full bg-zinc-200 rounded-md mt-2"></div>
              </div>

              <div>
                <div className="h-4 w-12 bg-zinc-200 rounded"></div>
                <div className="h-10 w-full bg-zinc-200 rounded-md mt-2"></div>
              </div>

              <div>
                <div className="h-4 w-20 bg-zinc-200 rounded"></div>
                <div className="h-10 w-full bg-zinc-200 rounded-md mt-2"></div>
              </div>

              <div>
                <div className="h-4 w-20 bg-zinc-200 rounded"></div>
                <div className="h-10 w-full bg-zinc-200 rounded-md mt-2"></div>
              </div>

            </div>

            <div className="flex justify-center px-4">
              <div className="h-10 w-44 bg-zinc-200 rounded-md"></div>
            </div>

            <div className="flex flex-col p-4 gap-3 pt-6 border-t border-zinc-100">
              <div>
                <div className="h-6 w-36 bg-zinc-200 rounded mb-1"></div>
                <div className="h-3 w-72 bg-zinc-200 rounded"></div>
              </div>

              <div>
                <div className="h-4 w-36 bg-zinc-200 rounded"></div>
                <div className="h-10 w-full bg-zinc-200 rounded-md mt-2"></div>
              </div>

              <div className="mt-2">
                <div className="h-4 w-44 bg-zinc-200 rounded"></div>
                <div className="h-10 w-full bg-zinc-200 rounded-md mt-2"></div>
              </div>

              <div className="flex justify-center mt-4">
                <div className="h-10 w-48 bg-zinc-200 rounded-md"></div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}