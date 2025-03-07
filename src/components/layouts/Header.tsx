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
    <header className="dark:bg-[rgb(60,56,54)] shadow-sm py-3 w-full transition-colors duration-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <span className="ml-2 dark:text-[rgb(235,219,178)] text-lg">
          Monospace
        </span>

        {/* Navigation items and theme toggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Auth Button or User Icon */}
          {!isLoggedIn ? (
            <Link
              href="/auth"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(80,73,69)] dark:focus-visible:ring-[rgb(213,196,161)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[rgb(204,36,29)] dark:bg-[rgb(251,73,52)] text-[rgb(251,241,199)] dark:text-[rgb(40,40,40)] hover:bg-opacity-90 h-9 px-4 py-2"
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
                <div className="w-9 h-9 rounded-full bg-[rgb(69,133,136)] dark:bg-[rgb(131,165,152)] flex items-center justify-center text-[rgb(251,241,199)] dark:text-[rgb(40,40,40)]">
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
                <div className="absolute right-0 mt-2 w-48 bg-[rgb(235,219,178)] dark:bg-[rgb(60,56,54)] rounded-md shadow-lg py-1 z-10 border border-[rgb(213,196,161)] dark:border-[rgb(80,73,69)]">
                  <div className="px-4 py-2 text-sm text-[rgb(60,56,54)] dark:text-[rgb(235,219,178)] border-b border-[rgb(213,196,161)] dark:border-[rgb(80,73,69)]">
                    Signed in as{" "}
                    <span className="font-bold">{user?.name || "User"}</span>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-[rgb(60,56,54)] dark:text-[rgb(235,219,178)] hover:bg-[rgb(213,196,161)] dark:hover:bg-[rgb(80,73,69)]"
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-[rgb(60,56,54)] dark:text-[rgb(235,219,178)] hover:bg-[rgb(213,196,161)] dark:hover:bg-[rgb(80,73,69)]"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-[rgb(60,56,54)] dark:text-[rgb(235,219,178)] hover:bg-[rgb(213,196,161)] dark:hover:bg-[rgb(80,73,69)]"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Add this link near your other navigation items */}
          {isLoggedIn && (
            <Link
              href="/second-brain"
              className="text-[rgb(60,56,54)] dark:text-[rgb(235,219,178)] hover:text-[rgb(69,133,136)] dark:hover:text-[rgb(131,165,152)] mr-4"
            >
              Second Brain
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
