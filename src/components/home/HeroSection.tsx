
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function HeroSection() {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col items-center space-y-8 mb-14">
      <h1 className="text-7xl font-bold text-white tracking-tight text-center mb-4 relative">
        <span className="relative z-10">Jokko Liguey</span>
        <span className="absolute -inset-x-10 inset-y-0 bg-blue-600/20 blur-xl rounded-full z-0"></span>
      </h1>
      <p className="text-xl md:text-2xl text-blue-200 text-center max-w-2xl mx-auto leading-relaxed opacity-80">
        La plateforme qui connecte les talents aux opportunités. Simplifiez vos recrutements et 
        trouvez les meilleurs profils pour vos projets.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        {currentUser ? (
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-700/30"
          >
            <Link to="/dashboard" className="flex items-center gap-2">
              Accéder à mon tableau de bord
              <ArrowRight size={18} />
            </Link>
          </Button>
        ) : (
          <>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-700/30"
            >
              <Link to="/auth/login" className="flex items-center gap-2">
                Se connecter
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-blue-500/30 text-blue-400 hover:text-white font-semibold bg-blue-500/5 hover:bg-blue-600/10 hover:border-blue-400/40 backdrop-blur-md shadow transition-all"
            >
              <Link to="/auth/register">
                Créer un compte
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
