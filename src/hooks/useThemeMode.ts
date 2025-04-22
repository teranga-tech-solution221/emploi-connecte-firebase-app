
// Correction : s’assurer qu’on n’active le mode dark QUE quand il est choisi ou “system” en mode sombre.
// Ne pas "forcer" le dark lors d’un simple accès aux paramètres.
import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

const THEME_KEY = "theme_mode";

export function useThemeMode() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
      if (stored) return stored;
      localStorage.setItem(THEME_KEY, "light");
      return "light";
    }
    return "light";
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
