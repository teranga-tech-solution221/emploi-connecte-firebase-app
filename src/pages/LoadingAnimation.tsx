
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Users, Bell, Settings } from "lucide-react";

export default function LoadingAnimation() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animation de 3 secondes
    const duration = 3000; // 3 secondes
    const interval = 30; // mise à jour tous les 30ms
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setProgress(Math.min(100, Math.floor((step / steps) * 100)));
      
      if (step >= steps) {
        clearInterval(timer);
        navigate("/dashboard");
      }
    }, interval);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      {/* Logo pulsant */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-2xl animate-pulse"></div>
        <h1 className="text-6xl font-bold text-white relative z-10 animate-bounce">
          Jokko Liguey
        </h1>
      </div>
      
      {/* Cercle d'animation */}
      <div className="relative w-48 h-48 mb-8">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="#111" 
            strokeWidth="8" 
          />
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            className="transform -rotate-90 origin-center transition-all duration-300 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
          {progress}%
        </div>
      </div>
      
      {/* Icons animés */}
      <div className="flex items-center justify-center space-x-12 mt-8">
        <FileText className="h-10 w-10 text-white opacity-0 animate-fade-in" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }} />
        <Users className="h-10 w-10 text-white opacity-0 animate-fade-in" style={{ animationDelay: "1s", animationFillMode: "forwards" }} />
        <Bell className="h-10 w-10 text-white opacity-0 animate-fade-in" style={{ animationDelay: "1.5s", animationFillMode: "forwards" }} />
        <Settings className="h-10 w-10 text-white opacity-0 animate-fade-in" style={{ animationDelay: "2s", animationFillMode: "forwards" }} />
      </div>
      
      <p className="text-blue-400 mt-12 text-lg font-light animate-pulse">
        Préparation de votre environnement...
      </p>
    </div>
  );
}
