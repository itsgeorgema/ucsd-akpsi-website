'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const authToken = document.cookie.includes('auth-token=true');
    const sessionAuth = sessionStorage.getItem('isAuthenticated') === 'true';
    const newAuthState = authToken || sessionAuth;
    console.log('AuthContext - Checking auth:', { authToken, sessionAuth, newAuthState });
    setIsAuthenticated(newAuthState);
  };

  useEffect(() => {
    checkAuth();
    
    // Check periodically
    const interval = setInterval(checkAuth, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>
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