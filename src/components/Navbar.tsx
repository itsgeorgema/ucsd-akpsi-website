'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { akpsiColors } from '../styles/colors';
import { akpsiFonts } from '../styles/fonts';

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/brothers', label: 'Brothers', dropdown: true },
    { href: '/gallery', label: 'Gallery' },
    { href: '/recruitment', label: 'Recruitment' },
  ];

  return (
    <nav className="absolute top-4 right-4 z-50">
      <div className="fixed top-[-2.5rem] left-4 z-50 flex items-center">
        <Link href="/">
          <img
            src="/akpsiLogo.png"
            alt="Alpha Kappa Psi Logo"
            className="h-40 w-40 object-contain cursor-pointer"
          />
        </Link>
      </div>
      
      <div className={`${akpsiColors.navBarBg} backdrop-blur-sm rounded-lg shadow-lg border ${akpsiColors.navBarBorder}`}>
        <div className="flex items-center">
          <div className="hidden md:block">
            <div className="flex items-center">
              {navItems.map((item) => {
                const isActive = mounted && pathname === item.href;
                if (item.dropdown) {
                  return (
                    <div key={item.href} className="relative">
                      <button
                        className={`px-6 py-3 text-sm ${akpsiFonts.navBarFont} transition-colors rounded-md focus:outline-none ${isActive ? `${akpsiColors.navBarTextActive} ${akpsiColors.navBarBgActive}` : `${akpsiColors.navBarText} ${akpsiColors.navBarTextHover}`}`}
                        onClick={() => setDropdownOpen((open) => !open)}
                        onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen}
                      >
                        {item.label}
                      </button>
                      {dropdownOpen && (
                        <div className={`absolute left-1/2 -translate-x-1/2 mt-2 w-44 ${akpsiColors.navBarBg} ${akpsiColors.navBarBorder} border rounded-lg shadow-lg flex flex-col z-50`}>
                          <Link
                            href="/brothers/executive"
                            className={`px-3 py-1 text-xs ${akpsiFonts.navBarFont} transition-colors rounded-t-lg ${akpsiColors.navBarText} ${akpsiColors.navBarTextHover} whitespace-nowrap text-ellipsis`}
                            onClick={() => setDropdownOpen(false)}
                          >
                            EXECUTIVE COMMITTEE
                          </Link>
                          <Link
                            href="/brothers/active"
                            className={`px-3 py-1 text-xs ${akpsiFonts.navBarFont} transition-colors rounded-b-lg ${akpsiColors.navBarText} ${akpsiColors.navBarTextHover} whitespace-nowrap text-ellipsis`}
                            onClick={() => setDropdownOpen(false)}
                          >
                            ACTIVE BROTHERS
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-6 py-3 text-sm ${akpsiFonts.navBarFont} transition-colors rounded-md
                      ${isActive ? `${akpsiColors.navBarTextActive} ${akpsiColors.navBarBgActive}` : `${akpsiColors.navBarText} ${akpsiColors.navBarTextHover}`}
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
  );
}