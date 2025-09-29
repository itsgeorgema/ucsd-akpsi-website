'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '../../../../../supabase/client';
import { fontCombinations } from '../../../../styles/fonts';
import { colors } from '../../../../styles/colors';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import BouncyFadeIn from '../../../../components/BouncyFadeIn';
import Image from 'next/image';

interface Executive {
  name: string;
  position: string;
  pronouns: string;
  location: string;
  bio: string;
  linkedin: string;
  imageUrl: string;
}

export default function ExecutivePage() {
  const [executive, setExecutive] = useState<Executive | null>(null);
  const backgroundImage = '/assets/sunsetBackground.jpeg';
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const name = params.name as string;

  useEffect(() => {
    if (!name) return;

    const fetchData = async () => {
      try {
        const supabase = createClient();
        const decodedName = decodeURIComponent(name);
        
        // Fetch executive data
        const { data, error } = await supabase
          .from('ecomm-fall25')
          .select('*');
        
        if (error) {
          console.error('Error fetching executive:', error);
          setExecutive(null);
        } else if (data) {
          // Find executive by comparing the name without spaces
          const found = data.find(e => e.name.replace(/\s/g, '') === decodedName);
          if (found) {
            setExecutive({ ...found, imageUrl: `/brothers/${found.image_path}` });
          } else {
            setExecutive(null);
          }
        }
      } catch (error) {
        console.error('Error:', error);
        setExecutive(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Full Page Background */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat bg-black"
        style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
      />
      {/* Enhanced overlay for better readability */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-gradient-to-br from-black/40 via-black/30 to-black/50" />
      <div className="relative z-20 min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center py-16 px-4 mt-24">
          {loading && (
            <LoadingSpinner size="large" fullScreen={false} type="component" />
          )}
          {!loading && !executive && (
            <div className={`flex flex-col items-center justify-center min-h-[60vh] ${colors.text.inverse}`}>
              <div className={`text-2xl ${fontCombinations.section.secondary} mb-2`}>Executive not found</div>
              <div className={`text-lg opacity-80 ${fontCombinations.content.body} ${colors.glass.textSubtle}`}>The brother you&apos;re looking for doesn&apos;t exist in our database.</div>
            </div>
          )}
          {!loading && executive && (
            <div className="w-full max-w-8xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                {/* Enhanced Profile Image Section */}
                <BouncyFadeIn delay={0.1} bounce={0} threshold={0} className="lg:col-span-1 flex flex-col items-center lg:items-start h-full">
                  <div className="relative group w-full">
                    {/* Main Profile Image */}
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full h-[35rem] md:h-[41rem] lg:h-[45rem]">
                      <Image 
                        src={executive.imageUrl} 
                        alt={executive.name} 
                        fill
                        sizes="(max-width: 1024px) 100%, 33vw"
                        priority
                        className="object-cover object-center scale-110" 
                      />
                      {/* Gradient overlay for better text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </BouncyFadeIn>
                
                {/* Enhanced Content Section */}
                <BouncyFadeIn delay={0.1} bounce={0} threshold={0} className="lg:col-span-2 flex flex-col h-full">
                  <div className={`${colors.section.bg} rounded-3xl shadow-2xl p-4 lg:p-6 border border-gray-200`}>
                    {/* Header Section */}
                    <div className="mb-4">
                      <div className="flex items-center mb-4">
                        <span className={`text-sm ${colors.text.secondary} uppercase tracking-tighter ${fontCombinations.navigation.secondary} ${colors.bg.surfaceAlt} px-3 py-1 rounded-full`}>
                          {executive.position}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className={`text-3xl lg:text-4xl ${fontCombinations.section.main} ${colors.section.title} leading-tight`}>
                          {executive.name}
                        </h1>
                        
                        {/* LinkedIn Section */}
                        {executive.linkedin ? (
                          <a 
                            href={executive.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center w-12 h-12 ${colors.section.bg} border-2 ${colors.bg.surfaceAlt} rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
                          >
                            <svg className={`w-6 h-6 ${colors.section.text}`} fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        ) : (
                          <button className={`inline-flex items-center justify-center w-12 h-12 ${colors.bg.surfaceAlt} border ${colors.bg.surfaceAlt} rounded-xl cursor-not-allowed opacity-60`} disabled>
                            <svg className={`w-6 h-6 ${colors.text.secondary}`} fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <div className={`flex items-center text-sm ${colors.section.text} ${fontCombinations.content.small}`}>
                          <svg className={`w-5 h-5 mr-2 ${colors.text.secondary}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          {executive.pronouns}
                        </div>
                        <div className={`flex items-center text-sm ${colors.section.text} ${fontCombinations.content.small}`}>
                          <svg className={`w-5 h-5 mr-2 ${colors.text.secondary}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {executive.location}
                        </div>
                      </div>
                    </div>
                    
                    {/* Bio Section */}
                    <div className="mb-6">
                      <div className={`text-base ${colors.section.text} leading-relaxed whitespace-pre-line ${fontCombinations.content.body} ${colors.bg.primary}/50 rounded-xl p-4 border-l-4 ${colors.border.accent}`}>
                        {executive.bio}
                      </div>
                    </div>
                    
                  </div>
                </BouncyFadeIn>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 