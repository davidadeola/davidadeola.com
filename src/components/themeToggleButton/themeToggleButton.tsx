"use client";

import React from "react";
import type { UseThemeReturnType } from "Hooks/useTheme";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleButtonProps {
  theme: UseThemeReturnType["theme"];
  themeToggler: UseThemeReturnType["themeToggler"];
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  themeToggler,
  theme,
}) => {
  return (
    <button
      onClick={themeToggler}
      aria-label="Toggle theme"
      className="flex justify-center items-center cursor-pointer transition-colors duration-200 hover:text-color-blue focus:text-color-blue focus:outline-none"
    >
      <div className="relative p-[6px] border border-[#E1E1E1]/50">
        {theme === "dark" ? (
          <Sun size={20} strokeWidth={1.5} />
        ) : (
          <Moon size={20} strokeWidth={1.5} />
        )}
      </div>
    </button>
  );
};

export default ThemeToggleButton;
