'use client';

import { colorPalette, colors } from '../styles/colors';
import { akpsiFonts, hierarchyWeights } from '../styles/fonts';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  
  const socialIcons = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/ucsdakpsi/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/akpsiucsd/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/UCSDAlphaKappaPsi/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className={`relative ${colors.section.titleBg} ${className}`}>
      {/* Top banner with grid pattern */}
      <div className={`h-2 bg-[${colorPalette.gold.muted}] opacity-80`}></div>
      
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-4 md:mb-6 items-start justify-between mt-4">
          {/* Left Column - Organization Info */}
          <div className="space-y-2 md:space-y-3 mb-4 md:mb-0 flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3">
              <img 
                src="/assets/akpsiLogo.png" 
                alt="Alpha Kappa Psi Logo" 
                className="h-40 w-40 object-contain cursor-pointer mb-[-55px] mt-[-50px] md:mt-[-50px]"
                onClick={() => router.push('/')}
              />
            </div>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="space-y-2 md:space-y-3 mb-4 md:mb-0 flex flex-col items-center md:items-start">
            <h3 className={`text-3xl ${colors.text.inverse} ${akpsiFonts.sectionTitleFont} ${hierarchyWeights.footer} mb-6`}>
              Quick Links
            </h3>
            <div className="space-y-3 md:space-y-3 flex flex-col items-center md:items-start">
              <div className="space-y-2 md:space-y-1 flex flex-col items-center md:items-start">
              <a 
                href="https://akpsiucsd.app" 
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm ${colors.text.inverse} opacity-70 hover:opacity-100 transition-opacity ${colors.footer.link} underline ${akpsiFonts.bodyFont}`}
              >
                  Rush Website
              </a>
              <a 
                href="/contact" 
                className={`text-sm ${colors.text.inverse} opacity-70 hover:opacity-100 transition-opacity ${colors.footer.link} underline ${akpsiFonts.bodyFont}`}
              >
                  Contact Us
              </a>
              <a 
                href="https://akpsi.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-sm ${colors.text.inverse} opacity-70 hover:opacity-100 transition-opacity ${colors.footer.link} underline ${akpsiFonts.bodyFont}`}
              >
                Official Website
              </a>
              </div>
            </div>
          </div>

          {/* Right Column - Rush Info */}
          <div className="space-y-2 md:space-y-3 flex flex-col items-center md:items-start">
            <h3 className={`text-3xl ${colors.text.inverse} ${akpsiFonts.sectionTitleFont} ${hierarchyWeights.footer} mb-6`}>
              Fall &apos;25 Rush Contacts
            </h3>
            <div className="space-y-3 md:space-y-3 flex flex-col items-center md:items-start">
              <div className="space-y-2 md:space-y-1 flex flex-col items-center md:items-start">
                <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2">
                  <p className={`text-sm ${colors.text.inverse} opacity-60 ${akpsiFonts.bodyFont}`}>
                    Amanda Wu:
                  </p>
                  <a 
                    href="tel:+19495728948" 
                    className={`block text-sm ${colors.text.inverse} opacity-70 hover:opacity-100 transition-opacity ${colors.footer.link} ${akpsiFonts.bodyFont}`}
                  >
                    <u>
                      (949)-572-8948
                    </u>
                  </a>
                </div>
                
                <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2">
                  <p className={`text-sm ${colors.text.inverse} opacity-60 ${akpsiFonts.bodyFont}`}>
                    Joshua Hoffmann:
                  </p>
                  <a 
                    href="tel:+15106349132" 
                    className={`block text-sm ${colors.text.inverse} opacity-70 hover:opacity-100 transition-opacity ${colors.footer.link} ${akpsiFonts.bodyFont}`}
                  >
                    <u>
                      (510)-634-9132
                    </u>
                  </a>
                </div>
                
                <p className={`text-sm ${colors.text.inverse} ${akpsiFonts.bodyFont}`}>
                  <a href="mailto:akpfallrush25@gmail.com" className={`text-sm ${colors.text.inverse} opacity-70 hover:opacity-100 transition-opacity ${colors.footer.link} ${akpsiFonts.bodyFont}`}>
                    <u>
                    akpfallrush25@gmail.com
                    </u>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links and Login Section */}
        <div className="flex flex-col md:flex-row items-center justify-start md:justify-between space-y-4 md:space-y-0 pt-6">
          <div className="flex items-center space-x-6">
            {socialIcons.map((social) => (
              <a 
                key={social.name}
                href={social.href || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`${colors.footer.icon} transition-colors ${!social.href ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label={social.name}
                onClick={!social.href ? (e) => e.preventDefault() : undefined}
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          {/* Login/Logout Button */}
          <button
            className={`${colors.footer.link} ${akpsiFonts.sectionSubtitleFont} underline cursor-pointer transition-colors`}
            onClick={() => {
              if (isAuthenticated) {
                logout();
                router.push('/');
              } else {
                router.push('/login');
              }
            }}
          >
            {isAuthenticated === undefined ? 'LOGIN' : isAuthenticated ? 'LOGOUT' : 'LOGIN'}
          </button>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-[#9E9E9E]/30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center space-y-0">
          <p className={`text-sm ${colors.text.inverse} opacity-60 ${akpsiFonts.bodyFont} text-center whitespace-nowrap`}>
            &copy; {new Date().getFullYear()} UCSD Alpha Kappa Psi. All rights reserved.
          </p>
          <p className={`text-sm ${colors.text.inverse} opacity-60 ${akpsiFonts.bodyFont} flex items-center`}>
            <a href="/terms" className={`text-sm ${colors.text.inverse} opacity-70 hover:opacity-100 transition-opacity ${colors.footer.link} ${akpsiFonts.bodyFont}`}>
              <u>
                Terms of Service
              </u>
            </a>
            <span className="mx-2 text-[#9E9E9E] opacity-50">|</span>
            <a href="/privacy" className={`text-sm ${colors.text.inverse} opacity-70 hover:opacity-100 transition-opacity ${colors.footer.link} ${akpsiFonts.bodyFont}`}>
              <u>
                Privacy Policy
              </u>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
} 