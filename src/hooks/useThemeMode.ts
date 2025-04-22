
import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

const THEME_KEY = "theme_mode";

export function useThemeMode() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
      return stored || "system";
    }
    return "system";
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
  };

  return { theme, setThemeMode };
}
