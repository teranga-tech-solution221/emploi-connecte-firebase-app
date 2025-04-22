
import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

const THEME_KEY = "theme_mode";

export function useThemeMode() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
      if (stored) return stored;
      
      // Si rien n'est stocké, 'light' est la valeur par défaut
      localStorage.setItem(THEME_KEY, "light");
      return "light";
    }
    return "light"; // Défaut à la lumière si window n'est pas disponible
  });

  useEffect(() => {
    const root = window.document.documentElement;

    function applyTheme(mode: ThemeMode) {
      if (mode === "dark") {
        root.classList.add("dark");
      } else if (mode === "light") {
        root.classList.remove("dark");
      } else if (mode === "system") {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    }

    // On n'applique le thème qu'une seule fois au démarrage, pas à chaque changement d'état
    // pour que le mode sombre ne soit activé que lorsque l'utilisateur le choisit explicitement
    applyTheme(theme);

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const systemListener = () => applyTheme("system");
      mq.addEventListener("change", systemListener);
      return () => mq.removeEventListener("change", systemListener);
    }

    return;
  }, [theme]);

  const setThemeMode = (mode: ThemeMode) => {
    setTheme(mode);
    localStorage.setItem(THEME_KEY, mode);
    
    // Appliquer immédiatement le nouveau thème quand l'utilisateur choisit explicitement
    const root = window.document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else if (mode === "light") {
      root.classList.remove("dark");
    } else if (mode === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  return { theme, setThemeMode };
}
