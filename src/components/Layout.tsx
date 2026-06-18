import { Outlet } from "react-router-dom";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

function Layout() {
  const { role } = useAuth();

  return (
    <SidebarProvider defaultOpen={role === 'student' || role === 'teacher'}>
      <div className="flex flex-col w-screen min-h-screen bg-zinc-50/50">
        <Header />
        
        <div className="flex flex-1 w-full items-start">
          <AppSidebar />
          

          <main className="flex-1 overflow-hidden p-4">
            <Outlet />
          </main>
        </div>

        <Footer />
      </div>
    </SidebarProvider>
  );
}

export default Layout