// src/components/ui/ThemeToggle.tsx
"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/theme-context";

const ThemeToggle = () => {
  // Get theme from context, including the mounted state
  const { theme, setTheme, isMounted } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Don't render the toggle until after client-side hydration
  if (!isMounted) {
    return <div className="w-16 h-8" />; // Placeholder to prevent layout shift
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 ${
        theme === "light"
          ? "bg-[rgb(189,174,147)]" // Gruvbox light muted
          : "bg-[rgb(124,111,100)]" // Gruvbox dark muted
      }`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span
        className={`block w-6 h-6 rounded-full transition-transform duration-300 ${
          theme === "light"
            ? "bg-[rgb(215,153,33)] translate-x-0" // Gruvbox light yellow
            : "bg-[rgb(250,189,47)] translate-x-8" // Gruvbox dark yellow
        } flex items-center justify-center`}
      >
        {theme === "light" ? (
          <Sun className="w-4 h-4 text-[rgb(251,241,199)]" /> // Light on dark
        ) : (
          <Moon className="w-4 h-4 text-[rgb(40,40,40)]" /> // Dark on light
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
