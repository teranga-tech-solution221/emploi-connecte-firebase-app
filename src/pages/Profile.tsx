
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

const Profile = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [isLoading, setIsLoading] = useState(false);

  // Ajout d'un état pour le CV
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvLoading, setCvLoading] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setIsLoading(false);
      toast({
        title: "Profil mis à jour",
        description: "Votre profil a bien été mis à jour.",
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Échec de la mise à jour du profil. Veuillez réessayer.",
      });
    }
  };

  // Gère le téléchargement simulé de CV
  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setCvLoading(true);
      setTimeout(() => {
        setCvFile(file);
        setCvLoading(false);
        toast({
          title: "CV téléchargé",
          description: "Votre CV a été ajouté avec succès.",
        });
      }, 1200);
    } else if (file) {
      toast({
        variant: "destructive",
        title: "Format non supporté",
        description: "Veuillez sélectionner un fichier PDF.",
      });
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
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
                <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Photo de profil</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={currentUser?.photoURL || ""} alt="Profil" />
                      <AvatarFallback className="text-4xl">
                        {getInitials(currentUser?.displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="mt-4" disabled>
                      Changer la photo
                    </Button>
                  </CardContent>
                </Card>

                {/* Bloc CV */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Ajouter votre CV</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <Label htmlFor="cv-upload" className="block mb-2">
                        Téléverser un fichier PDF
                      </Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="cv-upload"
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={handleCvChange}
                        />
                        <label htmlFor="cv-upload">
                          <Button
                            variant="outline"
                            type="button"
                            className="flex items-center gap-2"
                            disabled={cvLoading}
                          >
                            <Upload className="w-4 h-4" />
                            {cvLoading ? "Chargement..." : "Ajouter un CV"}
                          </Button>
                        </label>
                        {cvFile && (
                          <span className="text-green-600 text-sm">
                            {cvFile.name}
                          </span>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                    <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="displayName">Nom affiché</Label>
                          <Input 
                            id="displayName" 
                            value={displayName} 
                            onChange={(e) => setDisplayName(e.target.value)} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            value={currentUser?.email || ""} 
                            disabled 
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Mise à jour..." : "Mettre à jour le profil"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Profile;

