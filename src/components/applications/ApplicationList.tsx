
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

type Application = {
  id: number;
  recruteur: string;
  metier: string;
  lieu: string;
  salaire: string | null;
  statut: string;
  date: string;
  prochainEvenement: {
    type: string;
    date: string;
    heure: string;
  } | null;
};

const statusColors: Record<string, string> = {
  "Postulé": "bg-blue-100 text-blue-800 border-blue-200",
  "En cours": "bg-purple-100 text-purple-800 border-purple-200",
  "Entretien": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Offre": "bg-green-100 text-green-800 border-green-200",
  "Refusé": "bg-red-100 text-red-800 border-red-200",
};

interface ApplicationListProps {
  applications: Application[];
}

export default function ApplicationList({ applications }: ApplicationListProps) {
  const getInitials = (name: string) => {
    return name.split(' ')[0][0] + (name.split(' ')[1]?.[0] || '');
  };

  return (
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
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                    <DropdownMenuItem>Modifier</DropdownMenuItem>
                    <DropdownMenuItem>Ajouter une note</DropdownMenuItem>
                    <DropdownMenuItem>Planifier un événement</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
