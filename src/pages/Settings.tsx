
import React, { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserCircle,
  Mail,
  Lock,
  Bell,
  Palette,
  Upload,
  Save,
  Phone,
  MapPin,
  Users,
  Building,
  CreditCard
} from "lucide-react";

export default function Settings() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [userType, setUserType] = useState("client"); // 'client' ou 'prestataire'

  // États pour le profil
  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName || "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
    bio: "",
    companyName: "",
    companyType: "personal" // 'personal', 'enterprise', 'agency'
  });

  // États pour les paramètres
  const [settings, setSettings] = useState({
    darkMode: true,
    emailNotifications: true,
    smsNotifications: false,
    desktopNotifications: true,
    language: "fr",
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSettingsChange = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (value: string) => {
    setUserType(value);
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Logique pour gérer le changement de CV
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      toast({
        title: "CV téléchargé",
        description: `Le fichier ${file.name} a été téléchargé avec succès.`,
      });
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoLoading(true);
      
      // Simuler un chargement
      setTimeout(() => {
        // Logique pour télécharger la photo
        setPhotoLoading(false);
        toast({
          title: "Photo mise à jour",
          description: "Votre photo de profil a été mise à jour avec succès.",
        });
      }, 1500);
    }
  };

  // Fonction pour gérer l'enregistrement des modifications
  const handleSaveChanges = () => {
    setIsLoading(true);
    
    // Simuler un enregistrement
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Modifications enregistrées",
        description: "Vos paramètres ont été mis à jour avec succès.",
      });
    }, 1000);
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          {/* Header */}
          <header className="bg-card shadow-sm border-b">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Paramètres</h1>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" /> Profil
                </TabsTrigger>
                <TabsTrigger value="account" className="flex items-center gap-2">
                  <Users className="h-4 w-4" /> Type de compte
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" /> Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Sécurité
                </TabsTrigger>
              </TabsList>

              {/* PROFILE */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de profil</CardTitle>
                    <CardDescription>
                      Gérez vos informations personnelles et vos coordonnées.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="flex flex-col items-center space-y-2">
                        <Avatar className="h-24 w-24 cursor-pointer relative group" onClick={handlePhotoClick}>
                          {photoLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
                              <div className="w-8 h-8 border-4 border-t-blue-500 border-blue-500/30 rounded-full animate-spin"></div>
                            </div>
                          ) : (
                            <>
                              <AvatarImage src={currentUser?.photoURL || ""} />
                              <AvatarFallback className="text-2xl">
                                {getInitials(profileData.displayName)}
                              </AvatarFallback>
                              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Upload className="h-6 w-6 text-white" />
                              </div>
                            </>
                          )}
                        </Avatar>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handlePhotoChange}
                          className="hidden"
                          accept="image/*"
                        />
                        <p className="text-sm text-muted-foreground">Photo de profil</p>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="displayName">Nom complet</Label>
                          <Input
                            id="displayName"
                            name="displayName"
                            value={profileData.displayName}
                            onChange={handleProfileChange}
                            placeholder="Votre nom complet"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Adresse email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            placeholder="Votre adresse email"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Numéro de téléphone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            placeholder="Ex: +221 77 123 45 67"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Adresse</Label>
                          <Input
                            id="address"
                            name="address"
                            value={profileData.address}
                            onChange={handleProfileChange}
                            placeholder="Votre adresse complète"
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="bio">Biographie</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            value={profileData.bio}
                            onChange={handleProfileChange}
                            placeholder="Une courte description de vous ou de votre entreprise"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-3">
                    <Button variant="outline">Annuler</Button>
                    <Button onClick={handleSaveChanges} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" /> Enregistrer
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* ACCOUNT TYPE */}
              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Type de compte</CardTitle>
                    <CardDescription>
                      Définissez votre rôle sur la plateforme et personnalisez votre expérience.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div 
                        className={`border rounded-lg p-6 cursor-pointer transition-all ${
                          userType === 'client' ? 'border-blue-500 bg-blue-500/10' : 'border-border hover:border-blue-300'
                        }`}
                        onClick={() => handleUserTypeChange('client')}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <Building className={`h-10 w-10 ${userType === 'client' ? 'text-blue-500' : 'text-muted-foreground'}`} />
                          <div>
                            <h3 className="font-semibold text-lg">Client</h3>
                            <p className="text-sm text-muted-foreground">Je cherche des talents et services</p>
                          </div>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <Badge className="h-2 w-2 rounded-full bg-blue-500" variant="secondary" />
                            Publier des offres d'emploi
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge className="h-2 w-2 rounded-full bg-blue-500" variant="secondary" />
                            Consulter les profils de prestataires
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge className="h-2 w-2 rounded-full bg-blue-500" variant="secondary" />
                            Gérer les candidatures reçues
                          </li>
                        </ul>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-6 cursor-pointer transition-all ${
                          userType === 'prestataire' ? 'border-blue-500 bg-blue-500/10' : 'border-border hover:border-blue-300'
                        }`}
                        onClick={() => handleUserTypeChange('prestataire')}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <UserCircle className={`h-10 w-10 ${userType === 'prestataire' ? 'text-blue-500' : 'text-muted-foreground'}`} />
                          <div>
                            <h3 className="font-semibold text-lg">Prestataire</h3>
                            <p className="text-sm text-muted-foreground">Je propose mes services</p>
                          </div>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <Badge className="h-2 w-2 rounded-full bg-blue-500" variant="secondary" />
                            Créer un profil professionnel détaillé
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge className="h-2 w-2 rounded-full bg-blue-500" variant="secondary" />
                            Postuler aux offres d'emploi
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge className="h-2 w-2 rounded-full bg-blue-500" variant="secondary" />
                            Publier des services disponibles
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    {userType === 'prestataire' && (
                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-4">Type de prestataire</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="companyName">Nom de l'entreprise/organisme</Label>
                            <Input
                              id="companyName"
                              name="companyName"
                              value={profileData.companyName}
                              onChange={handleProfileChange}
                              placeholder="Optionnel si indépendant"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="companyType">Type de structure</Label>
                            <Select value={profileData.companyType} onValueChange={(value) => setProfileData(prev => ({...prev, companyType: value}))}>
                              <SelectTrigger id="companyType">
                                <SelectValue placeholder="Sélectionnez un type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="personal">Indépendant / Freelance</SelectItem>
                                <SelectItem value="enterprise">Entreprise</SelectItem>
                                <SelectItem value="agency">Agence</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cv">CV / Portfolio</Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id="cv"
                                type="file"
                                onChange={handleCvChange}
                                accept=".pdf,.doc,.docx"
                                className="max-w-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {userType === 'client' && (
                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-4">Informations supplémentaires</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="companyName">Nom de l'entreprise</Label>
                            <Input
                              id="companyName"
                              name="companyName"
                              value={profileData.companyName}
                              onChange={handleProfileChange}
                              placeholder="Nom de votre entreprise"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="secteur">Secteur d'activité</Label>
                            <Select>
                              <SelectTrigger id="secteur">
                                <SelectValue placeholder="Sélectionnez un secteur" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tech">Technologies</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="education">Éducation</SelectItem>
                                <SelectItem value="health">Santé</SelectItem>
                                <SelectItem value="other">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end gap-3">
                    <Button variant="outline">Annuler</Button>
                    <Button onClick={handleSaveChanges} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" /> Enregistrer
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* NOTIFICATIONS */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Préférences de notifications</CardTitle>
                    <CardDescription>
                      Personnalisez la façon dont vous recevez les notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Notifications par email</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevez des emails pour les activités importantes.
                          </p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => handleSettingsChange("emailNotifications", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-notifications">Notifications par SMS</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevez des SMS pour les alertes urgentes.
                          </p>
                        </div>
                        <Switch
                          id="sms-notifications"
                          checked={settings.smsNotifications}
                          onCheckedChange={(checked) => handleSettingsChange("smsNotifications", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="desktop-notifications">Notifications de bureau</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevez des notifications sur votre navigateur.
                          </p>
                        </div>
                        <Switch
                          id="desktop-notifications"
                          checked={settings.desktopNotifications}
                          onCheckedChange={(checked) => handleSettingsChange("desktopNotifications", checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t space-y-4">
                      <h3 className="font-medium">Types de notifications</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="messages-notif">Messages</Label>
                          <Switch id="messages-notif" checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="applications-notif">Candidatures</Label>
                          <Switch id="applications-notif" checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="offers-notif">Offres d'emploi</Label>
                          <Switch id="offers-notif" checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="updates-notif">Mises à jour du système</Label>
                          <Switch id="updates-notif" checked={false} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-3">
                    <Button variant="outline">Annuler</Button>
                    <Button onClick={handleSaveChanges} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" /> Enregistrer
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* SECURITY */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sécurité du compte</CardTitle>
                    <CardDescription>
                      Mettez à jour votre mot de passe et sécurisez votre compte.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={securityData.currentPassword}
                          onChange={handleSecurityChange}
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div className="md:col-span-2 border-t pt-4 mt-2">
                        <h3 className="font-medium mb-4">Changer de mot de passe</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                            <Input
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              value={securityData.newPassword}
                              onChange={handleSecurityChange}
                              placeholder="••••••••"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={securityData.confirmPassword}
                              onChange={handleSecurityChange}
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-4">Sécurité supplémentaire</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Authentification à deux facteurs</Label>
                            <p className="text-sm text-muted-foreground">
                              Protégez votre compte avec une deuxième méthode d'authentification.
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configurer
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Sessions actives</Label>
                            <p className="text-sm text-muted-foreground">
                              Gérez les appareils connectés à votre compte.
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Gérer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-3">
                    <Button variant="outline">Annuler</Button>
                    <Button onClick={handleSaveChanges} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" /> Enregistrer
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
