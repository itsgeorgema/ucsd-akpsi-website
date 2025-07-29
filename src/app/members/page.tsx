'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../../../supabase/client';
import { akpsiFonts } from '../../styles/fonts';
import { akpsiColors } from '../../styles/colors';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';

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

  useEffect(() => {
    // Check authentication immediately
    const isAuth = localStorage.getItem('akpsi-auth') === 'true';
    
    if (!isAuth) {
      // Not authenticated, redirect immediately
      window.location.href = '/login';
      return;
    }
    
    // Authenticated, allow rendering
    setIsAuthenticated(true);
    setIsChecking(false);
  }, []);

  // Show nothing while checking or redirecting
  if (isChecking || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

// The actual members page component
function MembersPageContent() {
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
        
        console.log('User is authenticated, proceeding');
        
        // Fetch links from resources table via API route (server-side with service role)
        const response = await fetch('/api/resources');
        const result = await response.json();
        
        let linksData = null;
        let error = null;
        
        if (response.ok) {
          linksData = result.data;
        } else {
          error = result.error;
          console.error('API error:', error);
        }
        
        if (!error && linksData) {
          // Map the resource names to the correct order
          const resourceMap = {
            'ActiveMemberResources': linksData.find((item: any) => item.resource === 'ActiveMemberResources')?.link,
            'ActiveLinkTree': linksData.find((item: any) => item.resource === 'ActiveLinkTree')?.link,
            'AlumniContacts': linksData.find((item: any) => item.resource === 'AlumniContacts')?.link,
            'FamilyTrees': linksData.find((item: any) => item.resource === 'FamilyTrees')?.link,
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
        {loading ? (
          <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <LoadingSpinner size="large" fullScreen={false} type="component" />
          </main>
        ) : (
          <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <h1 className={`text-5xl md:text-6xl ${akpsiColors.black} mb-6 text-center ${akpsiFonts.sectionTitleFont}`}>Active Member Resources</h1>
            <p className={`text-lg ${akpsiColors.black} text-center mb-2 max-w-2xl ${akpsiFonts.bodyFont}`}>Please do not share any of these resources with people outside of the frat.<br />Make sure to use this responsibly, you are protecting our legacy :)</p>
            <div className="mt-8 flex flex-col gap-4 w-full max-w-md">
              {resourceButtons.map((item, idx) => {
                const link = links[idx];
                return link ? (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-3 px-6 rounded-lg border-2 border-black ${akpsiColors.black} text-lg font-semibold text-center bg-white/40 hover:bg-black/30 hover:text-white transition-colors duration-200 shadow-md backdrop-blur ${akpsiFonts.bodyFont}`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <button
                    key={idx}
                    className={`block w-full py-3 px-6 rounded-lg border-2 border-black ${akpsiColors.black} text-lg font-semibold text-center bg-white/40 cursor-not-allowed opacity-70 shadow-md backdrop-blur ${akpsiFonts.bodyFont}`}
                    disabled
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </main>
        )}
        <Footer />
      </div>
    </div>
  );
}

// Main export - wraps the content with authentication guard
export default function MembersPage() {
  return (
    <AuthGuard>
      <MembersPageContent />
    </AuthGuard>
  );
} 