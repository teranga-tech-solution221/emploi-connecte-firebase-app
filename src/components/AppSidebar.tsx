
import React from "react";
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
  useSidebar
} from "@/components/ui/sidebar";
import { 
  Home, 
  Settings, 
  Bell, 
  Search, 
  LogOut,
  FileText
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "@/hooks/useThemeMode";
import { Sun, Moon } from "lucide-react";

const menuItems = [
  { title: "Tableau de bord", icon: Home, path: "/dashboard" },
  { title: "Candidatures", icon: FileText, path: "/applications" },
  { title: "Notifications", icon: Bell, path: "/notifications" },
  { title: "Paramètres", icon: Settings, path: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setThemeMode } = useThemeMode();
  const { expanded } = useSidebar();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  const isDark = theme === "dark";

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="pb-0">
        <div className="flex items-center px-4 py-3">
          <div className="flex-1 flex items-center space-x-2">
            <div className="bg-blue-500/10 p-1 rounded">
              <Home className="h-6 w-6 text-blue-500" />
            </div>
            <span className={`text-sm font-bold ${isDark ? 'text-blue-50' : 'text-gray-900'}`}>
              {expanded ? "Jokko Liguey" : "JL"}
            </span>
          </div>
          <button
            aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-accent transition-colors"
            onClick={() => setThemeMode(isDark ? "light" : "dark")}
            type="button"
          >
            {isDark ? (
              <Sun size={22} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </button>
        </div>
        {expanded && (
          <div className="px-3 pb-2">
            <SidebarInput placeholder="Rechercher..." />
          </div>
        )}
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
                      {expanded && <span>{item.title}</span>}
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
          {expanded ? (
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
          ) : (
            <div className="flex justify-center mb-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src={currentUser?.photoURL || ""} alt="Photo de profil" />
                <AvatarFallback>{getInitials(currentUser?.displayName)}</AvatarFallback>
              </Avatar>
            </div>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className={`w-full ${expanded ? 'justify-start gap-2' : 'justify-center'}`}
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {expanded && <span>Se déconnecter</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
