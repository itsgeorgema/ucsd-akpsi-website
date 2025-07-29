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
        credentials: 'include', // Include cookies
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
      // Clear client-side storage for backward compatibility
      localStorage.removeItem('akpsi-auth');
      localStorage.removeItem('akpsi-auth-time');
      sessionStorage.removeItem('isAuthenticated');
      
      // Call logout endpoint to clear server-side cookie
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      setIsAuthenticated(false);
      
      // Dispatch custom event for immediate UI updates
      window.dispatchEvent(new Event('auth-change'));
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if server call fails
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
    
    // Event-driven auth updates for better performance
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'isAuthenticated' || e.key === 'akpsi-auth') {
        checkAuth();
      }
    };
    
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAuth();
      }
    };

    // Custom event listener for immediate auth updates
    const handleAuthChange = () => {
      checkAuth();
    };
    
    // Listen for storage changes (cross-tab auth updates)
    window.addEventListener('storage', handleStorageChange);
    
    // Check when tab becomes visible again
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Listen for custom auth change events
    window.addEventListener('auth-change', handleAuthChange);
    
    // Periodic check every 5 minutes for session expiration
    const interval = setInterval(checkAuth, 5 * 60 * 1000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('auth-change', handleAuthChange);
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