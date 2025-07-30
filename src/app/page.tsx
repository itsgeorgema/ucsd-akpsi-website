'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../supabase/client';
import Footer from '../components/Footer';
import ScrollArrow from '../components/ScrollArrow';
import LoadingSpinner from '../components/LoadingSpinner';
import BouncyFadeIn from '../components/BouncyFadeIn';
import { heroFont } from '../styles/fonts';
import { colors } from '../styles/colors';

// Animated Title Component
function AnimatedTitle() {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isActivelyTyping, setIsActivelyTyping] = useState(false);

  useEffect(() => {
    const texts = [
      'ALPHA\nKAPPA PSI.',
      'NU XI\nCHAPTER.'
    ];
    const typeSpeed = 80; //lower is faster
    const deleteSpeed = 50; //lower is faster
    
    if (isTyping) {
      if (currentCharIndex < texts[currentTextIndex].length) {
        setIsActivelyTyping(true);
        const timer = setTimeout(() => {
          setDisplayText(texts[currentTextIndex].slice(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        }, typeSpeed);
        return () => clearTimeout(timer);
      } else {
        setIsActivelyTyping(false);
        const timer = setTimeout(() => setIsTyping(false), 2250);
        return () => clearTimeout(timer);
      }
    } else {
      if (currentCharIndex > 0) {
        setIsActivelyTyping(true);
        const timer = setTimeout(() => {
          setDisplayText(texts[currentTextIndex].slice(0, currentCharIndex - 1));
          setCurrentCharIndex(currentCharIndex - 1);
        }, deleteSpeed);
        return () => clearTimeout(timer);
      } else {
        setIsActivelyTyping(false);
        const timer = setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          setIsTyping(true);
        }, 1750);
        return () => clearTimeout(timer);
      }
    }
  }, [currentCharIndex, isTyping, currentTextIndex]);

  return (
    <div className="block">
      {displayText.split('\n').map((line, index, arr) => {
        const isLastLine = index === arr.length - 1;
        return (
          <div key={index} className="block">
            {line}
            {isLastLine && <span className={`typewriter-cursor ${isActivelyTyping ? 'no-blink' : ''}`}></span>}
          </div>
        );
      })}
    </div>
  );
}

interface President {
  name: string;
  imageUrl: string;
}

interface HomeImages {
  background: string;
  groupPhoto1: string;
  groupPhoto2: string;
  industryDistribution: string;
  broho: string;
  integrity: string;
  service: string;
  unity: string;
  knowledge: string;
  akpsiLogo: string;
}

