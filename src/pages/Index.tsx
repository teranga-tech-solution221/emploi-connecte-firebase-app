
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import Features from "@/components/home/Features";

export default function Index() {
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
      
      <main className="container mx-auto flex flex-col items-center justify-start grow pt-20 pb-20 px-4 relative z-10">
        <HeroSection />
        <Features />
      </main>
    </div>
  );
}
