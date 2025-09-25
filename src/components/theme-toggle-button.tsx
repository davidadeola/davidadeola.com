"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleButton() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const activeTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <button
      aria-label="Toggle Theme"
      className={`cursor-pointer border border-[#353535]/30 dark:border-[#353535] hover:bg-[#353535]/10 hover:dark:bg-[#353535] h-10 w-10 flex items-center justify-center dark:text-white`}
      onClick={toggleTheme}
    >
      {activeTheme === "light" ? (
        <Sun size={20} strokeWidth={1.5} />
      ) : (
        <Moon size={20} strokeWidth={1.5} />
      )}
    </button>
  );
}
