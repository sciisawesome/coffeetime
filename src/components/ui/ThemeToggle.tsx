// src/components/ui/ThemeToggle.tsx
import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/theme-context";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 ${
        theme === "light" ? "bg-blue-400" : "bg-gray-800"
      }`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span
        className={`block w-6 h-6 rounded-full transition-transform duration-300 ${
          theme === "light"
            ? "bg-yellow-300 translate-x-0"
            : "bg-indigo-300 translate-x-8"
        }`}
      >
        {theme === "light" ? (
          <Sun className="w-6 h-6 text-yellow-600" />
        ) : (
          <Moon className="w-6 h-6 text-indigo-600" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
