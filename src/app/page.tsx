'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '../../supabase/client';
import ScrollArrow from '../components/ScrollArrow';
import LoadingSpinner from '../components/LoadingSpinner';
import BouncyFadeIn from '../components/BouncyFadeIn';
import InfiniteCarousel from '../components/InfiniteCarousel';
import { fontCombinations, hierarchyWeights } from '../styles/fonts';
import { colors } from '../styles/colors';
import AnimatedTitle from '../components/AnimatedTitle';
import { getHomeImages, HomeImages } from '../utils/imageUtils';
import { getGalleryImages, GalleryImage } from '../utils/imageUtils';
import Image from 'next/image';

interface President {
  name: string;
  imageUrl: string;
}

export default function Home() {
  const [homeImages, setHomeImages] = useState<HomeImages>({
    background: '',
    groupPhoto1: '',
    groupPhoto2: '',
    broho: '',
    integrity: '',
    service: '',
    unity: '',
    knowledge: '',
  });
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [president, setPresident] = useState<President>({
    name: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        
        // Get home images from utility function
        const homeImagesData = getHomeImages();
        setHomeImages(homeImagesData);

        // Get gallery images from utility function
        const galleryImagesData = getGalleryImages();
        setGalleryImages(galleryImagesData);

        // Fetch president data
        const { data: presidentData, error: presidentError } = await supabase
          .from('ecomm-spring-25')
          .select('name, image_path')
          .eq('position', 'President')
          .single();

        if (presidentError) {
          console.error('Error fetching president:', presidentError);
        } else if (presidentData) {
          const cleanImagePath = presidentData.image_path.trim();
          const { data: imageData } = supabase.storage
            .from('brothers-spring25')
            .getPublicUrl(cleanImagePath);
          
          setPresident({
            name: presidentData.name,
            imageUrl: imageData.publicUrl
          });
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative">
      {/* Fixed full-page background */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat bg-black"
        style={{ backgroundImage: homeImages.background ? `url(${homeImages.background})` : undefined }}
      />
      {/* Overlay for readability */}
      <div className={`fixed top-0 left-0 w-full h-full z-10 ${colors.bg.overlay}`} />
      <div className="relative z-20 min-h-screen flex flex-col">
        {loading ? (
          <main className="flex-1 flex items-center justify-center py-16 px-4">
            <LoadingSpinner size="large" fullScreen={false} type="component" />
          </main>
        ) : (
          <>
            {/* HERO SECTION */}
            <section className="relative flex flex-col justify-center min-h-screen px-4 md:px-8 lg:px-12 pt-8 md:pt-4 safe-area-inset-top safe-area-inset-bottom">
              <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col flex-1 justify-center scale-90 sm:scale-100 translate-y-6 sm:translate-y-16 md:translate-y-0">
                {/* Title Section - Dynamic Height */}
                <div className="flex-1 flex items-end justify-center mb-4 md:mb-6 lg:mb-12">
                  <h1 className={`text-3xl sm:text-7xl md:text-6xl lg:text-8xl xl:text-8xl ${colors.heroTitle} leading-tight ${fontCombinations.hero.title} ${hierarchyWeights.hero} w-full text-left`}>
                    <AnimatedTitle />
                  </h1>
                </div>

                {/* Values Section - Dynamic Spacing */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-1 md:gap-1 lg:gap-6 mb-2 md:mb-4 flex-shrink-0 justify-center">
                  {/* Brotherhood */}
                  <BouncyFadeIn delay={0.1} threshold={0.1}>
                    <div className={`${colors.glass.text}`}>
                      {homeImages.broho && (
                        <div className="mb-1 md:mb-2">
                          <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14">
                            <Image src={homeImages.broho} alt="Brotherhood" fill sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, (max-width: 1024px) 48px, 56px" className="object-contain" />
                          </div>
                        </div>
                      )}
                      <h3 className={`text-sm sm:text-sm md:text-base lg:text-lg mb-1 ${colors.glass.text} ${fontCombinations.values.title} ${hierarchyWeights.valuesTitle}`}>BROTHERHOOD</h3>
                      <p className={`text-xs sm:text-xs md:text-sm lg:text-base ${colors.glass.textBody} ${fontCombinations.values.description} ${hierarchyWeights.paragraph}`}>We are a family of life-long friends that stick together through thick and thin.</p>
                    </div>
                  </BouncyFadeIn>

                  {/* Integrity */}
                  <BouncyFadeIn delay={0.2} threshold={0.1}>
                    <div className={`${colors.glass.text}`}>
                      {homeImages.integrity && (
                        <div className="mb-1 md:mb-2">
                          <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14">
                            <Image src={homeImages.integrity} alt="Integrity" fill sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, (max-width: 1024px) 48px, 56px" className="object-contain" />
                          </div>
                        </div>
                      )}
                      <h3 className={`text-sm sm:text-sm md:text-base lg:text-lg mb-1 ${colors.glass.text} ${fontCombinations.values.title} ${hierarchyWeights.valuesTitle}`}>INTEGRITY</h3>
                      <p className={`text-xs sm:text-xs md:text-sm lg:text-base ${colors.glass.textBody} ${fontCombinations.values.description} ${hierarchyWeights.paragraph}`}>We do things through hard work and dedication, while not taking any unnecessary shortcuts.</p>
                    </div>
                  </BouncyFadeIn>

                  {/* Service */}
                  <BouncyFadeIn delay={0.3} threshold={0.1}>
                    <div className={`${colors.glass.text}`}>
                      {homeImages.service && (
                        <div className="mb-1 md:mb-2">
                          <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14">
                            <Image src={homeImages.service} alt="Service" fill sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, (max-width: 1024px) 48px, 56px" className="object-contain" />
                          </div>
                        </div>
                      )}
                      <h3 className={`text-sm sm:text-sm md:text-base lg:text-lg mb-1 ${colors.glass.text} ${fontCombinations.values.title} ${hierarchyWeights.valuesTitle}`}>SERVICE</h3>
                      <p className={`text-xs sm:text-xs md:text-sm lg:text-base ${colors.glass.textBody} ${fontCombinations.values.description} ${hierarchyWeights.paragraph}`}>We believe in giving back to the communities that have shaped us into the people we are today.</p>
                    </div>
                  </BouncyFadeIn>

                  {/* Unity */}
                  <BouncyFadeIn delay={0.4} threshold={0.1}>
                    <div className={`${colors.glass.text}`}>
                      {homeImages.unity && (
                        <div className="mb-1 md:mb-2">
                          <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14">
                            <Image src={homeImages.unity} alt="Unity" fill sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, (max-width: 1024px) 48px, 56px" className="object-contain" />
                          </div>
                        </div>
                      )}
                      <h3 className={`text-sm sm:text-sm md:text-base lg:text-lg mb-1 ${colors.glass.text} ${fontCombinations.values.title} ${hierarchyWeights.valuesTitle}`}>UNITY</h3>
                      <p className={`text-xs sm:text-xs md:text-sm lg:text-base ${colors.glass.textBody} ${fontCombinations.values.description} ${hierarchyWeights.paragraph}`}>We strive to build our bonds and strengthen the brotherhood that we are proud of.</p>
                    </div>
                  </BouncyFadeIn>

                  {/* Knowledge */}
                  <BouncyFadeIn delay={0.5} threshold={0.1}>
                    <div className={`${colors.glass.text}`}>
                      {homeImages.knowledge && (
                        <div className="mb-1 md:mb-2">
                          <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14">
                            <Image src={homeImages.knowledge} alt="Knowledge" fill sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, (max-width: 1024px) 48px, 56px" className="object-contain" />
                          </div>
                        </div>
                      )}
                      <h3 className={`text-sm sm:text-sm md:text-base lg:text-lg mb-1 ${colors.glass.text} ${fontCombinations.values.title} ${hierarchyWeights.valuesTitle}`}>KNOWLEDGE</h3>
                      <p className={`text-xs sm:text-xs md:text-sm lg:text-base ${colors.glass.textBody} ${fontCombinations.values.description} ${hierarchyWeights.paragraph}`}>We are scholars of diverse disciplines and professionals in varied industries.</p>
                    </div>
                  </BouncyFadeIn>
                </div>

                {/* Scroll Arrow - Always Visible */}
                <div className="flex justify-center flex-shrink-0 mt-2 md:mt-4 pb-16 md:pb-0">
                  <ScrollArrow />
                </div>
              </div>
            </section>

            {/* PRESIDENT'S MESSAGE SECTION */}
            <section id="akpsi-info" className={`flex flex-col lg:flex-row items-start lg:items-center rounded-t-3xl justify-between w-full py-16 md:py-20 px-6 md:px-12 ${colors.section.bg} relative overflow-hidden`}>
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-[#B89334] via-transparent to-[#6497B1]"></div>
              </div>
              
              <BouncyFadeIn delay={0.1} threshold={0.1} bounce={0}>
                <div className="flex-1 max-w-4xl w-full lg:pr-12 relative z-10">
                  <div className="mb-6">
                  </div>
                  <h3 className={`text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8 leading-tight text-left bg-gradient-to-r from-[#003366] to-[#6497B1] bg-clip-text text-transparent ${fontCombinations.section.main} ${hierarchyWeights.title}`}>FROM<br />OUR PRESIDENT</h3>
                  <div className="space-y-4 md:space-y-6">
                    <p className={`text-base md:text-lg relative pl-4 border-l-4 ${colors.border.accent} ${colors.section.text} ${fontCombinations.content.lead} ${hierarchyWeights.important}`}>Welcome! This is the website for the Nu Xi Chapter of Alpha Kappa Psi. Here, you can explore our values, who our brothers are, and how you can get involved. Before diving into the details, the brothers of the Nu Xi Chapter would like to thank you for your interest in our fraternity.</p>
                    <p className={`${colors.section.text} ${fontCombinations.content.body} ${hierarchyWeights.paragraph}`}>Alpha Kappa Psi is a pre-professional student fraternity here at UC San Diego. We are built on the key values of Brotherhood, Knowledge, Integrity, Unity, and Service. The community you&apos;ll find here at Alpha Kappa Psi is unparalleled. Not only do our brothers strive towards their personal and professional aspirations, but we do so together, building genuine bonds that last us a lifetime.</p>
                    <p className={`${colors.section.text} ${fontCombinations.content.body} ${hierarchyWeights.paragraph}`}>With that being said, we highly encourage you to explore our website to learn more about our fraternity, our brothers, and what we stand for. If you&apos;re interested in joining our community, we encourage you to come out to our upcoming Fall 2025 Rush. At Rush, you&apos;ll get the chance to meet the brothers and learn more about how this fraternity can help you grow both personally and professionally.</p>
                    <div className={`mt-4 md:mt-6 ${colors.section.text} ${fontCombinations.content.body}`}>
                      <p className={`text-sm ${colors.text.secondary} uppercase tracking-tighter mb-1 ${fontCombinations.interactive.tertiary} ${hierarchyWeights.signature}`}>Sincerely,</p>
                      <p className={`text-lg md:text-xl ${colors.text.accent} ${fontCombinations.section.tertiary} ${hierarchyWeights.title}`}>{president ? president.name : 'Loading...'}</p>
                      <p className={`text-sm ${colors.text.secondary} ${fontCombinations.content.small} ${hierarchyWeights.signature}`}>President, Nu Xi Chapter</p>
                    </div>
                  </div>
                </div>
              </BouncyFadeIn>
              <BouncyFadeIn delay={0.1} threshold={0.1} bounce={0}>
                <div className="flex-1 flex justify-center lg:justify-end items-center w-full max-w-xl mt-8 lg:mt-0">
                  {president ? (
                    <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-auto">
                      <Image src={president.imageUrl} alt={`${president.name} - President`} width={400} height={500} className="w-full h-auto rounded-md object-cover scale-110" />
                    </div>
                  ) : (
                    <div className={`w-full max-w-sm md:max-w-md lg:max-w-lg h-64 md:h-80 bg-gradient-to-br from-[#B3CDE0]/20 to-[#D4AF37]/10 rounded-2xl flex items-center justify-center ${colors.border.default} shadow-lg backdrop-blur-sm relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6497B1]/5 to-[#B89334]/5"></div>
                        <span className={`${colors.text.secondary} relative z-10 ${fontCombinations.content.body}`}>Loading president image...</span>
                      </div>
                  )}
                </div>
              </BouncyFadeIn>
            </section>

            {/* GALLERY CAROUSEL SECTION - Bottom of President Section */}
            <section className={`relative w-full overflow-hidden ${colors.section.bg} -mt-8`}>
                {galleryImages.length > 0 ? (
                  <div className="relative">
                    <InfiniteCarousel images={galleryImages} />
                  </div>
                ) : (
                  <div className={`text-center py-12 ${colors.section.text}`}>
                    <div className={`w-16 h-16 ${colors.bg.surfaceAlt} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className={`text-xl ${fontCombinations.content.lead}`}>Gallery images loading...</span>
                  </div>
                )}
            </section>

            {/* HERO DESCRIPTION SECTION WITH BACKGROUND IMAGE */}
            <section className={`relative flex items-center justify-center w-full min-h-[60vh] ${colors.section.bg} overflow-hidden`}>
              {/* Group Photo as background */}
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full overflow-hidden flex items-center justify-center">
                  {homeImages.groupPhoto1 && (
                    <div className="relative w-full h-full">
                      <Image src={homeImages.groupPhoto1} alt="AKPsi Group Photo" fill sizes="100%" className="object-cover object-[center_35%]" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Glass morphism background - Static backdrop-filter layer */}
              <div className={`absolute inset-0 backdrop-blur-md ${colors.glass.bg} ${colors.glass.border} z-10`}></div>
              
              {/* Content container - Dynamic width and positioning */}
              <div className="relative z-20 max-w-2xl md:max-w-4xl w-full px-6 md:px-10 lg:px-16 flex flex-col items-start justify-center mx-auto">
                <BouncyFadeIn delay={0.1} threshold={0.1} bounce={0}>
                  <div className="relative z-30">
                    <h2 className={`${colors.glass.text} text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-6 leading-snug text-left ${fontCombinations.section.main}`} style={{textShadow: '0 2px 16px rgba(0,0,0,0.25), 0 0 1px rgba(0,0,0,0.8)'}}>
                      Alpha Kappa Psi <b>(ΑΚΨ)</b> is the nation&apos;s premier co-ed Business fraternity, providing mentorship and resources to students.
                    </h2>
                    <Link href="/about" className={`mt-6 inline-flex items-center px-6 py-3 ${colors.glass.bg} ${colors.glass.bgHover} ${colors.glass.border} ${colors.glass.borderHover} ${colors.glass.text} rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg backdrop-blur-sm border border-white/30 hover:border-white/50 ${fontCombinations.interactive.primary} text-sm md:text-base`}>
                      <span>LEARN MORE</span>
                      <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </BouncyFadeIn>
              </div>
            </section>


          </>
        )}

      </div>
    </div>
  );
}
