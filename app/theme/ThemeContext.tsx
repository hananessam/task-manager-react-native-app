import { createContext, useContext, useMemo, useState } from "react";

import { TaskTheme, ThemeName, taskThemes } from "./taskTheme";

type ThemeContextValue = {
  themeName: ThemeName;
  theme: TaskTheme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Readonly<ThemeProviderProps>) {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  const value = useMemo(() => {
    const isDark = themeName === "dark";

    return {
      themeName,
      theme: taskThemes[themeName],
      isDark,
      toggleTheme: () => {
        setThemeName((current) => (current === "dark" ? "light" : "dark"));
      },
    };
  }, [themeName]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTaskTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTaskTheme must be used within ThemeProvider");
  }

  return context;
}
