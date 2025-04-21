
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">FABUS</h1>
        <p className="text-xl text-slate-600 max-w-md mx-auto">
          La plateforme intelligente pour gérer vos candidatures et votre recherche d'emploi efficacement
        </p>
        
        <div className="flex gap-4 justify-center mt-8">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link to="/auth/login">Se connecter</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/auth/register">S'inscrire</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
