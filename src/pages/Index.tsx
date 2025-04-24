import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, FileText, Users, Bell, Settings } from "lucide-react";

export default function Index() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen w-full flex flex-col bg-black relative overflow-hidden">
      {/* Effet de grain */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.1
        }}></div>
      </div>
      
      {/* Effet de lumière bleue */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full aspect-[2/1]">
        <div className="absolute inset-0 bg-blue-600 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
      </div>
      
      <main className="container mx-auto flex flex-col items-center justify-center grow pt-20 pb-20 px-4 relative z-10">
        <div className="flex flex-col items-center space-y-2 mb-8 animate-fade-in">
          <h1 className="text-7xl font-bold text-white tracking-tight text-center mb-4 relative">
            <span className="relative z-10">Jokko Liguey</span>
            <span className="absolute -inset-x-10 inset-y-0 bg-blue-600/20 blur-xl rounded-full z-0"></span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 text-center max-w-2xl mx-auto leading-relaxed opacity-80">
            Connectez prestataires et clients dans un écosystème professionnel intuitif.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-5xl mb-14 animate-scale-in">
          {[
            { icon: FileText, title: "Candidatures", desc: "Gérez vos opportunités professionnelles" },
            { icon: Users, title: "Réseau", desc: "Connectez-vous aux meilleurs talents" },
            { icon: Bell, title: "Alertes", desc: "Notifications en temps réel" },
            { icon: Settings, title: "Personnalisation", desc: "Adaptez l'interface à vos besoins" }
          ].map((feature, i) => (
            <div
              key={i}
              className="relative group rounded-xl border border-white/10 p-6 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity"></div>
              <div className="relative z-10">
                <span className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-600/20 text-blue-400 mx-auto">
                  <feature.icon size={24} />
                </span>
                <h3 className="text-lg font-semibold text-white text-center mb-1">{feature.title}</h3>
                <p className="text-sm text-blue-200/80 text-center leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Types d'utilisateurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-14">
          <div className="relative rounded-xl overflow-hidden group border border-white/10 hover:border-blue-500/50 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-black"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent opacity-60"></div>
            <div className="relative p-8 z-10">
              <h3 className="text-2xl font-bold text-white mb-4">Clients</h3>
              <p className="text-blue-100/80 mb-6">Publiez des offres d'emploi et trouvez les meilleurs talents pour vos projets.</p>
              <ul className="space-y-2 mb-8">
                {["Publiez des offres d'emploi", "Recevez des candidatures ciblées", "Communiquez directement"].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-white">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden group border border-white/10 hover:border-blue-500/50 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-black"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent opacity-60"></div>
            <div className="relative p-8 z-10">
              <h3 className="text-2xl font-bold text-white mb-4">Prestataires</h3>
              <p className="text-blue-100/80 mb-6">Proposez vos services et soyez découvert par les entreprises qui ont besoin de vos compétences.</p>
              <ul className="space-y-2 mb-8">
                {["Publiez votre profil professionnel", "Proposez vos services", "Recevez des opportunités ciblées"].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-white">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* CTA repositionné en haut */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-scale-in">
          {currentUser ? (
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-700/30 transform transition-all duration-200"
            >
              <Link to="/dashboard" className="flex items-center gap-2">
                Accéder à mon compte
                <ArrowRight size={18} />
              </Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-700/30 transform transition-all duration-200"
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
                className="border-2 border-blue-500/30 text-blue-400 font-semibold bg-blue-500/5 hover:bg-blue-600/10 hover:border-blue-400/40 hover:text-white backdrop-blur-md shadow transition-all"
              >
                <Link to="/auth/register">
                  Créer un compte
                </Link>
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
