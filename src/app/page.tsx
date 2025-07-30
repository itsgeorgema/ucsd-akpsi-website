'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../supabase/client';
import Footer from '../components/Footer';
import ScrollArrow from '../components/ScrollArrow';
import LoadingSpinner from '../components/LoadingSpinner';
import { heroFont } from '../styles/fonts';
import { akpsiColors } from '../styles/colors';

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
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-black/40" />
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
                  <h1 className={`text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold ${akpsiColors.heroTitle} leading-none tracking-tight ${heroFont}`}>
                    <AnimatedTitle />
                  </h1>
                </div>

                {/* Values Section - Static Position */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 mb-4 md:mb-6">
                  {/* Brotherhood */}
                  <div className={`${akpsiColors.glassText}`}>
                    {homeImages.broho && (
                      <div className="mb-2 md:mb-3">
                        <img src={homeImages.broho} alt="Brotherhood" className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16" />
                      </div>
                    )}
                    <h3 className={`text-sm md:text-base lg:text-lg font-semibold mb-1 md:mb-2 ${akpsiColors.glassText}`}>BROTHERHOOD</h3>
                    <p className={`text-xs md:text-sm ${akpsiColors.glassTextBody} leading-relaxed`}>We are a family of life-long friends that stick together through thick and thin.</p>
                  </div>

                  {/* Integrity */}
                  <div className={`${akpsiColors.glassText}`}>
                    {homeImages.integrity && (
                      <div className="mb-2 md:mb-3">
                        <img src={homeImages.integrity} alt="Integrity" className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16" />
                      </div>
                    )}
                    <h3 className={`text-sm md:text-base lg:text-lg font-semibold mb-1 md:mb-2 ${akpsiColors.glassText}`}>INTEGRITY</h3>
                    <p className={`text-xs md:text-sm ${akpsiColors.glassTextBody} leading-relaxed`}>We do things through hard work and dedication, while not taking any unnecessary shortcuts.</p>
                  </div>

                  {/* Service */}
                  <div className={`${akpsiColors.glassText}`}>
                    {homeImages.service && (
                      <div className="mb-2 md:mb-3">
                        <img src={homeImages.service} alt="Service" className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16" />
                      </div>
                    )}
                    <h3 className={`text-sm md:text-base lg:text-lg font-semibold mb-1 md:mb-2 ${akpsiColors.glassText}`}>SERVICE</h3>
                    <p className={`text-xs md:text-sm ${akpsiColors.glassTextBody} leading-relaxed`}>We believe in giving back to the communities that have shaped us into the people we are today.</p>
                  </div>

                  {/* Unity */}
                  <div className={`${akpsiColors.glassText}`}>
                    {homeImages.unity && (
                      <div className="mb-2 md:mb-3">
                        <img src={homeImages.unity} alt="Unity" className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16" />
                      </div>
                    )}
                    <h3 className={`text-sm md:text-base lg:text-lg font-semibold mb-1 md:mb-2 ${akpsiColors.glassText}`}>UNITY</h3>
                    <p className={`text-xs md:text-sm ${akpsiColors.glassTextBody} leading-relaxed`}>We strive to build our bonds and strengthen the brotherhood that we are proud of.</p>
                  </div>

                  {/* Knowledge */}
                  <div className={`${akpsiColors.glassText}`}>
                    {homeImages.knowledge && (
                      <div className="mb-2 md:mb-3">
                        <img src={homeImages.knowledge} alt="Knowledge" className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16" />
                      </div>
                    )}
                    <h3 className={`text-sm md:text-base lg:text-lg font-semibold mb-1 md:mb-2 ${akpsiColors.glassText}`}>KNOWLEDGE</h3>
                    <p className={`text-xs md:text-sm ${akpsiColors.glassTextBody} leading-relaxed`}>We are scholars of diverse disciplines and professionals in varied industries.</p>
                  </div>
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
              <section id="akpsi-info" className={`flex flex-col md:flex-row items-center rounded-t-3xl justify-center w-full py-16 px-4 md:px-0 ${akpsiColors.sectionBg} ${heroFont}`}>
                <div className="flex-1 max-w-2xl w-full md:pr-12">
                    <h3 className={`text-5xl font-bold mb-8 leading-tight text-left ${akpsiColors.sectionTitle}`}>FROM<br />OUR PRESIDENT</h3>
                    <p className={`mb-4 text-base font-normal leading-relaxed text-left ${akpsiColors.sectionText}`}>Welcome! This is the website for the Nu Xi Chapter of Alpha Kappa Psi. Here, you can explore our values, who our brothers are, and how you can get involved. Before diving into the details, the brothers of the Nu Xi Chapter would like to thank you for your interest in our fraternity.</p>
                    <p className={`mb-4 text-base font-normal leading-relaxed text-left ${akpsiColors.sectionText}`}>Alpha Kappa Psi is a pre-professional student fraternity here at UC San Diego. We are built on the key values of Brotherhood, Knowledge, Integrity, Unity, and Service. The community you&apos;ll find here at Alpha Kappa Psi is unparalleled. Not only do our brothers strive towards their personal and professional aspirations, but we do so together, building genuine bonds that last us a lifetime.</p>
                    <p className={`mb-4 text-base font-normal leading-relaxed text-left ${akpsiColors.sectionText}`}>With that being said, we highly encourage you to explore our website to learn more about our fraternity, our brothers, and what we stand for. If you&apos;re interested in joining our community, we encourage you to come out to our upcoming Fall 2025 Rush. At Rush, you&apos;ll get the chance to meet the brothers and learn more about how this fraternity can help you grow both personally and professionally.</p>
                    <div className={`mt-6 text-base font-normal text-left ${akpsiColors.sectionText}`}>
                      Sincerely,<br />
                      {president ? president.name : 'Loading...'}
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center items-center w-full max-w-xl mt-10 md:mt-0">
                    {president ? (
                      <img src={president.imageUrl} alt={`${president.name} - President`} className="w-full max-w-md md:max-w-lg h-auto rounded-md object-cover scale-110" />
                    ) : (
                      <div className={`w-full max-w-md md:max-w-lg h-80 ${akpsiColors.statCircleBg} rounded-lg flex items-center justify-center`}>
                        <span className={`${akpsiColors.statCircleText}`}>Loading president image...</span>
                      </div>
                    )}
                  </div>
                </section>

                {/* HERO DESCRIPTION SECTION WITH BACKGROUND IMAGE */}
                <section className={`relative flex items-center justify-center w-full h-screen ${akpsiColors.sectionBg} ${heroFont} rounded-b-3xl overflow-hidden`}>
              {/* Group Photo as background */}
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full overflow-hidden flex items-center justify-center">
                  {homeImages.groupPhoto1 && (
                    <img src={homeImages.groupPhoto1} alt="AKPsi Group Photo" className="w-full h-full object-cover object-[center_35%]" />
                  )}
                </div>
              </div>
              
              {/* Glass morphism background */}
              <div className={`absolute inset-0 ${akpsiColors.glassBlurMd} ${akpsiColors.glassBg} ${akpsiColors.glassBorder} z-10`}></div>
                              <div className="relative z-20 max-w-lg w-full px-6 md:px-12 flex flex-col items-start justify-center mx-auto">
                  <h2 className={`${akpsiColors.glassText} text-2xl md:text-4xl font-bold mb-6 leading-snug text-left ${heroFont}`} style={{textShadow: '0 2px 16px rgba(0,0,0,0.25), 0 0 1px rgba(0,0,0,0.8)'}}>
                    Alpha Kappa Psi <b>(ΑΚΨ)</b> is the nation&apos;s premier<br />
                    co-ed Business fraternity,<br />
                    providing mentorship and resources to students through programs, alumni networks, and much more.
                  </h2>
                  <a href="/about" className={`mt-4 px-8 py-3 ${akpsiColors.glassBg} ${akpsiColors.glassBgHover} ${akpsiColors.glassBlur} border-2 ${akpsiColors.glassBorder} ${akpsiColors.glassBorderHover} ${akpsiColors.glassText} font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg`}>LEARN MORE</a>
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
