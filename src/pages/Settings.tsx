import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Upload, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [isLoading, setIsLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvLoading, setCvLoading] = useState(false);
  const [cvURL, setCvURL] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      const photoPath = `profile_photos/${currentUser.uid}/profile`;
      supabase.storage.from("profile_photos").getPublicUrl(`${currentUser.uid}/profile`).data?.publicUrl &&
        setPhotoURL(supabase.storage.from("profile_photos").getPublicUrl(`${currentUser.uid}/profile`).data.publicUrl);

      supabase.storage.from("cvs").getPublicUrl(`${currentUser.uid}/cv.pdf`).data?.publicUrl &&
        setCvURL(supabase.storage.from("cvs").getPublicUrl(`${currentUser.uid}/cv.pdf`).data.publicUrl);
    }
  }, [currentUser]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (currentUser) {
        window.localStorage.setItem("displayName", displayName);

        if (photoFile) {
          setPhotoLoading(true);
          const { data: uploadData, error: uploadErr } = await supabase.storage
            .from("profile_photos")
            .upload(`${currentUser.uid}/profile`, photoFile, { upsert: true });

          if (uploadErr) throw uploadErr;

          const { data: photoData } = supabase.storage
            .from("profile_photos")
            .getPublicUrl(`${currentUser.uid}/profile`);
          if (photoData?.publicUrl) setPhotoURL(photoData.publicUrl);

          setPhotoLoading(false);
        }

        toast({
          title: "Profil mis à jour",
          description: "Votre profil a bien été mis à jour.",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Échec de la mise à jour du profil. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
      setPhotoLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoURL(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCvChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf" && currentUser) {
      setCvLoading(true);

      try {
        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from("cvs")
          .upload(`${currentUser.uid}/cv.pdf`, file, { upsert: true });

        if (uploadErr) throw uploadErr;

        const { data: cvData } = supabase.storage
          .from("cvs")
          .getPublicUrl(`${currentUser.uid}/cv.pdf`);
        if (cvData?.publicUrl) setCvURL(cvData.publicUrl);

        setCvFile(file);

        toast({
          title: "CV téléchargé",
          description: "Votre CV a été ajouté avec succès.",
        });
      } catch (error) {
        console.error("Erreur lors du téléchargement du CV:", error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Échec du téléchargement du CV. Veuillez réessayer.",
        });
      } finally {
        setCvLoading(false);
      }
    } else if (file && file.type !== "application/pdf") {
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

  const handleOpenFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <header className="shadow-sm border-b dark:border-gray-900">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Paramètres</h1>
              </div>
            </div>
          </header>

          <main className="p-4 sm:p-6 lg:p-8">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList>
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
                <TabsTrigger value="appearance">Apparence</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Photo de profil</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center">
                        <Avatar className="h-32 w-32">
                          <AvatarImage src={photoURL} alt="Profil" />
                          <AvatarFallback className="text-4xl">
                            {getInitials(displayName)}
                          </AvatarFallback>
                        </Avatar>
                        <input
                          type="file"
                          className="hidden"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handlePhotoChange}
                        />
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={handleOpenFileInput}
                          disabled={photoLoading}
                        >
                          {photoLoading ? "Chargement..." : "Changer la photo"}
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>CV</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
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
                              className="w-full flex items-center gap-2"
                              disabled={cvLoading}
                            >
                              <Upload className="w-4 h-4" />
                              {cvLoading ? "Chargement..." : "Ajouter un CV"}
                            </Button>
                          </label>

                          {cvURL && (
                            <div className="mt-2">
                              <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                                CV téléchargé avec succès
                              </p>
                              <a
                                href={cvURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex items-center gap-1"
                              >
                                <span>Voir mon CV</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            </div>
                          )}
                        </div>
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

                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2"
                          >
                            {isLoading ? "Mise à jour..." : (
                              <>
                                <Save className="w-4 h-4" />
                                Mettre à jour le profil
                              </>
                            )}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Préférences de notification</CardTitle>
                    <CardDescription>Choisissez comment et quand recevoir des notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Notifications par e-mail</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="block">Nouveaux messages</Label>
                            <p className="text-sm text-muted-foreground">Recevoir une notification lors d'un nouveau message</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="block">Mises à jour d'application</Label>
                            <p className="text-sm text-muted-foreground">Notif sur les changements sur vos candidatures</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="block">Nouvelles recommandations d'emploi</Label>
                            <p className="text-sm text-muted-foreground">Recevoir des emails sur les nouveaux jobs correspondant à vos compétences</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Notifications push</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="block">Activer les notifications push</Label>
                            <p className="text-sm text-muted-foreground">Recevoir les notifications importantes dans votre navigateur</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveChanges}>Enregistrer les modifications</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres de confidentialité</CardTitle>
                    <CardDescription>Gérez votre confidentialité et la sécurité</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="block">Visibilité du profil</Label>
                          <p className="text-sm text-muted-foreground">Rendre visible votre profil aux recruteurs</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="block">Statut d'activité</Label>
                          <p className="text-sm text-muted-foreground">Montrer quand vous êtes en ligne</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="block">Collecte de données</Label>
                          <p className="text-sm text-muted-foreground">Autoriser la collecte de données pour l'amélioration de l'expérience</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveChanges}>Enregistrer les modifications</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-6">
                <Card className="dark-card">
                  <CardHeader>
                    <CardTitle>Paramètres d'apparence</CardTitle>
                    <CardDescription>Personnalisez le look de JobTracker</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Thème</h3>
                      <p className="text-muted-foreground">Le thème peut être changé en utilisant l'icône située à côté du logo dans la barre latérale.</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveChanges}>Enregistrer les modifications</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
