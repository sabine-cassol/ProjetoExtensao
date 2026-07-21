export function NoticiaDetalhesSkeleton() {
    return (
        <main className="flex-1 bg-zinc-50/50 animate-pulse">

            <div className="h-5 w-40 bg-zinc-200 rounded-md mb-6"></div>

            <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 rounded-xl shadow-xs">


                <div className="space-y-2 mb-4">
                    <div className="h-9 w-11/12 bg-zinc-200 rounded-md"></div>
                    <div className="h-9 w-2/3 bg-zinc-200 rounded-md"></div>
                </div>

                <div className="flex items-center gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-zinc-200 rounded-full"></div>
                        <div className="h-4 w-32 bg-zinc-200 rounded"></div>
                    </div>
                    <div className="h-4 w-2 bg-zinc-200 rounded"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-zinc-200 rounded-full"></div>
                        <div className="h-4 w-24 bg-zinc-200 rounded"></div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-neutral-100 rounded-sm">
                    <div className="h-4 w-full bg-zinc-200 rounded mb-2"></div>
                    <div className="h-4 w-3/4 bg-zinc-200 rounded"></div>
                </div>

                <div className="mt-8 space-y-3">
                    <div className="h-4 w-full bg-zinc-200 rounded"></div>
                    <div className="h-4 w-full bg-zinc-200 rounded"></div>
                    <div className="h-4 w-11/12 bg-zinc-200 rounded"></div>
                    <div className="h-4 w-4/5 bg-zinc-200 rounded"></div>
                    <div className="h-4 w-full bg-zinc-200 rounded"></div>
                </div>

                <div className="mx-auto mt-8 max-w-2xl h-80 bg-zinc-200 rounded-xl border-2 border-zinc-300"></div>

            </article>
        </main>
    );
}