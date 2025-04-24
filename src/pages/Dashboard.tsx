import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon,
  Calendar, 
  Building, 
  FileText, 
  Bell, 
  Clock, 
  User, 
  Briefcase, 
  PlusCircle,
  ArrowUpRight,
  ArrowRight,
  Users,
  Eye,
  Award,
  Wallet,
  CheckCircle
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Cell, Tooltip, Legend } from "recharts";

// Types d'utilisateur
type UserType = "client" | "prestataire";

// Données statistiques 
const clientStats = [
  { 
    title: "Offres publiées", 
    count: 7, 
    change: "+2 cette semaine", 
    trend: "up", 
    description: "Total des offres d'emploi publiées",
    icon: FileText,
    color: "blue"
  },
  { 
    title: "Candidatures reçues", 
    count: 28, 
    change: "+15 ce mois", 
    trend: "up", 
    description: "Candidatures reçues sur vos offres",
    icon: Users,
    color: "purple" 
  },
  { 
    title: "Entretiens", 
    count: 4, 
    change: "+1 cette semaine", 
    trend: "up", 
    description: "Entretiens programmés",
    icon: Calendar,
    color: "yellow"
  },
  { 
    title: "Vues du profil", 
    count: 56, 
    change: "+13 cette semaine", 
    trend: "up", 
    description: "Nombre de visites sur votre profil",
    icon: Eye,
    color: "green"
  },
];

// Données d'activité récente
const clientActivities = [
  {
    id: 1,
    type: "application",
    title: "Nouvelle candidature reçue",
    subject: "Développeur Frontend Senior",
    from: "Amadou Diop",
    time: "Il y a 2 heures",
    icon: FileText,
  },
  {
    id: 2,
    type: "interview",
    title: "Entretien programmé",
    subject: "Designer UI/UX",
    from: "Fatou Ndiaye",
    time: "Demain, 14:00",
    icon: Calendar,
  },
  {
    id: 3,
    type: "offer",
    title: "Offre acceptée",
    subject: "Développeur Backend",
    from: "Moussa Sow",
    time: "Il y a 3 jours",
    icon: CheckCircle,
  },
];

// Événements à venir
const upcomingEvents = [
  {
    id: 1,
    title: "Entretien Technique",
    company: "Tech Solutions Inc.",
    date: "25 avr. 2025",
    time: "14:00",
  },
  {
    id: 2,
    title: "Entretien Téléphonique",
    company: "Innovative Solutions",
    date: "22 avr. 2025",
    time: "11:30",
  },
];

// Données pour les graphiques
const clientChartData = [
  { name: 'Jan', candidates: 12 },
  { name: 'Fév', candidates: 19 },
  { name: 'Mar', candidates: 15 },
  { name: 'Avr', candidates: 28 },
  { name: 'Mai', candidates: 18 },
  { name: 'Jui', candidates: 24 },
];

// Données pour les statuts des candidatures
const clientStatusData = [
  { status: "Reçues", count: 28, color: "#3b82f6" },
  { status: "En cours d'examen", count: 12, color: "#8b5cf6" },
  { status: "Entretien", count: 4, color: "#f59e0b" },
  { status: "Offre envoyée", count: 2, color: "#10b981" },
  { status: "Refusées", count: 10, color: "#ef4444" },
];

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // On utilise un type fixe, plus de sélection client/prestataire
  const userType: UserType = "client";

  // Sélectionner les données en fonction du type d'utilisateur fixe
  const stats = clientStats;
  const activities = clientActivities;
  const chartData = clientChartData;
  const statusData = clientStatusData;

  const totalApplications = statusData.reduce((sum, stat) => sum + stat.count, 0);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const chartConfig = {
    candidates: {
      label: "Candidats",
      color: "#3b82f6",
    },
    applications: {
      label: "Candidatures",
      color: "#3b82f6",
    },
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 ml-[70px] lg:ml-64">
          {/* Header */}
          <header className="bg-card shadow-sm border-b">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Tableau de bord</h1>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={() => navigate('/applications')} className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Publier une offre
                </Button>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <h3 className="text-3xl font-bold mt-1">{stat.count}</h3>
                      </div>
                      <div className={`rounded-full p-2 bg-${stat.color}-100 text-${stat.color}-600`}>
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

            {/* Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Vue d'ensemble</CardTitle>
                  <CardDescription>
                    Suivi des candidatures reçues sur les 6 derniers mois
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer 
                      config={chartConfig}
                      className="w-full"
                    >
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar 
                          dataKey={userType === "client" ? "candidates" : "applications"} 
                          fill="#3b82f6" 
                          name={userType === "client" ? "Candidats" : "Candidatures"}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ChartContainer>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-sm font-medium mb-4">Activité récente</h4>
                    <div className="space-y-4">
                      {activities.map((activity) => (
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
                            <p className="text-xs font-medium">{activity.subject}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.from}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="mt-4 w-full justify-between">
                      Voir toute l'activité <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>
                    Statut des candidatures
                  </CardTitle>
                  <CardDescription>
                    Répartition des candidatures par statut
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="count"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name, props) => [`${value} (${Math.round((Number(value) / totalApplications) * 100)}%)`, props.payload.status]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-4 mt-6">
                    {statusData.map((stat, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center">
                            <span 
                              className="inline-block w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: stat.color }}
                            />
                            {stat.status}
                          </span>
                          <span className="font-medium">{stat.count}</span>
                        </div>
                        <Progress 
                          value={(stat.count / totalApplications) * 100} 
                          className="h-2"
                          indicatorClassName="transition-all"
                          style={{ backgroundColor: `${stat.color}20` }}
                          indicatorStyle={{ backgroundColor: stat.color }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Événements à venir & Suggestions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Chronologie des activités</CardTitle>
                  <CardDescription>
                    Suivez les activités récentes sur vos offres
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-7 border-l border-dashed border-muted-foreground/30"></div>
                    <div className="space-y-8">
                      {activities.map((activity, index) => (
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
                                <p className="text-sm">{activity.subject}</p>
                                <p className="text-sm text-muted-foreground">
                                  {activity.from}
                                </p>
                              </div>
                              <Badge variant="outline" className={`${
                                activity.type === "application" ? "bg-blue-100 text-blue-800 border-blue-200" :
                                activity.type === "interview" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                                "bg-green-100 text-green-800 border-green-200"
                              }`}>
                                {activity.type === "application" ? "Candidature" :
                                 activity.type === "interview" ? "Entretien" : 
                                 activity.type === "offer" ? "Offre envoyée" : "Offre reçue"}
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

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Événements à venir</CardTitle>
                  <CardDescription>Vos entretiens et échéances programmés</CardDescription>
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
                                {event.date} à {event.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Aucun événement à venir</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="text-sm font-medium mb-4">Actions suggérées</h4>
                    <div className="space-y-3">
                      <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Publier une offre d'emploi
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                        <Users className="h-4 w-4" />
                        Parcourir les prestataires
                      </Button>
                    </div>
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

export default Dashboard;
