// src/app/layout.tsx
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider } from "@/context/theme-context";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { NotesProvider } from "@/context/notes-context";
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[#ebdbb2] dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-200`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            <NotesProvider>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </NotesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
