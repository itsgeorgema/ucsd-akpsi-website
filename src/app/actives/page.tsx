'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../../../supabase/client';
import { fontCombinations } from '../../styles/fonts';
import { colors } from '../../styles/colors';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useRouter } from 'next/navigation';

interface ResourceButton {
  name: string;
  link?: string;
}

const resourceButtons: ResourceButton[] = [
  { name: 'Active Member Resources' },
  { name: 'Active Linktree' },
  { name: 'Alumni Contacts' },
  { name: 'Family Trees' },
];

// Authentication wrapper component
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await fetch('/api/validate-session', {
          method: 'POST',
          credentials: 'include',
        });
        
        const result = await response.json();
        
        if (!result.valid) {
          // Not authenticated, redirect immediately
          router.replace('/login');
          return;
        }
        
        // Authenticated, allow rendering
        setIsAuthenticated(true);
        setIsChecking(false);
      } catch (error) {
        console.error('Session validation error:', error);
        router.replace('/login');
      }
    };

    validateSession();
  }, [router]);

  // Show nothing while checking or redirecting
  if (isChecking || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

// The actual actives page component
function ActivesPageContent() {
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [links, setLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        
        const supabase = createClient();
        
        // Fetch background image for all users
        const { data: bgData } = supabase.storage.from('background').getPublicUrl('background.jpeg');
        setBackgroundUrl(bgData?.publicUrl || '');
        
        // Fetch links from resources table via API route (server-side with service role)
        const response = await fetch('/api/resources', {
          credentials: 'include', // Include cookies for authentication
        });
        const result = await response.json();
        
        let linksData = null;
        let error = null;
        
        if (response.ok) {
          linksData = result.data;
        } else {
          error = result.error;
        }
        
        if (!error && linksData) {
          // Map the resource names to the correct order
          const resourceMap = {
            'ActiveMemberResources': linksData.find((item: { resource: string; link: string }) => item.resource === 'ActiveMemberResources')?.link,
            'ActiveLinkTree': linksData.find((item: { resource: string; link: string }) => item.resource === 'ActiveLinkTree')?.link,
            'AlumniContacts': linksData.find((item: { resource: string; link: string }) => item.resource === 'AlumniContacts')?.link,
            'FamilyTrees': linksData.find((item: { resource: string; link: string }) => item.resource === 'FamilyTrees')?.link,
          };
          
          const linkUrls = [
            resourceMap.ActiveMemberResources,
            resourceMap.ActiveLinkTree,
            resourceMap.AlumniContacts,
            resourceMap.FamilyTrees
          ].filter(link => link);
          
          setLinks(linkUrls);
        }
      } catch {
        setBackgroundUrl('');
        setLinks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative">
      {/* Full Page Background */}
      <div
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat bg-black"
        style={{ backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined }}
      />
      {/* Overlay for readability */}
      <div className={`fixed top-0 left-0 w-full h-full z-10 bg-black/20`} />
      
      <div className="relative z-20 min-h-screen flex flex-col">
        {loading ? (
          <main className="flex-1 flex items-center justify-center py-16 px-4">
            <LoadingSpinner size="large" fullScreen={false} type="component" />
          </main>
        ) : (
        <>
          {/* Hero Section */}
          <section className="relative flex flex-col items-center justify-center text-center z-10 min-h-screen">
            <div className="relative z-10 flex flex-col items-center">
              <h1 className={`text-5xl lg:text-6xl mb-4 text-center ${colors.text.inverse} ${fontCombinations.hero.title}`}>ACTIVE MEMBER RESOURCES</h1>
              <p className={`text-xl ${colors.glass.textSubtle} text-center mb-8 max-w-2xl ${fontCombinations.content.body}`}>Please do not share any of these resources with people outside of Nu Xi.<br />Make sure to use this responsibly, you are protecting our legacy :)</p>
              <div className="flex flex-col gap-4 w-full max-w-md">
                {resourceButtons.map((item, idx) => {
                  const link = links[idx];
                  return link ? (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative w-full flex justify-center py-4 px-8 border-2 ${colors.glass.border} ${colors.glass.borderHover} text-base rounded-xl ${colors.glass.bg} ${colors.glass.bgHover} ${colors.glass.text} transition-all duration-300 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:ring-offset-2 cursor-pointer ${fontCombinations.interactive.primary} transform hover:scale-105 active:scale-95`}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <button
                      key={idx}
                      className={`block w-full py-4 px-8 rounded-xl border-2 ${colors.glass.border} text-base ${colors.glass.bg} ${colors.glass.text} cursor-not-allowed opacity-50 shadow-lg ${fontCombinations.interactive.primary}`}
                      disabled
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Footer */}
          {!loading && <Footer />}
        </>
        )}
      </div>
    </div>
  );
}

// Main export - wraps the content with authentication guard
export default function ActivesPage() {
  return (
    <AuthGuard>
      <ActivesPageContent />
    </AuthGuard>
  );
} 