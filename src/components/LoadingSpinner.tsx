
import React, { useEffect, useState } from "react";

const LoadingSpinner = () => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    // Affiche le spinner pendant 2 secondes
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center neo-blur transition-opacity duration-500">
      <div className="relative">
        <div className="absolute inset-0 rounded-full h-16 w-16 border-2 border-indigo-300/30 animate-ping"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
      <p className="mt-4 text-slate-700 dark:text-slate-300 font-medium">Chargement en cours...</p>
    </div>
  );
};

export default LoadingSpinner;
