
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: "Paramètres enregistrés",
      description: "Vos paramètres ont été sauvegardés avec succès."
    });
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
                <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="p-4 sm:p-6 lg:p-8">
            <Tabs defaultValue="account">
              <TabsList className="mb-6">
                <TabsTrigger value="account">Compte</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
                <TabsTrigger value="appearance">Apparence</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations du compte</CardTitle>
                    <CardDescription>Gérez les détails et préférences de votre compte</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex flex-col items-center sm:items-start gap-2">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={currentUser?.photoURL || ""} alt="Profil" />
                          <AvatarFallback className="text-2xl">{getInitials(currentUser?.displayName)}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">Changer la photo</Button>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="displayName">Nom affiché</Label>
                            <Input 
                              id="displayName" 
                              defaultValue={currentUser?.displayName || ""} 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              defaultValue={currentUser?.email || ""} 
                              disabled 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Input 
                            id="bio" 
                            defaultValue="" 
                            placeholder="Parlez-nous un peu de vous"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Mot de passe</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm">Changer le mot de passe</Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveChanges}>Enregistrer les modifications</Button>
                  </CardFooter>
                </Card>
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
                            <p className="text-sm text-muted-foreground">Recevoir une notification lors d’un nouveau message</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="block">Mises à jour d’application</Label>
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
                          <Label className="block">Statut d’activité</Label>
                          <p className="text-sm text-muted-foreground">Montrer quand vous êtes en ligne</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="block">Collecte de données</Label>
                          <p className="text-sm text-muted-foreground">Autoriser la collecte de données pour l’amélioration de l’expérience</p>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres d’apparence</CardTitle>
                    <CardDescription>Personnalisez le look de JobTracker</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Thème</h3>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <Button variant="outline" className="border-primary aspect-[3/2] flex items-center justify-center h-auto">
                          Clair
                        </Button>
                        <Button variant="outline" className="aspect-[3/2] flex items-center justify-center h-auto">
                          Sombre
                        </Button>
                        <Button variant="outline" className="aspect-[3/2] flex items-center justify-center h-auto">
                          Système
                        </Button>
                      </div>
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

