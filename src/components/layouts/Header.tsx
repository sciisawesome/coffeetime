"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Use the auth context
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-3 w-full transition-colors duration-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <span className="ml-2 font-medium text-gray-800 dark:text-white text-lg">
          Monospace
        </span>

        {/* Navigation items and theme toggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Auth Button or User Icon */}
          {!isLoggedIn ? (
            <Link
              href="/auth"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 text-white hover:bg-indigo-700 h-9 px-4 py-2"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                className="flex items-center focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="User menu"
              >
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  {/* User icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>

              {/* User Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-600">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                    Signed in as{" "}
                    <span className="font-bold">{user?.name || "User"}</span>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
