interface ReportsSkeletonProps {
  role?: 'teacher' | 'student';
  qtdCards?: number;
}

export function ReportsSkeleton({ role = 'teacher', qtdCards = 3 }: ReportsSkeletonProps) {
  return (
    <div className="animate-pulse space-y-4 w-full">
      {role === 'teacher' && (
        <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full">
          <div className="h-9 bg-zinc-200 rounded-md flex-1 w-full sm:w-auto" />
          <div className="h-9 bg-zinc-200 rounded-md flex-1 w-full sm:w-auto" />
          <div className="h-9 bg-zinc-200 rounded-md flex-1 w-full sm:w-auto" />
        </div>
      )}

      {Array.from({ length: qtdCards }).map((_, idx) => (
        <div key={idx} className="w-full rounded-xl border border-zinc-200 p-4 sm:p-5 bg-white shadow-xs">
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[1.5fr_1fr_1.2fr_0.8fr_1.5fr_1fr_0.8fr_0.8fr_auto] lg:items-center">
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:contents gap-3 pb-3 lg:pb-0 border-b lg:border-none border-zinc-100">
              <div className="col-span-2 sm:col-span-1 lg:col-span-1 space-y-2">
                <div className="h-3 w-20 bg-zinc-200 rounded-xs" />
                <div className="h-4 w-32 bg-zinc-200 rounded-xs" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-10 bg-zinc-200 rounded-xs" />
                <div className="h-4 w-16 bg-zinc-200 rounded-xs" />
              </div>

              {role === 'teacher' && (
                <>
                  <div className="space-y-2">
                    <div className="h-3 w-14 bg-zinc-200 rounded-xs" />
                    <div className="h-4 w-28 bg-zinc-200 rounded-xs" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-12 bg-zinc-200 rounded-xs" />
                    <div className="h-4 w-8 bg-zinc-200 rounded-xs" />
                  </div>
                </>
              )}

              <div className="col-span-2 sm:col-span-1 lg:col-span-1 space-y-2">
                <div className="h-3 w-16 bg-zinc-200 rounded-xs" />
                <div className="h-4 w-24 bg-zinc-200 rounded-xs" />
              </div>
            </div>

            <div className="grid grid-cols-3 lg:contents gap-2 pb-3 lg:pb-0 border-b lg:border-none border-zinc-100">
              <div className="space-y-2">
                <div className="h-3 w-12 bg-zinc-200 rounded-xs" />
                <div className="h-4 w-20 bg-zinc-200 rounded-xs" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-14 bg-zinc-200 rounded-xs" />
                <div className="h-4 w-16 bg-zinc-200 rounded-xs" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-12 bg-zinc-200 rounded-xs" />
                <div className="h-4 w-16 bg-zinc-200 rounded-xs" />
              </div>
            </div>

            <div className="flex items-center justify-between lg:justify-end gap-2 pt-1 lg:pt-0">
              <div className="h-3 w-16 bg-zinc-200 rounded-xs lg:hidden" />
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-zinc-200 rounded-lg shrink-0" />
                <div className="h-10 w-10 bg-zinc-200 rounded-lg shrink-0" />
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}