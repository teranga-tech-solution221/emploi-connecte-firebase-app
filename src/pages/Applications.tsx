
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MoreVertical, FileText, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Exemple de candidatures
const applications = [
  {
    id: 1,
    position: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA (Remote)",
    logo: null,
    status: "Interview",
    date: "Applied on Apr 10, 2025",
    upcoming: {
      type: "Interview",
      date: "Apr 25, 2025",
      time: "2:00 PM"
    }
  },
  {
    id: 2,
    position: "UI/UX Designer",
    company: "Creative Designs Co.",
    location: "New York, NY",
    logo: null,
    status: "Applied",
    date: "Applied on Apr 15, 2025",
    upcoming: null
  },
  {
    id: 3,
    position: "Full Stack Developer",
    company: "Innovative Solutions",
    location: "Austin, TX (Hybrid)",
    logo: null,
    status: "Screening",
    date: "Applied on Apr 8, 2025",
    upcoming: {
      type: "Phone Screen",
      date: "Apr 22, 2025",
      time: "11:30 AM"
    }
  },
  {
    id: 4,
    position: "Product Manager",
    company: "Global Systems",
    location: "Chicago, IL",
    logo: null,
    status: "Rejected",
    date: "Applied on Apr 5, 2025",
    upcoming: null
  },
  {
    id: 5,
    position: "Backend Developer",
    company: "Data Innovations Ltd.",
    location: "Seattle, WA (Remote)",
    logo: null,
    status: "Offer",
    date: "Applied on Mar 25, 2025",
    upcoming: {
      type: "Decision Deadline",
      date: "Apr 30, 2025",
      time: ""
    }
  },
];

const statusColors: Record<string, string> = {
  Applied: "bg-blue-100 text-blue-800 border-blue-200",
  Screening: "bg-purple-100 text-purple-800 border-purple-200",
  Interview: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Offer: "bg-green-100 text-green-800 border-green-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

const Applications = () => {
  const getInitials = (name: string) => {
    return name.split(' ')[0][0] + (name.split(' ')[1]?.[0] || '');
  };

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
                <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
              </div>
              <Button>Add Application</Button>
            </div>
          </header>

          {/* Main content */}
          <main className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between">
              <div className="w-full sm:max-w-xs">
                <Input placeholder="Search applications..." />
              </div>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="offers">Offers</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Company</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Position</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Applied</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Upcoming</th>
                        <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={app.logo || ""} alt={app.company} />
                                <AvatarFallback className="text-xs">{getInitials(app.company)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{app.company}</p>
                                <p className="text-xs text-muted-foreground">{app.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-sm">{app.position}</p>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={`${statusColors[app.status]}`}>
                              {app.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm text-muted-foreground">{app.date}</p>
                          </td>
                          <td className="px-4 py-3">
                            {app.upcoming ? (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <p className="text-sm">
                                  {app.upcoming.type}: {app.upcoming.date} 
                                  {app.upcoming.time && ` at ${app.upcoming.time}`}
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">-</p>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Application</DropdownMenuItem>
                                <DropdownMenuItem>Add Note</DropdownMenuItem>
                                <DropdownMenuItem>Schedule Event</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Delete Application
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>Upcoming Events</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {applications
                    .filter(app => app.upcoming)
                    .slice(0, 3)
                    .map(app => (
                      <div key={`event-${app.id}`} className="flex gap-4 items-start">
                        <div className="bg-muted rounded-full p-2">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{app.upcoming?.type}</p>
                          <p className="text-sm text-muted-foreground">{app.position} at {app.company}</p>
                          <p className="text-sm">{app.upcoming?.date} {app.upcoming?.time}</p>
                        </div>
                      </div>
                    ))}
                  {applications.filter(app => app.upcoming).length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No upcoming events</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    <span>Applications by Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(
                      applications.reduce((acc, app) => {
                        acc[app.status] = (acc[app.status] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([status, count]) => (
                      <div key={status} className="flex items-center gap-2">
                        <Badge variant="outline" className={`${statusColors[status]}`}>
                          {status}
                        </Badge>
                        <div className="flex-1 h-2 bg-muted overflow-hidden rounded-full">
                          <div 
                            className={`h-full ${status === 'Offer' ? 'bg-green-500' : 
                                                  status === 'Rejected' ? 'bg-red-500' : 
                                                  status === 'Interview' ? 'bg-yellow-500' : 
                                                  status === 'Screening' ? 'bg-purple-500' : 
                                                  'bg-blue-500'}`}
                            style={{width: `${(count / applications.length) * 100}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Applications;
