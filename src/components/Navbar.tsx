'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '../../supabase/client';
import { akpsiColors } from '../styles/colors';
import { akpsiFonts } from '../styles/fonts';

export default function Navbar() {
  const pathname = usePathname();
  const [mounted] = useState(false);
  
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const supabase = createClient();
        const { data: logoData } = supabase.storage
          .from('misc')
          .getPublicUrl('akpsiLogo.png');
        
        setLogoUrl(logoData?.publicUrl || '');
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };

    fetchLogo();
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/brothers', label: 'Brothers', dropdown: true },
    { href: '/gallery', label: 'Gallery' },
    { href: '/recruitment', label: 'Recruitment' },
  ];
  
  return (
    <>
      <div className="absolute top-[-2.5rem] left-4 z-50 flex items-center">
        <Link href="/">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Alpha Kappa Psi Logo"
              width={160}
              height={160}
              className="h-40 w-40 object-contain cursor-pointer"
            />
          )}
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