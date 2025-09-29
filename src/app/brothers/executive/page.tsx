'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../../../supabase/client';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { fontCombinations } from '../../../styles/fonts';
import { colors } from '../../../styles/colors';
import BouncyFadeIn from '../../../components/BouncyFadeIn';
import Link from 'next/link';
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

export default function ExecutiveCommittee() {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const backgroundImage = '/assets/sunsetBackground.jpeg';
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        
        // Fetch executives data
        const { data, error } = await supabase
          .from('ecomm-fall25')
          .select('*')
          .order('number', { ascending: true });

        if (error) {
          console.error('Error fetching executives:', error);
          setExecutives([]);
        } else if (data) {
          // Generate URLs for each executive image from local directory
          const executivesWithUrls = data.map(executive => {
            return {
              name: executive.name,
              position: executive.position,
              pronouns: executive.pronouns,
              location: executive.location,
              bio: executive.bio,
              linkedin: executive.linkedin,
              imageUrl: `/brothers/${executive.image_path}`,
            };
          });

          setExecutives(executivesWithUrls);
        }
      } catch (error) {
        console.error('Error:', error);
        setExecutives([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Create reverse pyramid layout
  const createReversePyramid = (executives: Executive[]) => {
    const rows = [];
    let currentIndex = 0;
    
    // Fixed pattern: 4, 4, 2
    const rowSizes = [4, 4, 2];
    
    for (let i = 0; i < rowSizes.length && currentIndex < executives.length; i++) {
      const rowSize = Math.min(rowSizes[i], executives.length - currentIndex);
      if (rowSize > 0) {
        const rowExecutives = executives.slice(currentIndex, currentIndex + rowSize);
        rows.push({
          executives: rowExecutives,
          size: rowSize,
          startIndex: currentIndex
        });
        currentIndex += rowSize;
      }
    }
    
    return rows;
  };

  const pyramidRows = createReversePyramid(executives);

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
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          {loading && (
            <LoadingSpinner size="large" fullScreen={false} type="component" />
          )}
          {!loading && executives.length === 0 && (
            <div className={`flex flex-col items-center justify-center min-h-[60vh] ${colors.text.inverse}`}>
              <div className={`text-2xl ${fontCombinations.section.secondary} mb-2`}>Error loading brothers</div>
              <div className={`text-lg opacity-80 ${fontCombinations.content.body} ${colors.glass.textSubtle}`}>The executive committee data is not available.</div>
            </div>
          )}
          {!loading && executives.length > 0 && (
            <div className="w-full flex flex-col items-center">
              <div className="text-center mb-8 mt-8 md:mt-12">
                <div className={`text-sm tracking-tighter mb-2 ${colors.text.inverse} ${fontCombinations.navigation.secondary}`}>MEET OUR</div>
                <h1 className={`text-5xl lg:text-6xl ${fontCombinations.hero.title} ${colors.text.inverse} mb-4`}>EXECUTIVE COMMITTEE</h1>
              </div>
              
              {/* 4 to a row Layout */}
              <div className="flex flex-col items-center gap-16">
                {pyramidRows.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center">
                    <div className="flex flex-wrap justify-center gap-10">
                      {row.executives.map((executive, idx) => {
                        const delay = idx * 0.06;
                        return (
                          <BouncyFadeIn key={idx} delay={delay} bounce={0} threshold={0}>
                            <div className="flex flex-col items-center">
                              <Link 
                                href={`/brothers/executive/${encodeURIComponent(executive.name.replace(/\s/g, ""))}`}
                                aria-label={`View ${executive.name}'s profile - ${executive.position}`}
                              >
                                <div className="w-72 h-96 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                                  <div className="relative w-full h-full">
                                    <Image
                                      src={executive.imageUrl}
                                      alt={`${executive.name} - ${executive.position}`}
                                      fill
                                      sizes="(max-width: 768px) 288px, 288px"
                                      className="object-cover object-center scale-110"
                                    />
                                  </div>
                                </div>
                              </Link>
                              <span className={`text-lg mt-2 text-white ${fontCombinations.section.tertiary}`}>{executive.name}</span>
                              <span className={`text-sm mt-1 text-white/80 ${fontCombinations.content.small}`}>{executive.position}</span>
                            </div>
                          </BouncyFadeIn>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
