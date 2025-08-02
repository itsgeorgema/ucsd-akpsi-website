'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '../../supabase/client';
import { colors } from '../styles/colors';
import { fontCombinations, hierarchyWeights } from '../styles/fonts';
import { useAuth } from '../contexts/AuthContext';

type NavSubItem = {
  href: string;
  label: string;
};

type NavItem = {
  href: string;
  label: string;
  dropdown?: boolean;
  subItems?: NavSubItem[];
};

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    setMounted(true);
    
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

  const baseNavItems: NavItem[] = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { 
      href: '/brothers', 
      label: 'BROTHERS', 
      dropdown: true,
      subItems: [
        { href: '/brothers/executive', label: 'EXECUTIVE COMMITTEE' },
        { href: '/brothers/active', label: 'ACTIVE BROTHERS' },
      ]
    },
    { href: '/gallery', label: 'GALLERY' },
    { href: '/recruitment', label: 'RECRUITMENT' },
    { href: '/contact', label: 'CONTACT' },
  ];

  // Only add Actives after component mounts to prevent hydration mismatch
  const navItems: NavItem[] = mounted && isAuthenticated 
    ? [...baseNavItems, { href: '/actives', label: 'ACTIVES' }]
    : baseNavItems;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown(null); // Close any open dropdowns when menu toggles
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };
  
  return (
    <>
      {/* Logo */}
      <div className="absolute top-[-2.25rem] left-4 z-50">
        <Link href="/" onClick={closeMenu}>
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Alpha Kappa Psi Logo"
              className="h-40 w-40 object-contain cursor-pointer"
            />
          )}
        </Link>
      </div>

      {/* Hamburger Menu Button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleMenu}
          className={`bg-white/25 cursor-pointer border border-white backdrop-blur-md rounded-lg p-4 shadow-lg transition-all duration-300 hover:${colors.glass.bgHover}`}
          aria-label="Toggle navigation menu"
        >
          <div className="relative w-6 h-6">
            <span className={`absolute top-2.5 left-0 w-6 h-0.5 ${colors.glass.text} bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45' : 'rotate-0 -translate-y-1.5'}`}></span>
            <span className={`absolute top-2.5 left-0 w-6 h-0.5 ${colors.glass.text} bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`absolute top-2.5 left-0 w-6 h-0.5 ${colors.glass.text} bg-current rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'rotate-0 translate-y-1.5'}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
          onClick={closeMenu}
        ></div>
      )}

      {/* Slide-out Menu */}
      <nav className={`fixed top-0 right-0 h-full w-80 ${colors.glass.bg} backdrop-blur-xl border-l ${colors.glass.border} shadow-2xl transform transition-transform duration-300 ease-in-out z-[9999] ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Menu Items */}
          <div className="flex-1 flex flex-col space-y-2">
            {navItems.map((item: NavItem) => {
              const isActive = mounted && pathname === item.href;
              const isDropdownActive = item.subItems && mounted && item.subItems.some((subItem: NavSubItem) => pathname === subItem.href);
              
              if (item.dropdown && item.subItems) {
                return (
                  <div key={item.href} className="space-y-1">
                    {/* Dropdown Parent */}
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`group flex cursor-pointer items-center w-full px-6 py-4 rounded-lg border nav-shine ${
                        isDropdownActive || openDropdown === item.label
                          ? `${colors.glass.bgHover} ${colors.glass.borderHover} backdrop-blur-sm` 
                          : `border-transparent`
                      }`}
                    >
                      <span className={`${fontCombinations.navigation.primary} transition-colors duration-50 ease-out ${
                        isDropdownActive || openDropdown === item.label
                          ? colors.nav.textActive 
                          : `${colors.glass.text} group-hover:${colors.nav.textActive}`
                      }`}>
                        {item.label}
                      </span>
                      <svg 
                        className={`ml-auto w-5 h-5 transition-[transform,color] duration-50 ease-out transform ${
                          openDropdown === item.label ? 'rotate-90' : ''
                        } ${
                          isDropdownActive || openDropdown === item.label
                            ? colors.nav.textActive 
                            : `${colors.glass.textSubtle} group-hover:${colors.nav.textActive}`
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Items */}
                    {openDropdown === item.label && (
                      <div className="ml-4 space-y-1">
                        {item.subItems.map((subItem: NavSubItem) => {
                          const isSubActive = mounted && pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={closeMenu}
                              className={`group flex items-center px-6 py-3 rounded-lg border nav-shine ${
                                isSubActive 
                                  ? `${colors.glass.bgHover} ${colors.glass.borderHover} backdrop-blur-sm` 
                                  : `border-transparent`
                              }`}
                            >
                              <span className={`${fontCombinations.navigation.secondary} transition-colors duration-50 ease-out ${
                                isSubActive 
                                  ? colors.nav.textActive 
                                  : `${colors.glass.text} group-hover:${colors.nav.textActive}`
                              }`}>
                                {subItem.label}
                              </span>
                              <svg 
                                className={`ml-auto w-4 h-4 transition-[transform,color] duration-50 ease-out transform group-hover:translate-x-1 ${
                                  isSubActive 
                                    ? colors.nav.textActive 
                                    : `${colors.glass.text} group-hover:${colors.nav.textActive}`
                                }`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              
              // Regular menu item
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`group flex items-center px-6 py-4 rounded-lg border nav-shine ${
                    isActive 
                      ? `${colors.glass.bgHover} ${colors.glass.borderHover} backdrop-blur-sm` 
                      : `border-transparent`
                  }`}
                >
                  <span className={`${fontCombinations.navigation.primary} transition-colors duration-50 ease-out ${
                    isActive 
                      ? colors.nav.textActive 
                      : `${colors.glass.text} group-hover:${colors.nav.textActive}`
                  }`}>
                    {item.label}
                  </span>
                  <svg 
                    className={`ml-auto w-5 h-5 transition-[transform,color] duration-50 ease-out transform group-hover:translate-x-1 ${
                      isActive 
                        ? colors.nav.textActive 
                        : `${colors.glass.textSubtle} group-hover:${colors.nav.textActive}`
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </div>

          {/* Footer Section */}
          <div className="border-t border-white/20 pt-6 pb-8">
            <div className="text-center">
              <p className={`${colors.glass.textSubtle} ${fontCombinations.content.small} ${hierarchyWeights.footer}`}>
                ALPHA KAPPA PSI
              </p>
              <p className={`${colors.glass.textSubtle} ${fontCombinations.content.small} ${hierarchyWeights.footer}`}>
                NU XI est. 2019
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}