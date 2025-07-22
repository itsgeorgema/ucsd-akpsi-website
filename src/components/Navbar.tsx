'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { akpsiColors } from '../styles/colors';
import { akpsiFonts } from '../styles/fonts';

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/brothers', label: 'Brothers' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/recruitment', label: 'Recruitment' },
  ];

  return (
    <nav className="absolute top-4 right-4 z-50">
      <div className={`${akpsiColors.navBarBg} backdrop-blur-sm rounded-lg shadow-lg border ${akpsiColors.navBarBorder}`}>
        <div className="flex items-center">
          <div className="hidden md:block">
            <div className="flex items-center">
              {navItems.map((item) => {
                const isActive = mounted && pathname === item.href;
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

          {/* Mobile menu button */}
          <div className="md:hidden px-6 py-3">
            <button className="text-white hover:text-white/80 focus:outline-none focus:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 