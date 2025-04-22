
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LayoutDashboard, Rocket, Star, Bell } from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Tableau intuitif",
    desc: "Pilotez toutes vos candidatures sur une interface claire et rapide, sans vous perdre.",
  },
  {
    icon: Rocket,
    title: "Boost d'efficacité",
    desc: "Des outils et des rappels pour accélérer votre recherche et saisir chaque opportunité.",
  },
  {
    icon: Bell,
    title: "Suivi intelligent",
    desc: "Soyez notifié à chaque étape et ne ratez plus jamais une relance ou une réponse.",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-hidden pb-16">
      {/* Background photo glass effect */}
      <div className="absolute inset-0 dark:opacity-30">
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1400&q=80"
          alt=""
          className="w-full h-full object-cover opacity-20 dark:opacity-10"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75 dark:from-black dark:to-black" aria-hidden="true" />
      </div>

      {/* Hero section */}
      <section className="relative z-10 flex flex-col items-center justify-center grow pt-24 pb-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground text-center drop-shadow-xl tracking-tight mb-6 animate-fade-in">
          FABUS
        </h1>
        <p className="text-xl md:text-2xl text-foreground text-center max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in">
          Le cockpit moderne pour candidater sans stress. Maîtrisez votre avenir pro avec efficacité, style et sérénité.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6 px-2">
          <Button
            asChild
            size="lg"
            className="dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold shadow-lg hover:scale-105 transform transition-all duration-200 animate-scale-in"
          >
            <Link to="/auth/login" className="flex items-center gap-2">
              Commencer
              <span><svg width="24" height="24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6"/></svg></span>
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-foreground/60 text-foreground font-semibold bg-transparent/5 backdrop-blur-md shadow hover:bg-transparent/10 hover:scale-105 transition-all animate-scale-in"
          >
            <Link to="/auth/register">
              Créer un compte
            </Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 flex flex-col items-center w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-10">
          {features.map((feat, i) => (
            <div
              key={i}
              className="dark:glass-morphism dark:bg-black/30 dark:border-white/10 rounded-2xl border shadow-lg p-6 relative group hover:-translate-y-1.5 transition-all duration-300"
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 shadow-lg rounded-full dark:bg-white dark:text-black p-2 w-14 h-14 flex items-center justify-center animate-fade-in">
                <feat.icon size={32} className="dark:text-black" strokeWidth={2.2} />
              </span>
              <h3 className="text-xl font-bold text-foreground text-center mt-10 mb-2 drop-shadow animate-fade-in">{feat.title}</h3>
              <p className="text-foreground text-center text-base font-medium animate-fade-in">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
