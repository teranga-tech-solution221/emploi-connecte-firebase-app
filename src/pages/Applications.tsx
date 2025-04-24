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

// Exemple de candidatures avec la nouvelle structure
const applications = [
  {
    id: 1,
    recruteur: "Marie Dupont",
    metier: "Développeur Frontend Senior",
    lieu: "Paris (Télétravail)",
    salaire: "45-55k€",
    statut: "Entretien",
    date: "Posté le 10 Avr 2025",
    prochainEvenement: {
      type: "Entretien",
      date: "25 Avr 2025",
      heure: "14:00"
    }
  },
  {
    id: 2,
    recruteur: "Jean Martin",
    metier: "Designer UI/UX",
    lieu: "Lyon",
    salaire: null,
    statut: "Postulé",
    date: "Posté le 15 Avr 2025",
    prochainEvenement: null
  },
  {
    id: 3,
    recruteur: "Sophie Lemaire",
    metier: "Développeur Full Stack",
    lieu: "Toulouse (Hybride)",
    salaire: "50-60k€",
    statut: "En cours",
    date: "Posté le 8 Avr 2025",
    prochainEvenement: {
      type: "Appel téléphonique",
      date: "22 Avr 2025",
      heure: "11:30"
    }
  },
  {
    id: 4,
    recruteur: "Pierre Richard",
    metier: "Chef de Produit",
    lieu: "Marseille",
    salaire: null,
    statut: "Refusé",
    date: "Posté le 5 Avr 2025",
    prochainEvenement: null
  },
  {
    id: 5,
    recruteur: "Isabelle Garcia",
    metier: "Développeur Backend",
    lieu: "Nantes (Télétravail)",
    salaire: "55-65k€",
    statut: "Offre",
    date: "Posté le 25 Mar 2025",
    prochainEvenement: {
      type: "Date limite de décision",
      date: "30 Avr 2025",
      heure: ""
    }
  },
];

const statusColors: Record<string, string> = {
  "Postulé": "bg-blue-100 text-blue-800 border-blue-200",
  "En cours": "bg-purple-100 text-purple-800 border-purple-200",
  "Entretien": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Offre": "bg-green-100 text-green-800 border-green-200",
  "Refusé": "bg-red-100 text-red-800 border-red-200",
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
                <h1 className="text-2xl font-bold text-gray-900">Candidatures</h1>
              </div>
              <Button>Ajouter une candidature</Button>
            </div>
          </header>

          {/* Main content */}
          <main className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between">
              <div className="w-full sm:max-w-xs">
                <Input placeholder="Rechercher des candidatures..." />
              </div>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">Tout</TabsTrigger>
                  <TabsTrigger value="active">En cours</TabsTrigger>
                  <TabsTrigger value="offers">Offres</TabsTrigger>
                  <TabsTrigger value="rejected">Refusées</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Recruteur</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Métier</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Lieu</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Salaire</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Statut</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={app.logo || ""} alt={app.recruteur} />
                                <AvatarFallback className="text-xs">{getInitials(app.recruteur)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{app.recruteur}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-sm">{app.metier}</p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm">{app.lieu}</p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm">{app.salaire || "-"}</p>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={`${statusColors[app.statut]}`}>
                              {app.statut}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm text-muted-foreground">{app.date}</p>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Ouvrir le menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                                <DropdownMenuItem>Modifier</DropdownMenuItem>
                                <DropdownMenuItem>Ajouter une note</DropdownMenuItem>
                                <DropdownMenuItem>Planifier un événement</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Supprimer
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
                    <span>Événements à venir</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {applications
                    .filter(app => app.prochainEvenement)
                    .slice(0, 3)
                    .map(app => (
                      <div key={`event-${app.id}`} className="flex gap-4 items-start">
                        <div className="bg-muted rounded-full p-2">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{app.prochainEvenement?.type}</p>
                          <p className="text-sm text-muted-foreground">{app.metier} chez {app.recruteur}</p>
                          <p className="text-sm">{app.prochainEvenement?.date} {app.prochainEvenement?.heure}</p>
                        </div>
                      </div>
                    ))}
                  {applications.filter(app => app.prochainEvenement).length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">Aucun événement à venir</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    <span>Candidatures par statut</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(
                      applications.reduce((acc, app) => {
                        acc[app.statut] = (acc[app.statut] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([statut, count]) => (
                      <div key={statut} className="flex items-center gap-2">
                        <Badge variant="outline" className={`${statusColors[statut]}`}>
                          {statut}
                        </Badge>
                        <div className="flex-1 h-2 bg-muted overflow-hidden rounded-full">
                          <div 
                            className={`h-full ${statut === 'Offre' ? 'bg-green-500' : 
                                                  statut === 'Refusé' ? 'bg-red-500' : 
                                                  statut === 'Entretien' ? 'bg-yellow-500' : 
                                                  statut === 'En cours' ? 'bg-purple-500' : 
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
