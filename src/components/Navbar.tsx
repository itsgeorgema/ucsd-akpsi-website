'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { akpsiColors } from '../styles/colors';
import { akpsiFonts } from '../styles/fonts';

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  // Simple function to check if user is authenticated
  const isUserAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    
    // Check localStorage only
    return localStorage.getItem('akpsi-auth') === 'true';
  };

  // Force immediate authentication check - this happens BEFORE any React rendering
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Immediately check auth and force state update
    const authStatus = isUserAuthenticated();
    setIsAuthenticated(authStatus);
    setMounted(true);
    
    // Only check auth periodically for login/logout changes
    const checkAuthPeriodically = () => {
      const currentAuthStatus = isUserAuthenticated();
      if (currentAuthStatus !== isAuthenticated) {
        setIsAuthenticated(currentAuthStatus);
      }
    };
    
    // Check every 1 second for auth changes only
    const interval = setInterval(checkAuthPeriodically, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, []); // Only run once on mount

  // Only recreate navItems when authentication state changes
  const navItems = useMemo(() => [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/brothers', label: 'Brothers', dropdown: true },
    { href: '/gallery', label: 'Gallery' },
    { href: '/recruitment', label: 'Recruitment' },
    ...(isAuthenticated ? [{ href: '/members', label: 'Resources' }] : []),
  ], [isAuthenticated]);
  
  return (
    <>
      <div className="absolute top-[-2.5rem] left-4 z-50 flex items-center">
        <Link href="/">
          <img
            src="/akpsiLogo.png"
            alt="Alpha Kappa Psi Logo"
            className="h-40 w-40 object-contain cursor-pointer"
          />
        </Link>
      </div>
      <nav className="absolute top-4 right-4 z-50">
        <div className={`${akpsiColors.navBarBg} rounded-lg shadow-lg border ${akpsiColors.navBarBorder}`}>
          <div className="flex items-center">
            <div className="block">
              <div className="flex items-center">
                {navItems.map((item) => {
                  const isActive = mounted && pathname === item.href;

                  if (item.dropdown) {
                    return (
                      <div key={item.href} className="relative group">
                        <div>
                          <button
                            className={`px-6 py-3 text-sm ${akpsiFonts.navBarFont} transition-colors focus:outline-none ${isActive ? `${akpsiColors.navBarTextActive} ${akpsiColors.navBarBgActive}` : `${akpsiColors.navBarText} ${akpsiColors.navBarTextHover} ${akpsiColors.navBarBgHover}`}`}
                            aria-haspopup="true"
                            aria-expanded="false"
                            tabIndex={0}
                          >
                            {item.label}
                          </button>
                          <div className={`absolute left-1/2 -translate-x-1/2 mt-0 w-44 ${akpsiColors.navBarBg} ${akpsiColors.navBarBorder} border rounded-lg shadow-lg flex flex-col z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity`}
                            tabIndex={-1}>
                              {[
                                { href: '/brothers/executive', label: 'EXECUTIVE COMMITTEE' },
                                { href: '/brothers/active', label: 'ACTIVE BROTHERS' },
                              ].map((dropdownItem) => {
                                const isDropdownActive = mounted && pathname === dropdownItem.href;
                                return (
                                  <Link
                                    key={dropdownItem.href}
                                    href={dropdownItem.href}
                                    className={`px-3 py-2 text-xs ${akpsiFonts.navBarFont} transition-colors whitespace-nowrap text-ellipsis
                                      ${isDropdownActive ? `${akpsiColors.navBarTextActive} ${akpsiColors.navBarBgActive}` : `${akpsiColors.navBarText} ${akpsiColors.navBarTextHover} ${akpsiColors.navBarBgHover}`}
                                    `}
                                  >
                                    {dropdownItem.label}
                                  </Link>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-6 py-3 text-sm ${akpsiFonts.navBarFont} transition-colors
                        ${isActive ? `${akpsiColors.navBarTextActive} ${akpsiColors.navBarBgActive}` : `${akpsiColors.navBarText} ${akpsiColors.navBarTextHover} ${akpsiColors.navBarBgHover}`}
                      `}
                    >
                      {item.label}
                    </Link>
                  );
                })}

              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}