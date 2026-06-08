import { Home, Newspaper, FolderKanban, Mail, Activity, BarChart3 } from "lucide-react"
import { Sidebar,SidebarContent,SidebarGroup,SidebarGroupContent,SidebarMenu,SidebarMenuButton,SidebarMenuItem} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

const items = [
  { 
    title: "Início", 
    url: "#", 
    icon: Home 
  },
  { 
    title: "Notícias", 
    url: "#", 
    icon: Newspaper 
  },
  { 
    title: "Projetos", 
    url: "#", 
    icon: FolderKanban 
  },
  { 
    title: "Contato", 
    url: "#", 
    icon: Mail 
  },
  { 
    title: "Atividades", 
    url: "#", 
    icon: Activity 
  },
  { 
    title: "Relatórios", 
    url: "#", 
    icon: BarChart3 
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar"className="pt-16 bg-zinc-900">
      <SidebarContent>
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