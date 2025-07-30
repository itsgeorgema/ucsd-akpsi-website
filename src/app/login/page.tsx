'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../../supabase/client';
import { akpsiColors } from '../../styles/colors';
import { akpsiFonts } from '../../styles/fonts';
import Footer from '../../components/Footer';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const router = useRouter();
  const { checkAuth } = useAuth();
  
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
      // Send password to server for verification
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Update authentication state immediately
        await checkAuth();
        // Navigate to protected page
        router.replace('/actives');
      } else {
        setError(result.error || 'Incorrect password. Please try again.');
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
              <h2 className={`text-4xl ${akpsiColors.heroTitle} ${akpsiFonts.sectionTitleFont} drop-shadow-lg`}>
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
                  className={`appearance-none rounded-lg relative block w-full px-4 py-3 border-2 ${akpsiColors.glassBorder} ${akpsiColors.glassText} placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:z-10 text-base ${akpsiFonts.bodyFont} ${akpsiColors.glassBg} ${akpsiColors.glassBlurMd} shadow-lg transition-all duration-200`}
                  placeholder="Enter password"
                />
              </div>

              {error && (
                <div className={`text-red-300 text-sm text-center ${akpsiFonts.bodyFont}`}>
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-3 px-6 border-2 ${akpsiColors.glassBorder} text-base font-semibold rounded-lg ${akpsiColors.glassBg} ${akpsiColors.glassBgHover} ${akpsiColors.glassText} transition-all duration-200 shadow-lg ${akpsiColors.glassBlurMd} focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${akpsiFonts.bodyFont} hover:shadow-xl hover:scale-105`}
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
