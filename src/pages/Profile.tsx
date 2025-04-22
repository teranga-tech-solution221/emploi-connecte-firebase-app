import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, User, Save } from "lucide-react";
import { storage, auth } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const Profile = () => {
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
      const cvRef = ref(storage, `cvs/${currentUser.uid}/cv.pdf`);
      getDownloadURL(cvRef).then(url => {
        setCvURL(url);
      }).catch(error => {
        console.log("No CV found");
      });
    }
  }, [currentUser]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: displayName
        });
        
        if (photoFile) {
          const storageRef = ref(storage, `profile-photos/${currentUser.uid}`);
          await uploadBytes(storageRef, photoFile);
          const newPhotoURL = await getDownloadURL(storageRef);
          
          await updateProfile(currentUser, {
            photoURL: newPhotoURL
          });
          
          setPhotoURL(newPhotoURL);
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
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoLoading(true);
      setPhotoFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result as string);
        setPhotoLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCvChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf" && currentUser) {
      setCvLoading(true);
      
      try {
        const cvStorageRef = ref(storage, `cvs/${currentUser.uid}/cv.pdf`);
        await uploadBytes(cvStorageRef, file);
        const downloadURL = await getDownloadURL(cvStorageRef);
        
        setCvFile(file);
        setCvURL(downloadURL);
        
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
      <div className="min-h-screen flex w-full dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1">
          <header className="shadow-sm border-b dark:border-gray-800">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Profil</h1>
              </div>
            </div>
          </header>

          <main className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Photo de profil</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={photoURL} alt="Profil" />
                      <AvatarFallback className="text-4xl bg-indigo-500 text-white">
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
                      className="mt-4 dark:border-gray-600 dark:text-gray-300" 
                      onClick={handleOpenFileInput}
                      disabled={photoLoading}
                    >
                      {photoLoading ? "Chargement..." : "Changer la photo"}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-6 dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Ajouter votre CV</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <Label htmlFor="cv-upload" className="block mb-2 dark:text-gray-300">
                        Téléverser un fichier PDF
                      </Label>
                      <div className="flex flex-col gap-3">
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
                              className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-300"
                              disabled={cvLoading}
                            >
                              <Upload className="w-4 h-4" />
                              {cvLoading ? "Chargement..." : "Ajouter un CV"}
                            </Button>
                          </label>
                        </div>
                        
                        {cvURL && (
                          <div className="mt-2">
                            <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                              CV téléchargé avec succès
                            </p>
                            <a 
                              href={cvURL} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline flex items-center gap-1"
                            >
                              <span>Voir mon CV</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Informations personnelles</CardTitle>
                    <CardDescription className="dark:text-gray-400">Mettez à jour vos informations personnelles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="displayName" className="dark:text-gray-300">Nom affiché</Label>
                          <Input 
                            id="displayName" 
                            value={displayName} 
                            onChange={(e) => setDisplayName(e.target.value)} 
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
                          <Input 
                            id="email" 
                            value={currentUser?.email || ""} 
                            disabled 
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isLoading} 
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Profile;
