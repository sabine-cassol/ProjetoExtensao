import { Outlet } from "react-router-dom";
import { SidebarProvider} from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/sonner"
import { useAuth } from "@/context/AuthContext";

function Layout() {
  const { role } = useAuth();

  return (
    <SidebarProvider key={role} defaultOpen={false}>
      <div className="flex flex-col w-full min-h-dvh bg-zinc-50/50">
        <Header />

        <div className="flex flex-1 w-full items-start">
          <AppSidebar />


          <main className="flex-1 overflow-hidden p-4">
    
            <Outlet />
          </main>
          <Toaster
            className='z-999'
            position="bottom-right"
            toastOptions={{
              classNames: {
                // Configuração global para todos os toasts (suaviza a borda padrão)
                toast: 'bg-white border border-slate-100 shadow-sm',
                title: 'text-slate-950 font-semibold',
                description: '!text-slate-500 font-normal',

                // Customizações por tipo (ajustado de 'warning' para 'error')
                success: 'bg-white border-green-100 group success',
                error: 'bg-white border-red-100 group error', 

                // Seletores baseados nos grupos acima
                icon: 'group-[.success]:text-green-500 group-[.error]:text-red-500',
              },
            }}
          />
        </div>

        <Footer />
      </div>
    </SidebarProvider>
  );
}

export default Layout