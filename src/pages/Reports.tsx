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

                                <table className="min-w-full divide-y border border-zinc-200 border-collapse text-align-center divide-gray-200 bg-white dark:bg-zinc-900 text-sm">
                                    <thead className="border-bottom border-zinc-200">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-[rgba(44,44,44,.50)] font-segoe">Nome completo</th>
                                            <th className="px-4 py-3 text-left font-semibold  text-[rgba(44,44,44,.50)] font-segoe">Projeto</th>
                                            <th className="px-4 py-3 text-left font-semibold  text-[rgba(44,44,44,.50)] font-segoe">Data</th>
                                            <th className="px-4 py-3 text-right font-semibold text-[rgba(44,44,44,.50)] font-segoe">Entrada</th>
                                            <th className="px-4 py-3 text-right font-semibold text-[rgba(44,44,44,.50)] font-segoe">Saída</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                                        <tr className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors font-segoe">
                                            <td className="px-4 py-3 font-segoe">Ana Oliveira</td>
                                            <td className="px-4 py-3 font-segoe">InovaEdu</td>
                                            <td className="px-4 py-3 font-segoe">01/02/2025</td>
                                            <td className="px-4 py-3 text-right font-segoe">13:30</td>
                                            <td className="px-4 py-3 text-right font-segoe">14:30</td>
                                        </tr>

                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5}> &nbsp;</td>
                                        </tr>
                                    </tfoot>
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