'use client'
// src/context/auth-context.tsx
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define User type
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin'; // Optional: for role-based access control
}

// Define the shape of your Auth Context
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

// Create context with undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps your app and makes auth object available
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on first load
  useEffect(() => {
    // In a real app, this would verify a token with your backend
    const checkExistingSession = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };
    
    checkExistingSession();
  }, []);

  // Simulated login - in a real app, this would call your API
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Demo credentials check
      if (email === 'demo@example.com' && password === 'password') {
        const userData: User = {
          id: 1,
          name: 'Demo User',
          email: 'demo@example.com',
          avatar: `https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff`,
          role: 'user'
        };
        
        // Save to state and localStorage
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated logout
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  // Simulated signup
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create new user - in a real app this would call your API
      const userData: User = {
        id: Date.now(), // Generate random ID
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=0D8ABC&color=fff`,
        role: 'user'
      };
      
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated profile update
  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update user data
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Create the value object that will be provided to consumers
  const value = {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
    signup,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}