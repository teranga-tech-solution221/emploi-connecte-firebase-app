
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { 
  BarChart, 
  PieChart, 
  Calendar, 
  Building, 
  FileText, 
  Bell, 
  Clock, 
  User, 
  Briefcase, 
  PlusCircle,
  ArrowUpRight,
  ArrowRight
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Statistiques pour le dashboard
const stats = [
  { 
    title: "Applications", 
    count: 12, 
    change: "+3 this week", 
    trend: "up", 
    description: "Total job applications",
    icon: FileText 
  },
  { 
    title: "Interviews", 
    count: 4, 
    change: "+2 this week", 
    trend: "up", 
    description: "Scheduled interviews",
    icon: Calendar 
  },
  { 
    title: "Offers", 
    count: 1, 
    change: "+1 this month", 
    trend: "up", 
    description: "Job offers received",
    icon: Briefcase 
  },
  { 
    title: "Saved Jobs", 
    count: 8, 
    change: "+5 this week", 
    trend: "up", 
    description: "Jobs saved for later",
    icon: Bell 
  },
];

// Dernières activités
const recentActivities = [
  {
    id: 1,
    type: "application",
    title: "Applied to Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    time: "2 hours ago",
    icon: FileText,
  },
  {
    id: 2,
    type: "interview",
    title: "Interview scheduled for UI/UX Designer",
    company: "Creative Designs Co.",
    time: "Yesterday",
    icon: Calendar,
  },
  {
    id: 3,
    type: "offer",
    title: "Received offer for Backend Developer",
    company: "Data Innovations Ltd.",
    time: "3 days ago",
    icon: Briefcase,
  },
];

// Événements à venir
const upcomingEvents = [
  {
    id: 1,
    title: "Technical Interview",
    company: "Tech Solutions Inc.",
    date: "Apr 25, 2025",
    time: "2:00 PM",
  },
  {
    id: 2,
    title: "Phone Screening",
    company: "Innovative Solutions",
    date: "Apr 22, 2025",
    time: "11:30 AM",
  },
];

// Statistiques des candidatures par statut
const applicationStats = [
  { status: "Applied", count: 5, color: "bg-blue-500" },
  { status: "Screening", count: 3, color: "bg-purple-500" },
  { status: "Interview", count: 2, color: "bg-yellow-500" },
  { status: "Offer", count: 1, color: "bg-green-500" },
  { status: "Rejected", count: 1, color: "bg-red-500" },
];

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const totalApplications = applicationStats.reduce((sum, stat) => sum + stat.count, 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              </div>
              <Button onClick={() => navigate('/applications')} className="gap-2">
                <PlusCircle className="h-4 w-4" />
                New Application
              </Button>
            </div>
          </header>

          {/* Main content */}
          <main className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <h3 className="text-3xl font-bold mt-1">{stat.count}</h3>
                      </div>
                      <div className={`rounded-full p-2 ${
                        stat.title === "Applications" ? "bg-blue-100 text-blue-600" :
                        stat.title === "Interviews" ? "bg-yellow-100 text-yellow-600" :
                        stat.title === "Offers" ? "bg-green-100 text-green-600" :
                        "bg-purple-100 text-purple-600"
                      }`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"} flex items-center`}>
                        {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : null}
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Application Progress & Activity  */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Applications Overview</CardTitle>
                  <CardDescription>Track your job application progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applicationStats.map((stat) => (
                      <div key={stat.status} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{stat.status}</span>
                          <span className="font-medium">{stat.count}</span>
                        </div>
                        <Progress value={(stat.count / totalApplications) * 100} className={stat.color} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h4 className="text-sm font-medium mb-4">Recent Activity</h4>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex gap-3">
                          <div className={`rounded-full p-2 mt-0.5 ${
                            activity.type === "application" ? "bg-blue-100 text-blue-600" :
                            activity.type === "interview" ? "bg-yellow-100 text-yellow-600" :
                            "bg-green-100 text-green-600"
                          }`}>
                            <activity.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.company}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="mt-4 w-full justify-between">
                      View all activity <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Your scheduled interviews and deadlines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.length > 0 ? (
                      upcomingEvents.map((event) => (
                        <div key={event.id} className="flex gap-3 p-3 bg-accent/50 rounded-lg">
                          <div className="bg-primary/10 rounded-md p-2 h-fit">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{event.title}</p>
                            <p className="text-xs text-muted-foreground">{event.company}</p>
                            <div className="flex items-center gap-1 mt-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground">
                                {event.date} at {event.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No upcoming events</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="text-sm font-medium mb-4">Suggested Actions</h4>
                    <div className="space-y-3">
                      <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Add new application
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                        <User className="h-4 w-4" />
                        Complete your profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Application Timeline</CardTitle>
                <CardDescription>View and track your recent job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-7 border-l border-dashed border-muted-foreground/30"></div>
                  <div className="space-y-8">
                    {recentActivities.map((activity, index) => (
                      <div key={`timeline-${activity.id}`} className="flex gap-4 relative">
                        <div className={`rounded-full p-2 z-10 ${
                          activity.type === "application" ? "bg-blue-100 text-blue-600" :
                          activity.type === "interview" ? "bg-yellow-100 text-yellow-600" :
                          "bg-green-100 text-green-600"
                        }`}>
                          <activity.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 bg-muted/50 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">{activity.company}</p>
                            </div>
                            <Badge variant="outline" className={`${
                              activity.type === "application" ? "bg-blue-100 text-blue-800 border-blue-200" :
                              activity.type === "interview" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                              "bg-green-100 text-green-800 border-green-200"
                            }`}>
                              {activity.type === "application" ? "Applied" :
                               activity.type === "interview" ? "Interview" : "Offer"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
