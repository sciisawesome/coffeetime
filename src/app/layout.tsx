// src/app/layout.tsx
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider } from "@/context/theme-context";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add no-flash script to prevent theme flickering */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Check localStorage first
                let theme = localStorage.getItem('theme');
                // If no theme in localStorage, check system preference
                if (!theme) {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                // Apply theme immediately to prevent flash
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-200`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
