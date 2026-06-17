import { Home, Newspaper, FolderKanban, Mail, Activity, BarChart3 } from "lucide-react"
import { Sidebar,SidebarContent,SidebarGroup,SidebarGroupContent,SidebarMenu,SidebarMenuButton,SidebarMenuItem} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

const items = [
  { 
    title: "Início", 
    url: "/", 
    icon: Home 
  },
  { 
    title: "Notícias", 
    url: "/Notícias", 
    icon: Newspaper 
  },
  { 
    title: "Projetos", 
    url: "/Projetos", 
    icon: FolderKanban 
  },
  { 
    title: "Contato", 
    url: "/Contato", 
    icon: Mail 
  },
  { 
    title: "Atividades", 
    url: "/Atividades", 
    icon: Activity 
  },
  { 
    title: "Relatórios", 
    url: "/Relatórios", 
    icon: BarChart3 
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar"className=" bg-zinc-900">
      <SidebarContent className="pt-16">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
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
    </Sidebar>
  )
}