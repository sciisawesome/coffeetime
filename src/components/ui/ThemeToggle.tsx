// src/components/ui/ThemeToggle.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/theme-context";

const ThemeToggle = () => {
  // Create local state to handle before context is ready
  const [mounted, setMounted] = useState(false);
  const [localTheme, setLocalTheme] = useState<"light" | "dark">("light");

  // Safely get theme from context
  const themeContext = useTheme();

  // Once mounted, sync with context
  useEffect(() => {
    setMounted(true);
    if (themeContext) {
      setLocalTheme(themeContext.theme);
    }
  }, [themeContext]);

  const toggleTheme = () => {
    const newTheme = localTheme === "light" ? "dark" : "light";
    setLocalTheme(newTheme);
    if (themeContext) {
      themeContext.setTheme(newTheme);
    }
  };

  // Don't render the toggle until after client-side hydration
  if (!mounted) {
    return <div className="w-16 h-8" />; // Placeholder to prevent layout shift
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 ${
        localTheme === "light"
          ? "bg-[rgb(189,174,147)]" // Gruvbox light muted
          : "bg-[rgb(124,111,100)]" // Gruvbox dark muted
      }`}
      aria-label={`Switch to ${localTheme === "light" ? "dark" : "light"} mode`}
    >
      <span
        className={`block w-6 h-6 rounded-full transition-transform duration-300 ${
          localTheme === "light"
            ? "bg-[rgb(215,153,33)] translate-x-0" // Gruvbox light yellow
            : "bg-[rgb(250,189,47)] translate-x-8" // Gruvbox dark yellow
        } flex items-center justify-center`}
      >
        {localTheme === "light" ? (
          <Sun className="w-4 h-4 text-[rgb(251,241,199)]" /> // Light on dark
        ) : (
          <Moon className="w-4 h-4 text-[rgb(40,40,40)]" /> // Dark on light
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
