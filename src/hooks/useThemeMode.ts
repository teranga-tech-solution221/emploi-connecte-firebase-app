
// Correction : cette version permet de ne changer le mode sombre que par la fonction setThemeMode, JAMIS via system.
// On ne propose plus le mode "system".
// Le thème n'est changé que via le switch de la sidebar.

import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

const THEME_KEY = "theme_mode";

export function useThemeMode() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
      if (stored === "dark" || stored === "light") return stored;
      localStorage.setItem(THEME_KEY, "light");
      return "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const setThemeMode = (mode: ThemeMode) => {
    setTheme(mode);
    localStorage.setItem(THEME_KEY, mode);
    const root = window.document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  return { theme, setThemeMode };
}

