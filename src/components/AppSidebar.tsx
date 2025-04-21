
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
} from "@/components/ui/sidebar"
import { 
  Home, 
  User, 
  Settings, 
  MessageSquare, 
  Bell, 
  Search, 
  LogOut,
  FileText
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const menuItems = [
  { title: "Tableau de bord", icon: Home, path: "/dashboard" },
  { title: "Profil", icon: User, path: "/profile" },
  { title: "Messages", icon: MessageSquare, path: "/messages" },
  { title: "Notifications", icon: Bell, path: "/notifications" },
  { title: "Candidatures", icon: FileText, path: "/applications" },
  { title: "Paramètres", icon: Settings, path: "/settings" },
]

export function AppSidebar() {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="pb-0">
        <div className="flex items-center px-4 py-3">
          <div className="flex-1 flex items-center gap-2">
            <div className="bg-primary/10 p-1 rounded">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <span className="font-semibold text-xl">FABUS</span>
          </div>
        </div>
        <div className="px-3 pb-2">
          <SidebarInput placeholder="Rechercher..." />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.path}
                    tooltip={item.title}
                  >
                    <Link to={item.path} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-2">
          <div className="flex items-center gap-3 mb-2 p-2 rounded-md hover:bg-accent transition-colors">
            <Avatar className="h-9 w-9">
              <AvatarImage src={currentUser?.photoURL || ""} alt="Photo de profil" />
              <AvatarFallback>{getInitials(currentUser?.displayName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{currentUser?.displayName || "Utilisateur"}</p>
              <p className="text-xs text-muted-foreground truncate">{currentUser?.email}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start gap-2" 
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" /> Se déconnecter
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
