
import React from "react";
import { FileText, Users, Bell, Settings } from "lucide-react";

const features = [
  { 
    icon: FileText, 
    title: "Gestion des candidatures", 
    desc: "Suivez et gérez efficacement vos candidatures" 
  },
  { 
    icon: Users, 
    title: "Mise en relation", 
    desc: "Connectez-vous directement avec les recruteurs" 
  },
  { 
    icon: Bell, 
    title: "Notifications", 
    desc: "Restez informé en temps réel" 
  },
  { 
    icon: Settings, 
    title: "Personnalisation", 
    desc: "Adaptez votre expérience" 
  }
];

export default function Features() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-5xl mb-14">
      {features.map((feature, i) => (
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
  );
}
