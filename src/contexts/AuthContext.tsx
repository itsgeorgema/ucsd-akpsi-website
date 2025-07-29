'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/validate-session', {
        method: 'POST',
        credentials: 'include',
      });
      
      const result = await response.json();
      setIsAuthenticated(result.valid);
    } catch (error) {
      console.error('Session validation error:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint to clear server-side cookie
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if server call fails
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
    
    // Check when tab becomes visible again (for session expiration)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAuth();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 