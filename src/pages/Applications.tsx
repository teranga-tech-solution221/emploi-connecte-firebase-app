
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ApplicationList from "@/components/applications/ApplicationList";

// Exemple de candidatures
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

export default function Applications() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 transition-all duration-300 ml-[70px] lg:ml-[70px] data-[sidebar-expanded=true]:ml-64">
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
                <ApplicationList applications={applications} />
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