export default function Home() {
  const [president, setPresident] = useState<President | null>(null);
  const [homeImages, setHomeImages] = useState<HomeImages>({
    background: '',
    groupPhoto1: '',
    groupPhoto2: '',
    industryDistribution: '',
    broho: '',
    integrity: '',
    service: '',
    unity: '',
    knowledge: '',
    akpsiLogo: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        
        // Fetch home page images from storage bucket
        const imagePaths = [
          'homePageBackground.jpg',
          'homePageGroupPhoto.jpg',
          'homePageGroupPhoto2.png',
          'industryDistribution.png',
          'broho.png',
          'integrity.png',
          'service.png',
          'unity.png',
          'knowledge.png'
        ];

        // Fetch AKPsi logo from misc bucket
        const { data: logoData } = supabase.storage
          .from('misc')
          .getPublicUrl('akpsiLogo.png');

        const newHomeImages: HomeImages = {
          background: '',
          groupPhoto1: '',
          groupPhoto2: '',
          industryDistribution: '',
          broho: '',
          integrity: '',
          service: '',
          unity: '',
          knowledge: '',
          akpsiLogo: logoData?.publicUrl || ''
        };

        imagePaths.forEach(imagePath => {
          const { data: imageData } = supabase.storage
            .from('home-page')
            .getPublicUrl(imagePath);
          
          switch (imagePath) {
            case 'homePageBackground.jpg':
              newHomeImages.background = imageData.publicUrl;
              break;
            case 'homePageGroupPhoto.jpg':
              newHomeImages.groupPhoto1 = imageData.publicUrl;
              break;
            case 'homePageGroupPhoto2.png':
              newHomeImages.groupPhoto2 = imageData.publicUrl;
              break;
            case 'industryDistribution.png':
              newHomeImages.industryDistribution = imageData.publicUrl;
              break;
            case 'broho.png':
              newHomeImages.broho = imageData.publicUrl;
              break;
            case 'integrity.png':
              newHomeImages.integrity = imageData.publicUrl;
              break;
            case 'service.png':
              newHomeImages.service = imageData.publicUrl;
              break;
            case 'unity.png':
              newHomeImages.unity = imageData.publicUrl;
              break;
            case 'knowledge.png':
              newHomeImages.knowledge = imageData.publicUrl;
              break;
          }
        });

        setHomeImages(newHomeImages);

        // Fetch president data
        const { data: presidentData, error: presidentError } = await supabase
          .from('ecomm-spring-25')
          .select('name, image_path')
          .eq('position', 'President')
          .single();

        if (presidentError) {
          console.error('Error fetching president:', presidentError);
        } else if (presidentData) {
          console.log('Fetched president data:', presidentData);
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
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
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
            <section className="relative flex flex-col justify-center h-screen px-4 md:px-8 lg:px-12">
              <div className="relative z-10 max-w-6xl mx-auto w-full pt-20 md:pt-24 lg:pt-28">
                {/* Title Section - Fixed Height */}
                <div className="h-48 md:h-64 lg:h-80 mb-4 md:mb-6 lg:mb-8 flex items-center">
                  <h1 className={`text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold ${colors.text.inverse} leading-none tracking-tight ${heroFont}`}>
                    <AnimatedTitle />
                  </h1>
                </div>

                {/* Values Section - Direct placement on background */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16 mb-4 md:mb-6">
                  {/* Brotherhood */}
                  <BouncyFadeIn delay={0.1} threshold={0.1}>
                    <div className="flex flex-col items-center text-center group">
                      {homeImages.broho && (
                        <div className="mb-4 flex justify-center">
                          <img src={homeImages.broho} alt="Brotherhood" className="h-12 w-12 md:h-16 md:w-16 filter brightness-0 invert drop-shadow-lg" />
                        </div>
                      )}
                      <h3 className={`text-sm md:text-base lg:text-lg font-bold mb-3 text-white drop-shadow-lg group-hover:text-[#D4AF37] transition-colors duration-300`}>BROTHERHOOD</h3>
                      <p className={`text-xs md:text-sm text-white/90 leading-relaxed drop-shadow-lg`}>We are a family of life-long friends that stick together through thick and thin.</p>
                    </div>
                  </BouncyFadeIn>

                  {/* Integrity */}
                  <BouncyFadeIn delay={0.2} threshold={0.1}>
                    <div className="flex flex-col items-center text-center group">
                      {homeImages.integrity && (
                        <div className="mb-4 flex justify-center">
                          <img src={homeImages.integrity} alt="Integrity" className="h-12 w-12 md:h-16 md:w-16 filter brightness-0 invert drop-shadow-lg" />
                        </div>
                      )}
                      <h3 className={`text-sm md:text-base lg:text-lg font-bold mb-3 text-white drop-shadow-lg group-hover:text-[#6497B1] transition-colors duration-300`}>INTEGRITY</h3>
                      <p className={`text-xs md:text-sm text-white/90 leading-relaxed drop-shadow-lg`}>We do things through hard work and dedication, while not taking any unnecessary shortcuts.</p>
                    </div>
                  </BouncyFadeIn>

                  {/* Service */}
                  <BouncyFadeIn delay={0.3} threshold={0.1}>
                    <div className="flex flex-col items-center text-center group">
                      {homeImages.service && (
                        <div className="mb-4 flex justify-center">
                          <img src={homeImages.service} alt="Service" className="h-12 w-12 md:h-16 md:w-16 filter brightness-0 invert drop-shadow-lg" />
                        </div>
                      )}
                      <h3 className={`text-sm md:text-base lg:text-lg font-bold mb-3 text-white drop-shadow-lg group-hover:text-[#003366] transition-colors duration-300`}>SERVICE</h3>
                      <p className={`text-xs md:text-sm text-white/90 leading-relaxed drop-shadow-lg`}>We believe in giving back to the communities that have shaped us into the people we are today.</p>
                    </div>
                  </BouncyFadeIn>

                  {/* Unity */}
                  <BouncyFadeIn delay={0.4} threshold={0.1}>
                    <div className="flex flex-col items-center text-center group">
                      {homeImages.unity && (
                        <div className="mb-4 flex justify-center">
                          <img src={homeImages.unity} alt="Unity" className="h-12 w-12 md:h-16 md:w-16 filter brightness-0 invert drop-shadow-lg" />
                        </div>
                      )}
                      <h3 className={`text-sm md:text-base lg:text-lg font-bold mb-3 text-white drop-shadow-lg group-hover:text-[#B89334] transition-colors duration-300`}>UNITY</h3>
                      <p className={`text-xs md:text-sm text-white/90 leading-relaxed drop-shadow-lg`}>We strive to build our bonds and strengthen the brotherhood that we are proud of.</p>
                    </div>
                  </BouncyFadeIn>

                  {/* Knowledge */}
                  <BouncyFadeIn delay={0.5} threshold={0.1}>
                    <div className="flex flex-col items-center text-center group">
                      {homeImages.knowledge && (
                        <div className="mb-4 flex justify-center">
                          <img src={homeImages.knowledge} alt="Knowledge" className="h-12 w-12 md:h-16 md:w-16 filter brightness-0 invert drop-shadow-lg" />
                        </div>
                      )}
                      <h3 className={`text-sm md:text-base lg:text-lg font-bold mb-3 text-white drop-shadow-lg group-hover:text-[#FFD700] transition-colors duration-300`}>KNOWLEDGE</h3>
                      <p className={`text-xs md:text-sm text-white/90 leading-relaxed drop-shadow-lg`}>We are scholars of diverse disciplines and professionals in varied industries.</p>
                    </div>
                  </BouncyFadeIn>
                </div>

                {/* Scroll Arrow */}
                <div className="flex justify-center">
                  <ScrollArrow />
                </div>
              </div>
            </section>

                        {/* CONNECTED SECTIONS CONTAINER */}
            <div className="relative z-10 flex flex-col w-full">
              {/* PRESIDENT'S MESSAGE SECTION */}
              <section id="akpsi-info" className={`flex flex-col md:flex-row items-center rounded-t-3xl justify-center w-full py-20 px-6 md:px-12 bg-gradient-to-br from-[#F8F8F8] via-[#F8F8F8] to-[#B3CDE0]/10 ${heroFont} relative overflow-hidden`}>
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B89334] via-transparent to-[#6497B1]"></div>
                </div>
                
                <BouncyFadeIn delay={0.2} threshold={0.3}>
                  <div className="flex-1 max-w-2xl w-full md:pr-12 relative z-10">
                    <div className="mb-6">
                      <span className={`inline-block px-4 py-2 ${colors.text.accent} bg-[#B89334]/10 rounded-full text-sm font-semibold uppercase tracking-wide border border-[#B89334]/20`}>Presidential Message</span>
                    </div>
                    <h3 className={`text-4xl md:text-5xl font-bold mb-8 leading-tight text-left bg-gradient-to-r from-[#003366] to-[#6497B1] bg-clip-text text-transparent`}>FROM<br />OUR PRESIDENT</h3>
                    <div className="space-y-6">
                      <p className={`text-lg font-normal leading-relaxed text-left ${colors.section.text} relative pl-4 border-l-4 border-[#D4AF37]`}>Welcome! This is the website for the Nu Xi Chapter of Alpha Kappa Psi. Here, you can explore our values, who our brothers are, and how you can get involved. Before diving into the details, the brothers of the Nu Xi Chapter would like to thank you for your interest in our fraternity.</p>
                      <p className={`text-base font-normal leading-relaxed text-left ${colors.section.text}`}>Alpha Kappa Psi is a pre-professional student fraternity here at UC San Diego. We are built on the key values of Brotherhood, Knowledge, Integrity, Unity, and Service. The community you&apos;ll find here at Alpha Kappa Psi is unparalleled. Not only do our brothers strive towards their personal and professional aspirations, but we do so together, building genuine bonds that last us a lifetime.</p>
                      <p className={`text-base font-normal leading-relaxed text-left ${colors.section.text}`}>With that being said, we highly encourage you to explore our website to learn more about our fraternity, our brothers, and what we stand for. If you&apos;re interested in joining our community, we encourage you to come out to our upcoming Fall 2025 Rush. At Rush, you&apos;ll get the chance to meet the brothers and learn more about how this fraternity can help you grow both personally and professionally.</p>
                    </div>
                    <div className={`mt-8 p-6 bg-gradient-to-r from-[#B3CDE0]/20 to-[#D4AF37]/10 rounded-xl border border-[#B3CDE0]/30 backdrop-blur-sm`}>
                      <p className={`mb-2 text-sm ${colors.text.secondary} uppercase tracking-wide`}>Sincerely,</p>
                      <p className={`font-bold text-xl ${colors.text.accent}`}>{president ? president.name : 'Loading...'}</p>
                      <p className={`text-sm ${colors.text.secondary} font-medium`}>President, Nu Xi Chapter</p>
                    </div>
                  </div>
                </BouncyFadeIn>
                <BouncyFadeIn delay={0.4} threshold={0.3}>
                  <div className="flex-1 flex justify-center items-center w-full max-w-xl mt-10 md:mt-0">
                    {president ? (
                      <img src={president.imageUrl} alt={`${president.name} - President`} className="w-full max-w-md md:max-w-lg h-auto rounded-md object-cover scale-110" />
                    ) : (
                                      <div className={`w-full max-w-md md:max-w-lg h-80 bg-gradient-to-br from-[#B3CDE0]/20 to-[#D4AF37]/10 rounded-2xl flex items-center justify-center border border-[#B3CDE0]/30 shadow-lg backdrop-blur-sm relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6497B1]/5 to-[#B89334]/5"></div>
                  <span className={`${colors.text.secondary} relative z-10 font-medium`}>Loading president image...</span>
                      </div>
                    )}
                  </div>
                </BouncyFadeIn>
              </section>

                {/* HERO DESCRIPTION SECTION WITH BACKGROUND IMAGE */}
                <section className={`relative flex items-center justify-center w-full h-screen ${colors.section.bg} ${heroFont} rounded-b-3xl overflow-hidden`}>
                  {/* Group Photo as background */}
                  <div className="absolute inset-0 z-0">
                    <div className="w-full h-full overflow-hidden flex items-center justify-center">
                      {homeImages.groupPhoto1 && (
                        <img src={homeImages.groupPhoto1} alt="AKPsi Group Photo" className="w-full h-full object-cover object-[center_35%]" />
                      )}
                    </div>
                  </div>
                  
                  {/* Glass morphism background - Static backdrop-filter layer */}
                  <div className={`absolute inset-0 backdrop-blur-md ${colors.glass.bg} ${colors.glass.border} z-10`}></div>
                  
                  {/* Content container - No backdrop-filter, just positioning */}
                  <div className="relative z-20 max-w-lg w-full px-6 md:px-12 flex flex-col items-start justify-center mx-auto">
                    <BouncyFadeIn delay={0.1} threshold={0.3}>
                      <div className="relative z-30">
                        <h2 className={`${colors.glass.text} text-2xl md:text-4xl font-bold mb-6 leading-snug text-left ${heroFont}`} style={{textShadow: '0 2px 16px rgba(0,0,0,0.25), 0 0 1px rgba(0,0,0,0.8)'}}>
                          Alpha Kappa Psi <b>(ΑΚΨ)</b> is the nation&apos;s premier<br />
                          co-ed Business fraternity,<br />
                          providing mentorship and resources to students through programs, alumni networks, and much more.
                        </h2>
                        <a href="/about" className={`mt-6 inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#B89334] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B89334] border-2 border-[#B89334] hover:border-[#D4AF37] text-[#F8F8F8] font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm`}>
                          <span>LEARN MORE</span>
                          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      </div>
                    </BouncyFadeIn>
                  </div>
                </section>
            </div>


          </>
        )}

        {/* Footer (includes social links and login) */}
        <Footer />
      </div>
    </div>
  );
}
