
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb')] bg-cover bg-center opacity-10" />
        
        <div className="container mx-auto text-center space-y-8 relative z-10 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-scale-in">
            FABUS
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed opacity-90">
            Propulsez votre carrière vers de nouveaux sommets avec notre plateforme innovante de gestion de candidatures
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-white text-indigo-900 hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 group"
            >
              <Link to="/auth/login" className="flex items-center gap-2">
                Commencer maintenant
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 hover:scale-105 transform transition-all duration-300"
            >
              <Link to="/auth/register">
                Créer un compte
              </Link>
            </Button>
          </div>
        </div>

        {/* Features section */}
        <div className="container mx-auto mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:transform hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-3">Gestion Simplifiée</h3>
            <p className="text-gray-300">Organisez et suivez vos candidatures en toute simplicité</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:transform hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-3">Analyse Intelligente</h3>
            <p className="text-gray-300">Obtenez des insights pertinents sur vos recherches d'emploi</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:transform hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-3">Suivi en Temps Réel</h3>
            <p className="text-gray-300">Restez informé de l'évolution de vos candidatures</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
