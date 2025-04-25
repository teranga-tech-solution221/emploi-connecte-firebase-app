
import React from "react";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, MessageSquare, User, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    id: 1,
    title: "Interview Scheduled",
    description: "You have an interview scheduled with Tech Solutions Inc. on Monday at 2:00 PM.",
    time: "1 hour ago",
    icon: Calendar,
    read: false,
    actionLabel: "View Details",
  },
  {
    id: 2,
    title: "New Message",
    description: "Sarah Johnson from Digital Innovations sent you a message.",
    time: "3 hours ago",
    icon: MessageSquare,
    read: false,
    actionLabel: "Read Message",
  },
  {
    id: 3,
    title: "Application Viewed",
    description: "Your application to Software Developer position at Global Systems has been viewed.",
    time: "Yesterday",
    icon: FileText,
    read: true,
    actionLabel: "View Application",
  },
  {
    id: 4,
    title: "Profile Update Reminder",
    description: "Your profile is 80% complete. Add more information to increase your chances of being noticed.",
    time: "2 days ago",
    icon: User,
    read: true,
    actionLabel: "Update Profile",
  },
  {
    id: 5,
    title: "Job Matching Your Skills",
    description: "We found 3 new jobs that match your skills and preferences.",
    time: "3 days ago",
    icon: Bell,
    read: true,
    actionLabel: "View Jobs",
  },
];

const Notifications = () => {
  const { expanded } = useSidebar();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div 
          className={`flex-1 transition-all duration-300 ${
            expanded ? "ml-64" : "ml-[70px]"
          }`}
        >
          {/* Header */}
          <header className="shadow-sm border-b bg-background">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
              </div>
              <Button variant="outline" size="sm">
                Mark all as read
              </Button>
            </div>
          </header>

          {/* Main content */}
          <main className="p-4 sm:p-6 lg:p-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-0">
                {notifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <div className={`py-4 ${!notification.read ? 'bg-accent/20' : ''}`}>
                      <div className="flex gap-4">
                        <div className={`rounded-full p-2 ${!notification.read ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          <notification.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <h4 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          <Button variant="link" className="px-0 h-auto py-1 text-primary font-normal">
                            {notification.actionLabel}
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < notifications.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Notifications;
