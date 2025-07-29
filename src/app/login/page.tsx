'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../../supabase/client';
import { akpsiColors } from '../../styles/colors';
import { akpsiFonts } from '../../styles/fonts';
import Footer from '../../components/Footer';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState('');

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const supabase = createClient();
        // Fetch background image
        const { data: bgData } = supabase.storage.from('background').getPublicUrl('background.jpeg');
        setBackgroundUrl(bgData?.publicUrl || '');
      } catch {
        setBackgroundUrl('');
      }
    };
    fetchBackground();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Check password against environment variable
      const correctPassword = process.env.NEXT_PUBLIC_ACTIVE_PASSWORD;
      
      if (password === correctPassword) {
        // Store authentication in localStorage only
        localStorage.setItem('akpsi-auth', 'true');
        localStorage.setItem('akpsi-auth-time', Date.now().toString());
        
        // Force immediate navigation
        window.location.replace('/members');
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between">
      {/* Background image */}
      {backgroundUrl && (
        <div
          className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />
      )}
      {/* Overlay for readability */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-black/20" />
      <div className="relative z-20 flex flex-col min-h-screen justify-between">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="max-w-md w-full space-y-8 p-8">
            <div className="text-center mb-8">
              <h2 className={`text-4xl ${akpsiColors.black} ${akpsiFonts.sectionTitleFont} drop-shadow-lg`}>
                AKPsi Nu Xi
              </h2>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none rounded-lg relative block w-full px-4 py-3 ${akpsiColors.inputBorder} ${akpsiColors.inputPlaceholder} ${akpsiColors.black} focus:outline-none focus:ring-2 ${akpsiColors.focusRing} ${akpsiColors.focusBorder} focus:z-10 text-base ${akpsiFonts.bodyFont} ${akpsiColors.inputGlass} ${akpsiColors.inputFocus} backdrop-blur-md shadow-lg transition-all duration-200`}
                  placeholder="Enter password"
                />
              </div>

              {error && (
                <div className={`${akpsiColors.errorText} text-sm text-center ${akpsiFonts.bodyFont}`}>
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-3 px-6 border-2 ${akpsiColors.inputBorder} text-base font-semibold rounded-lg ${akpsiColors.glassBg} ${akpsiColors.glassHover} ${akpsiColors.glassText} ${akpsiColors.glassHoverText} transition-all duration-200 shadow-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${akpsiColors.focusRing} disabled:opacity-50 disabled:cursor-not-allowed ${akpsiFonts.bodyFont} hover:shadow-xl hover:scale-105`}
                >
                  {isLoading ? 'Checking...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
