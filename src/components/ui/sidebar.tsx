
import React, { createContext, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLocation } from "react-router-dom";

// Types
type SidebarContextProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  toggleExpanded: () => void;
};

// Context
const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

// Store sidebar state in localStorage to persist across page navigation
const getInitialExpandedState = (): boolean => {
  const savedState = localStorage.getItem('sidebarExpanded');
  return savedState !== null ? JSON.parse(savedState) : true;
};

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar doit être utilisé à l'intérieur d'un SidebarProvider");
  }
  return context;
}

// Provider
export function SidebarProvider({
  children,
  defaultExpanded = true,
}: {
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(getInitialExpandedState);
  const location = useLocation();

  // Save to localStorage whenever expanded state changes
  useEffect(() => {
    localStorage.setItem('sidebarExpanded', JSON.stringify(expanded));
  }, [expanded]);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded, toggleExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Composants
export function SidebarTrigger({ className }: { className?: string }) {
  const { toggleExpanded } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-9 w-9", className)}
      onClick={toggleExpanded}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Ouvrir/Fermer le menu</span>
    </Button>
  );
}

export function Sidebar({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { expanded } = useSidebar();
  return (
    <aside
      className={cn(
        "h-screen bg-background fixed top-0 left-0 z-40 transition-width duration-300",
        expanded ? "w-64" : "w-[70px]",
        className
      )}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <header className={cn("shrink-0", className)}>
      {children}
    </header>
  );
}

export function SidebarContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex-1 overflow-auto p-3", className)}>
      {children}
    </div>
  );
}

export function SidebarFooter({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <footer className={cn("shrink-0 mt-auto", className)}>
      {children}
    </footer>
  );
}

export function SidebarGroup({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

export function SidebarGroupLabel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { expanded } = useSidebar();
  return (
    <div
      className={cn(
        "text-xs font-medium text-muted-foreground mb-2 px-3",
        expanded ? "text-left" : "text-center",
        className
      )}
    >
      {expanded ? (
        children
      ) : (
        <span className="opacity-0 transition-opacity">{children}</span>
      )}
    </div>
  );
}

export function SidebarGroupContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      {children}
    </div>
  );
}

export function SidebarMenu({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {children}
    </nav>
  );
}

export function SidebarMenuItem({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
}

export function SidebarMenuButton({
  className,
  children,
  asChild,
  isActive,
  tooltip,
}: {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string;
}) {
  const { expanded } = useSidebar();
  const content = (
    <div
      className={cn(
        "w-full flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-accent text-accent-foreground"
          : "hover:bg-accent/50 hover:text-accent-foreground",
        !expanded && "justify-center px-0",
        className
      )}
    >
      {asChild ? children : <span>{children}</span>}
    </div>
  );

  if (!expanded && tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right">{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}

export function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  const { expanded } = useSidebar();
  return expanded ? (
    <div className="relative">
      <Input className={cn("pl-8", className)} {...props} />
    </div>
  ) : null;
}
