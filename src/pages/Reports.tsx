import Header from '../components/Header.tsx'
import Footer from '../components/Footer.tsx'
import { SidebarProvider } from "../components/ui/sidebar.tsx"
import { AppSidebar } from "../components/app-sidebar.tsx"


function Reports() {
    return (
        <>
            <SidebarProvider>
                <div className="flex flex-col w-screen min-h-screen ">
                    <Header />
                    <div className="flex flex-1 w-full">
                        <AppSidebar />

                        <main className="p-4 flex-1">
                            <h1 className="text-4xl font-bold overflow-hidden">Relatórios</h1>
                            <section className='mt-4'>

                                <table className="min-w-full divide-y border border-zinc-200 divide-gray-200 bg-white dark:bg-zinc-900 text-sm">
                                    <thead className="bg-gray-50 dark:bg-zinc-800/50">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">Nome completo</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">Projeto'</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">Data</th>
                                            <th className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-zinc-200">Entrada</th>
                                            <th className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-zinc-200">Saída</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                                        <tr className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">Ana Oliveira</td>
                                            <td className="px-4 py-3">InovaEdu</td>
                                            <td className="px-4 py-3">01/02/2025</td>
                                            <td className="px-4 py-3 text-right">13:30</td>
                                            <td className="px-4 py-3 text-right">14:30</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </section>
                        </main>
                    </div>
                </div>
            </SidebarProvider>
            <Footer />
        </>
    )
}

export default Reports