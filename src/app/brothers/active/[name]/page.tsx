'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '../../../../../supabase/client';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { akpsiFonts } from '../../../../styles/fonts';
import { akpsiColors } from '../../../../styles/colors';
import LoadingSpinner from '../../../../components/LoadingSpinner';

interface Brother {
  name: string;
  pronouns: string;
  location: string;
  bio: string;
  linkedin: string;
  imageUrl: string;
}

export default function BrotherPage() {
  const [brother, setBrother] = useState<Brother | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const name = Array.isArray(params.name) ? params.name[0] : params.name;

  useEffect(() => {
    if (!name) return;

    const fetchBrother = async () => {
      try {
        const supabase = createClient();
        const decodedName = decodeURIComponent(name);
        
        const { data, error } = await supabase
          .from('actives-spring25')
          .select('*');
        
        if (error) {
          console.error('Error fetching brother:', error);
          setBrother(null);
        } else if (data) {
          // Find brother by comparing the name without spaces
          const found = data.find(b => b.name.replace(/\s/g, '') === decodedName);
          if (found) {
            const { data: publicUrlData } = supabase
              .storage
              .from('brothers-spring25')
              .getPublicUrl(found.image_path);

            setBrother({ ...found, imageUrl: publicUrlData?.publicUrl || '' });
          } else {
            setBrother(null);
          }
        }
      } catch (error) {
        console.error('Error:', error);
        setBrother(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBrother();
  }, [name]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Full Page Background */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/brothers/brothersBackground.jpg)" }}
      />
      {/* Enhanced overlay for better readability */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-gradient-to-br from-black/40 via-black/30 to-black/50" />
      <div className="relative z-20 min-h-screen flex flex-col">
      <Navbar />
        <main className="flex-1 flex items-center justify-center py-16 px-4 mt-20">
                    {loading && (
            <LoadingSpinner size="large" fullScreen={false} type="component" />
          )}
          {!loading && !brother && (
            <div className={`flex flex-col items-center justify-center min-h-[60vh] ${akpsiColors.heroTitle}`}>
              <div className={`text-2xl ${akpsiFonts.sectionTitleFont} mb-2`}>Brother not found</div>
              <div className={`text-lg opacity-80 ${akpsiFonts.bodyFont} ${akpsiColors.heroSubtitle}`}>The brother you&apos;re looking for doesn&apos;t exist in our database.</div>
            </div>
          )}
          {!loading && brother && (
            <div className="w-full max-w-8xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-16 items-stretch">
                {/* Enhanced Profile Image Section */}
                <div className="lg:col-span-1 flex flex-col items-center lg:items-start h-full">
                  <div className="relative group h-full">
                    {/* Main Profile Image */}
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl transform transition-transform duration-300 group-hover:scale-[1.02] h-full">
                      <img 
                        src={brother.imageUrl} 
                        alt={brother.name} 
                        className="w-full h-full object-cover object-top" 
                      />
                      {/* Gradient overlay for better text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Content Section */}
                <div className="lg:col-span-2 flex flex-col h-full">
                  <div className={`${akpsiColors.sectionBg} rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-200`}>
                    {/* Header Section */}
                    <div className="mb-8">
                      <div className="flex items-center mb-4">
                        <span className={`text-sm ${akpsiColors.statCircleText} uppercase tracking-widest ${akpsiFonts.sectionSubtitleFont} ${akpsiColors.statCircleBg} px-3 py-1 rounded-full`}>
                          Brother Profile
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <h1 className={`text-5xl lg:text-6xl ${akpsiFonts.heroTitleFont} ${akpsiColors.black} leading-tight`}>
                          {brother.name}
                        </h1>
                        
                        {/* LinkedIn Section */}
                        {brother.linkedin ? (
                          <a 
                            href={brother.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center w-12 h-12 ${akpsiColors.sectionBg} border-2 ${akpsiColors.statCircleBg} rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
                          >
                            <svg className={`w-6 h-6 ${akpsiColors.sectionText}`} fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        ) : (
                          <button className={`inline-flex items-center justify-center w-12 h-12 ${akpsiColors.statCircleBg} border ${akpsiColors.statCircleBg} rounded-xl cursor-not-allowed opacity-60`} disabled>
                            <svg className={`w-6 h-6 ${akpsiColors.statCircleText}`} fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className={`flex items-center text-lg ${akpsiColors.sectionText} ${akpsiFonts.sectionTextFont}`}>
                          <svg className={`w-5 h-5 mr-2 ${akpsiColors.statCircleText}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          {brother.pronouns}
                        </div>
                        <div className={`flex items-center text-lg ${akpsiColors.sectionText} ${akpsiFonts.sectionTextFont}`}>
                          <svg className={`w-5 h-5 mr-2 ${akpsiColors.statCircleText}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {brother.location}
                        </div>
                      </div>
                    </div>
                    
                    {/* Bio Section */}
                    <div className="mb-8">
                      <div className={`text-lg ${akpsiColors.sectionText} leading-relaxed whitespace-pre-line ${akpsiFonts.bodyFont} ${akpsiColors.mainBg}/50 rounded-xl p-6 border-l-4 ${akpsiColors.sectionTitle}`}>
                        {brother.bio}
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          )}
      </main>
      <Footer />
      </div>
    </div>
  );
} 