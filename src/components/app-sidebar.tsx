import { Home, Newspaper, FolderKanban, Mail, Activity, BarChart3, CircleUser, LogOut } from "lucide-react"
import { useSidebar, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

const items = [
  {
    title: "Início",
    url: "/",
    icon: Home,
    mobileOnly: true
  },
  {
    title: "Notícias",
    url: "/Notícias",
    icon: Newspaper,
    mobileOnly: true
  },
  {
    title: "Projetos",
    url: "/Projetos",
    icon: FolderKanban,
    mobileOnly: true
  },
  {
    title: "Contato",
    url: "/Contato",
    icon: Mail,
    mobileOnly: true
  },
  {
    title: "Atividades",
    url: "/Atividades",
    icon: Activity,
    roles: ["student", "teacher"]
  },
  {
    title: "Relatórios",
    url: "/Relatórios",
    icon: BarChart3,
    roles: ["student", "teacher"]
  },

]

export function AppSidebar() {
  const { role, logout } = useAuth();

  const { setOpenMobile, isMobile, setOpen } = useSidebar();

  const filteredItems = items.filter(item => {
    if (item.roles && !item.roles.includes(role)) {
      return false;
    }
    return true;
  });

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar variant="sidebar" className="border-r border-zinc-400 bg-zinc-900">
      <SidebarContent className="pt-16">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title} className={item.mobileOnly ? "md:hidden" : ""}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} onClick={handleLinkClick}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {(role === 'teacher' || role === 'student') && (<SidebarFooter className="p-2.5 border-t border-zinc-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-zinc-400 hover:text-white hover:bg-zinc-800">
              <Link to="/Profile">
                <CircleUser className="size-4" />
                <span>Meu Perfil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                if (isMobile) {
                  setOpenMobile(false);
                } else {
                  setOpen(false);
                }

                logout();
              }}
              className="text-red-400 hover:text-red-300 hover:bg-red-950/40 cursor-pointer"
            >
              <LogOut className="size-4" />
              <span>Sair da conta</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>)}
    </Sidebar>
  )
}