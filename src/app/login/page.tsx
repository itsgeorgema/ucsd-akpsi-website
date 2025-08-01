'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../../supabase/client';
import { colors } from '../../styles/colors';
import { fontCombinations } from '../../styles/fonts';
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
      {/* Enhanced overlay with subtle gradient */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-gradient-to-br from-black/30 via-black/20 to-[#212121]/30" />
      <div className="relative z-20 flex flex-col min-h-screen justify-between">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
                      <div className={`max-w-md w-full space-y-8 p-8 bg-gradient-to-br from-[#F8F8F8]/5 to-[#B3CDE0]/10 backdrop-blur-xl rounded-3xl border border-[#F8F8F8]/20 shadow-2xl`}>
            <div className="text-center mb-8 mt-4">
              <h2 className={`text-4xl bg-gradient-to-r from-[#F8F8F8] to-[#D4AF37] bg-clip-text text-transparent ${fontCombinations.section.main} drop-shadow-lg`}>
                AKPsi Nu Xi
              </h2>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className={`block text-sm mb-2 ${colors.glass.text} ${fontCombinations.navigation.secondary}`}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none rounded-lg relative block w-full px-4 py-3 border-2 ${colors.glass.border} ${colors.glass.text} placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:z-10 ${fontCombinations.content.body} ${colors.glass.bg} backdrop-blur-md shadow-lg transition-all duration-200`}
                  placeholder="Enter password"
                />
              </div>

              {error && (
                <div className={`text-red-300 text-center ${fontCombinations.content.small}`}>
                  {error}
                </div>
              )}

              <div>
                              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-4 px-8 border-2 border-[#B89334] hover:border-[#D4AF37] rounded-xl bg-gradient-to-r from-[#B89334] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B89334] text-[#F8F8F8] transition-all duration-300 shadow-lg hover:shadow-2xl backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${fontCombinations.interactive.primary} transform hover:scale-105 active:scale-95`}
              >
                  {isLoading ? 'Checking...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
