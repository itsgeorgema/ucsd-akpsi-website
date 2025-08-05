"use client";

import { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { fontCombinations, akpsiFonts } from '../../styles/fonts';
import { colors } from '../../styles/colors';
import { getCompanyImages, Company, getAboutImages, AboutImages } from '../../utils/imageUtils';
import ScrollArrow from '../../components/ScrollArrow';
import BouncyFadeIn from '../../components/BouncyFadeIn';

interface StatModalData {
  title: string;
  image: string;
  description: string;
}

type ActiveTab = 'akpsi' | 'nuxi' | 'statistics';

export default function About() {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [images, setImages] = useState<AboutImages>({
    backgroundVideo: '',
    crest: '',
    akpsiLogo: '',
    groupPhoto1: '',
    groupPhoto2: '',
    genderPie: '',
    gradePie: '',
    industryDistribution: '',
    crestSvg: ''
  });
  const [selectedStat, setSelectedStat] = useState<StatModalData | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('akpsi');
  const [isTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [displayedTab, setDisplayedTab] = useState<ActiveTab>(activeTab);
  const [contentAnim, setContentAnim] = useState<'in' | 'out'>('in');

  // Initialize start time on client side only
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  // Auto-switch tabs every 15 seconds with progress bar
  useEffect(() => {
    if (startTime === 0) return; // Don't start until startTime is initialized

    const duration = 15000; // 15 seconds

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      // Allow progress to reach and stay at 100% briefly before switching
      if (newProgress >= 100) {
        setTimeout(() => {
          const tabs: ActiveTab[] = ['akpsi', 'nuxi', 'statistics'];
          const currentIndex = tabs.indexOf(activeTab);
          const nextIndex = (currentIndex + 1) % tabs.length;
          // Reset progress and animation state before switching
          setProgress(0);
          setContentAnim('out');
          setTimeout(() => {
            setDisplayedTab(tabs[nextIndex]);
            setActiveTab(tabs[nextIndex]);
            setStartTime(Date.now());
            setTimeout(() => {
              setContentAnim('in');
            }, 50);
          }, 400);
        }, 100); // Small delay to show 100% completion
      }
    };

    const interval = setInterval(updateProgress, 50); // Update every 50ms for smooth animation

    return () => clearInterval(interval);
  }, [activeTab, startTime]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        
        // Get about images from utility function
        const aboutImagesData = getAboutImages();
        setImages(aboutImagesData);

        // Fetch companies
        const companiesWithUrls = getCompanyImages();
        setCompanies(companiesWithUrls);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Text content variables
  const pageContent = {
    hero: {
      title: "ABOUT US",
      subtitle: "Learn more about the Nu Xi Chapter and the history of our fraternity."
    },
    akpsiInfo: {
      title: "WHAT IS ALPHA KAPPA PSI (AKΨ)?",
      foundingTitle: "THE FOUNDING",
      foundingText: "Founded on October 5, 1904, at New York University, Alpha Kappa Psi is the world's oldest and largest business fraternity. AKPsi was founded by \"Brooklyn Four\" --- George L. Bergen, Howard M. Jefferson, Nathan Lane Jr., and Frederic R. Leach --- with the purpose of developing its members into principled business leaders.",
      networkTitle: "THE NETWORK",
      networkText: "Alpha Kappa Psi is a Professional, Co-ed Business Fraternity that is open to all majors. This professional organization currently has over 298,000 initiated members at 219 universities in 4 countries. With an extensive network of alumni, members have access to countless opportunities and are prepared for a life of success."
    },
    nuXiInfo: {
      title: "ABOUT THE NU XI CHAPTER",
      subtitle: "UNIVERSITY OF CALIFORNIA - SAN DIEGO",
      professionalTitle: "PROFESSIONAL EXCELLENCE",
      professionalText: "Located in the sunny town of La Jolla, the Nu Xi (NΞ) Chapter brings the values of Alpha Kappa Psi to the UC San Diego campus. Established in 2019, the chapter has grown its presence on-campus and is continuing to develop an extensive alumni network in numerous different industries.",
      communityTitle: "BROTHERHOOD & COMMUNITY",
      communityText: "Beyond the professionalism, our Brothers are able to create lifelong friendships and find a community away from home. Alpha Kappa Psi welcomes individuals from all backgrounds and embraces the diverse student population. Our Brothers inspire and help each other pursue our greatest dreams."
    },
    statistics: {
      title: "NU XI CHAPTER STATISTICS",
      genderTitle: "GENDER DISTRIBUTION",
      gradeLevelTitle: "GRADE LEVEL DISTRIBUTION",
      genderDescription: "Our chapter maintains a diverse gender representation, fostering an inclusive environment where all members can thrive and contribute their unique perspectives to our professional community.",
      gradeLevelDescription: "With members across all academic levels, our chapter provides mentorship opportunities and peer support throughout the entire university journey."
    },
    contact: {
      title: "CONTACT NU XI",
      subtitle: "For any questions, please complete the form below. You may also contact us via social media for a quicker response time.",
      buttonText: "CONTACT US"
    }
  };

  const handleTabChange = (tab: ActiveTab) => {
  if (tab === activeTab) return;
  setContentAnim('out');
  setTimeout(() => {
    setDisplayedTab(tab);
    setContentAnim('out'); // Start new content in "out" state
    setTimeout(() => {
      setContentAnim('in'); // Then animate to "in"
    }, 50); // Small delay to ensure DOM update
    setProgress(0);
    setActiveTab(tab);
    setStartTime(Date.now());
  }, 400); // match animation duration
};

  const openStatModal = (type: 'gender' | 'grade') => {
    const modalData: StatModalData = {
      title: type === 'gender' ? pageContent.statistics.genderTitle : pageContent.statistics.gradeLevelTitle,
      image: type === 'gender' ? images.genderPie : images.gradePie,
      description: type === 'gender' ? pageContent.statistics.genderDescription : pageContent.statistics.gradeLevelDescription
    };
    setSelectedStat(modalData);
  };

  const renderTabContent = () => {
    let content;
    switch (displayedTab) {
      case 'akpsi':
        content = (
          <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="text-center mb-12">
              <h2 className={`text-4xl mb-6 ${colors.section.title} ${fontCombinations.section.main}`}>
                {pageContent.akpsiInfo.title}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8 w-full max-w-full mx-auto justify-items-center">
              {/* Founding Card */}
              <div className="bg-gradient-to-br from-[#F8F8F8] to-[#B3CDE0]/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#D4AF37]/20 hover:border-[#B89334]/40  transition-all duration-300 group w-full max-w-full mx-auto text-center">
                <div className="flex items-center mb-6 w-full max-w-full">
                  <div className="w-14 h-14 aspect-square rounded-full flex items-center justify-center bg-gradient-to-br from-[#003366] to-[#6497B1] mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className={`text-[#F8F8F8] text-sm ${fontCombinations.technical.label}`}>1904</span>
                  </div>
                  <h3 className={`text-2xl bg-gradient-to-r from-[#003366] to-[#6497B1] bg-clip-text text-transparent ${fontCombinations.section.secondary} break-words`}>
                    {pageContent.akpsiInfo.foundingTitle}
                  </h3>
                </div>
                <p className={`text-left relative pl-4 border-l-2 border-[#D4AF37]/30 ${colors.section.text} ${fontCombinations.content.body} break-words`}>
                  {pageContent.akpsiInfo.foundingText}
                </p>
              </div>

              {/* Network Card */}
              <div className="bg-gradient-to-br from-[#F8F8F8] to-[#D4AF37]/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#D4AF37]/20 hover:border-[#B89334]/40 transition-all duration-300 group w-full max-w-full mx-auto text-center">
                <div className="flex items-center mb-6 w-full max-w-full">
                <div className="w-14 h-14 bg-gradient-to-br from-[#003366] to-[#6497B1] aspect-square rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className={`text-[#F8F8F8] text-sm ${fontCombinations.technical.label}`}>298K+</span>
                  </div>
                  <h3 className={`text-2xl ${colors.section.title} ${fontCombinations.section.secondary} break-words`}>
                    {pageContent.akpsiInfo.networkTitle}
                  </h3>
                </div>
                <p className={`text-left relative pl-4 border-l-2 border-[#003366]/30 ${colors.section.text} ${fontCombinations.content.body} break-words`}>
                  {pageContent.akpsiInfo.networkText}
                </p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg w-full max-w-full mx-auto">
              {images.groupPhoto1 ? (
                <img src={images.groupPhoto1} alt="Group Photo About Page" className="w-full h-64 object-cover" />
              ) : (
                <div className={`w-full h-64 ${colors.bg.surfaceAlt} flex items-center justify-center`}>
                  <span className={`${colors.text.secondary} ${fontCombinations.content.small}`}>Loading group photo...</span>
                </div>
              )}
            </div>
          </div>
        );
        break;

      case 'nuxi':
        content = (
          <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="text-center mb-12">
              <h2 className={`text-4xl mb-4 ${colors.section.title} ${fontCombinations.section.main}`}>
                {pageContent.nuXiInfo.title}
              </h2>
              <h3 className={`text-xl mb-6 ${colors.section.subtitle} ${fontCombinations.section.tertiary}`}>
                {pageContent.nuXiInfo.subtitle}
              </h3>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center w-full max-w-full mx-auto justify-items-center">
              {/* Content Cards */}
              <div className="space-y-6 w-full max-w-full mx-auto">
                {/* Professional Excellence Card */}
                <div className="bg-gradient-to-br from-[#F8F8F8] to-[#B3CDE0]/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#D4AF37]/20 hover:border-[#B89334]/40 w-full max-w-full mx-auto box-border text-center">
                  <div className="flex items-center mb-4 w-full max-w-full">
                    <div className="w-10 h-10 md:w-12 md:h-12 aspect-square rounded-full flex items-center justify-center bg-blue-100 mr-4">
                      <svg className="w-5 h-5 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                      </svg>
                    </div>
                    <h3 className={`text-xl ${colors.section.title} ${fontCombinations.section.tertiary} break-words`}>
                      {pageContent.nuXiInfo.professionalTitle}
                    </h3>
                  </div>
                  <p className={`text-left ${colors.section.text} ${fontCombinations.content.body} break-words`}>
                    {pageContent.nuXiInfo.professionalText}
                  </p>
                </div>

                {/* Brotherhood & Community Card */}
                <div className="bg-gradient-to-br from-[#F8F8F8] to-[#B3CDE0]/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#D4AF37]/20 hover:border-[#B89334]/40 w-full max-w-full mx-auto box-border text-center">
                  <div className="flex items-center mb-4 w-full max-w-full">
                    <div className="w-10 h-10 md:w-12 md:h-12 aspect-square rounded-full flex items-center justify-center bg-blue-100 mr-4">
                      <svg className="w-5 h-5 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h3 className={`text-xl ${colors.section.title} ${fontCombinations.section.tertiary} break-words`}>
                      {pageContent.nuXiInfo.communityTitle}
                    </h3>
                  </div>
                  <p className={`text-left ${colors.section.text} ${fontCombinations.content.body} break-words`}>
                    {pageContent.nuXiInfo.communityText}
                  </p>
                </div>
              </div>

              {/* Chapter Image */}
              <div className="relative w-full max-w-full mx-auto">
                <div className="relative rounded-2xl overflow-hidden shadow-lg w-full max-w-full mx-auto">
                  {images.groupPhoto2 ? (
                    <img 
                      src={images.groupPhoto2} 
                      alt="Nu Xi Chapter Group Photo" 
                      className="w-full h-80 object-cover"/>
                  ) : (
                    <div className={`w-full h-80 ${colors.bg.surfaceAlt} flex items-center justify-center`}>
                      <span className={`${colors.text.secondary}`}>Loading chapter photo...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'statistics':
        content = (
          <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="text-center mb-12">
              <h2 className={`text-4xl mb-6 ${colors.section.title} ${fontCombinations.section.main}`}>
                {pageContent.statistics.title}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8 w-full max-w-full mx-auto justify-items-center">
              {/* Gender Statistics Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center border border-[#D4AF37]/20 hover:border-[#B89334]/40 w-full max-w-full mx-auto box-border text-center">
                <h3 className={`text-2xl mb-6 ${colors.section.title} ${fontCombinations.section.secondary}`}>
                  {pageContent.statistics.genderTitle}
                </h3>
                <div className="flex justify-center items-center mb-6">
                  {images.genderPie ? (
                    <div className="relative flex items-center justify-center w-50 h-50 md:w-56 md:h-56 lg:w-64 lg:h-64">
                      <img 
                        src={images.genderPie} 
                        alt="Gender Distribution Pie Chart" 
                        className="max-w-full max-h-full object-contain" 
                      />
                    </div>
                  ) : (
                    <div className={`w-64 h-64 ${colors.bg.surfaceAlt} rounded-full flex items-center justify-center`}>
                      <span className={`${colors.text.secondary}`}>Loading chart...</span>
                    </div>
                  )}
                </div>
                <button 
                  className={`group inline-flex items-center px-6 py-3 bg-gradient-to-r ${colors.gradient.brand} ${colors.text.inverse} rounded-lg hover:${colors.gradient.brandReverse} transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl transform cursor-pointer ${fontCombinations.interactive.primary}`}
                  onClick={() => openStatModal('gender')}
                >
                  View Details
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Grade Level Statistics Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center border border-[#D4AF37]/20 hover:border-[#B89334]/40 w-full max-w-full mx-auto box-border text-center">
                <h3 className={`text-2xl mb-6 ${colors.section.title} ${fontCombinations.section.secondary}`}>
                  {pageContent.statistics.gradeLevelTitle}
                </h3>
                <div className="flex justify-center items-center mb-6">
                  {images.gradePie ? (
                    <div className="relative flex items-center justify-center w-50 h-50 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto">
                      <img 
                        src={images.gradePie} 
                        alt="Grade Level Distribution Pie Chart" 
                        className="max-w-full max-h-full object-contain" 
                      />
                    </div>
                  ) : (
                    <div className={`w-64 h-64 ${colors.bg.surfaceAlt} rounded-full flex items-center justify-center`}>
                      <span className={`${colors.text.secondary}`}>Loading chart...</span>
                    </div>
                  )}
                </div>
                <button 
                  className={`group inline-flex items-center px-6 py-3 bg-gradient-to-r ${colors.gradient.brand} ${colors.text.inverse} rounded-lg hover:${colors.gradient.brandReverse} transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl transform cursor-pointer ${fontCombinations.interactive.primary}`}
                  onClick={() => openStatModal('grade')}
                >
                  View Details
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Industry Distribution */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#D4AF37]/20 hover:border-[#B89334]/40 w-full max-w-full mx-auto box-border text-center">
              <h3 className={`text-2xl text-center mb-8 ${colors.section.title} ${fontCombinations.section.secondary}`}>
                INDUSTRY DISTRIBUTION
              </h3>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                {/* Industry Chart */}
                <div className="relative flex-shrink-0 w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full mx-auto">
                  <img 
                    src={images.industryDistribution} 
                    alt="Industries Distribution Chart" 
                    className="w-full h-full object-contain rounded-full" 
                  />
                </div>

                {/* Industry Labels */}
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { label: "37% STEM", color: "#ec7c6c" },
                    { label: "29% Business", color: "#16044f" },
                    { label: "20% Design", color: "#9d336f" },
                    { label: "10% Finance & Accounting", color: "#ca5772" },
                    { label: "4% Political Science", color: "#651766" }
                  ].map((industry, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-4 h-4 rounded-full mr-3 aspect-square justify-center items-center" style={{ backgroundColor: industry.color }}></div>
                      <span className={`text-sm ${colors.section.title} ${fontCombinations.technical.label} block text-left`}>
                        {industry.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        break;

      default:
        content = null;
    }
    return (
      <div
        key={displayedTab}
        className={`transition-all duration-500 ${contentAnim === 'in' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ease-in-out`}
      >
        {content}
      </div>
    );
  };

  return (
    <>
      <div className="relative">
        {/* Full Page Background Video */}
        {images.backgroundVideo && (
          <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center' }}
              onError={(e) => console.error('Video error:', e)}
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
            >
              <source src={images.backgroundVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {/* Fallback background image if video fails to load */}
        {!images.backgroundVideo && (
          <div 
            className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat bg-black"
          />
        )}
        <div className="relative z-20 min-h-screen flex flex-col about-page">
          {loading ? (
            <main className="flex-1 flex items-center justify-center py-16 px-4">
              <LoadingSpinner size="large" fullScreen={false} type="component" />
            </main>
          ) : (
            <>
              {/* Hero Section - UNCHANGED */}
              <section className="relative flex flex-col items-center justify-center text-center z-10 min-h-screen">
                {/* Crest/Logo */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-8">
                    {images.crest ? (
                      <img src={images.crest} alt="AKPsi Crest" className="object-contain w-72 h-80 mx-auto" />
                    ) : (
                      <div className={`w-72 h-80 ${colors.bg.surfaceAlt} flex items-center justify-center`}>
                        <span className={`${colors.text.secondary} ${akpsiFonts.bodyFont}`}>Loading crest...</span>
                      </div>
                    )}
                  </div>
                  <h1 className={`text-5xl md:text-7xl mb-6 drop-shadow-2xl ${colors.text.inverse} ${akpsiFonts.heroTitleFont}`}>{pageContent.hero.title}</h1>
                  <p className={`text-xl md:text-2xl mb-12 drop-shadow-lg max-w-3xl mx-auto ${colors.glass.textSubtle} ${akpsiFonts.sectionTextFont}`}>
                    {pageContent.hero.subtitle}
                  </p>
                  <ScrollArrow />
                </div>
              </section>
              {/* Combined Modal Card and Companies Section */}
              <section className="relative py-20 z-10 px-4 sm:px-6 lg:px-8" data-modal-card>
                {/* Enhanced background layer */}
                <div className={`absolute inset-0 bg-white/85 backdrop-blur-lg rounded-3xl border border-[#B3CDE0]/30 shadow-2xl`}></div>
                <div className="relative z-10 w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Tab group and content card wrapped together for synchronized bounce */}
                  <BouncyFadeIn delay={0.3} threshold={.05} bounce={0}>
                    <div className="space-y-0 w-full mx-auto">
                      <div className="relative flex flex-col md:flex-row w-full mx-auto gap-0 mb-0">
                        {['akpsi', 'nuxi', 'statistics'].map((tab, index) => {
                          const isLastTab = index === 2;
                          const isFirstTab = index === 0;
                          
                          return (
                            <button
                              key={tab}
                              onClick={() => handleTabChange(tab as ActiveTab)}
                              className={`transition-all duration-500 
                                ${/* Desktop: top rounded corners only */ ''}
                                md:rounded-t-2xl
                                ${/* Mobile: conditional rounding based on position */ ''}
                                ${isFirstTab ? 'rounded-t-2xl' : ''}
                                ${isLastTab ? 'md:rounded-b-none' : ''}
                                ${!isFirstTab && !isLastTab ? '' : ''}
                                flex items-center justify-start relative h-16 cursor-pointer 
                                ${activeTab === tab ? 'bg-gray-200 text-[#212121] z-10' : 'bg-gray-200 text-[#212121] hover:bg-white hover:text-[#212121] hover:z-10 z-0'} 
                                border-t border-l border-r border-[#B3CDE0]/30 hover:border-[#B3CDE0]/40 shadow-lg overflow-hidden ${fontCombinations.interactive.primary}`}
                            style={{
                              flexGrow: activeTab === tab ? 1.5 : 1,
                              flexShrink: 1,
                              flexBasis: 0,
                              height: '64px',
                              minHeight: '64px',
                              maxHeight: '64px',
                              marginBottom: '0px',
                              transition: 'flex-grow 0.5s cubic-bezier(0.4,0,0.2,1), background 0.3s, color 0.3s',
                              boxShadow: 'none',
                            }}
                          >
                            {/* Progress bar - fills button edge to edge */}
                            {activeTab === tab && (
                              <div
                                className="absolute top-0 bottom-0 left-0 right-0 z-0 overflow-hidden"
                              >
                                <div
                                  className="bg-white h-full transition-all duration-50 ease-linear md:rounded-tr-2xl"
                                  style={{ 
                                    width: `${progress}%`,
                                  }}
                                />
                              </div>
                            )}
                            <span className="relative z-10 text-left w-full flex items-center pr-8">
                              <div className="h-14 w-14 mr-3 ml-1 rounded-2xl flex items-center justify-center">
                                {tab === 'akpsi' && images.crestSvg && (
                                  <img 
                                    src={images.crestSvg} 
                                    alt="AKPsi Crest" 
                                    className="w-12 h-12 object-contain"
                                  />
                                )}
                                {tab === 'nuxi' && images.akpsiLogo && (
                                  <img 
                                    src={images.akpsiLogo} 
                                    alt="AKPsi Logo" 
                                    className="w-10 h-10 object-contain"
                                  />
                                )}
                                {tab === 'statistics' && (
                                  <svg className="w-12 h-12 text-[#003366]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 18v-4M8 18v-8M12 18v-6M16 18v-10M20 18v-2"/>
                                  </svg>
                                )}
                              </div>
                              <span className={`text-base ${fontCombinations.navigation.primary}`}>
                                {tab === 'akpsi' && 'ABOUT AKPSI'}
                                {tab === 'nuxi' && 'OUR CHAPTER'}
                                {tab === 'statistics' && 'CHAPTER STATISTICS'}
                              </span>
                            </span>
                          </button>
                          );
                        })}
                      </div>
                      <div 
                        className={`bg-white backdrop-blur-md rounded-b-2xl shadow-2xl border-b border-r border-l border-[#B3CDE0]/30 overflow-hidden overflow-x-hidden relative z-0 w-full max-w-full mx-auto box-border`}
                        style={{ height: '900px', marginTop: '0px' }}
                      >
                        {/* Tab Content */}
                        <div className="p-6 md:p-8 lg:p-12 h-full w-full overflow-y-auto box-border flex flex-col items-center justify-start">
                          <div className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
                            {renderTabContent()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </BouncyFadeIn>
                  {/* Companies Section */}
                  <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-0">
                    <BouncyFadeIn delay={.1} threshold={.2} bounce={0} className="mt-[-100px] pt-[100px]">
                      <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 lg:p-12 mt-8">
                        <div className="text-center mb-12">
                          <h2 className={`text-4xl mb-6 ${colors.section.title} ${fontCombinations.section.main}`}>
                            WHERE WE&apos;RE AT
                          </h2>
                          <p className={`text-lg max-w-3xl mx-auto ${colors.section.text} ${fontCombinations.content.lead}`}>
                            Our brothers have secured positions at leading companies across various industries
                          </p>
                        </div>
                        {companies.length === 0 ? (
                          <div className="text-center py-12">
                            <div className={`w-16 h-16 ${colors.bg.surfaceAlt} rounded-full flex items-center justify-center mx-auto mb-4 `}>
                              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className={`text-xl ${colors.section.text} ${fontCombinations.content.lead}`}>No companies found</span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {companies.map((company, index) => (
                              <div 
                                key={index}
                                className={`group relative bg-white/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:scale-105 border border-[#D4AF37]/20 hover:border-[#B89334]/40`}
                              >
                                <div className="aspect-square flex items-center justify-center">
                                  <img 
                                    src={company.imageUrl} 
                                    alt={company.name ? company.name : 'Company logo'} 
                                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                                    onError={() => console.error('Image failed to load:', company.imageUrl)}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </BouncyFadeIn>
                  </div>
                </div>
              </section>
              {/* Contact Section */}
              <section className="relative py-20 z-10 px-4 sm:px-6 lg:px-8">
                <BouncyFadeIn delay={0.1} threshold={.4} className="mt-[-100px] pt-[100px]">
                  <div className="max-w-4xl mx-auto px-4">
                    <div className="w-full max-w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 lg:p-12 text-center">
                    <div className="mb-8">
                      <h2 className={`text-4xl mb-6 ${colors.section.title} ${fontCombinations.section.main}`}>
                        {pageContent.contact.title}
                      </h2>
                      <p className={`text-lg max-w-2xl mx-auto ${colors.section.text} ${fontCombinations.content.lead}`}>
                        {pageContent.contact.subtitle}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <a
                        href="/contact"
                        className={`group inline-flex items-center px-8 py-4 bg-gradient-to-r ${colors.gradient.brand} ${colors.text.inverse} rounded-lg hover:${colors.gradient.brandReverse} transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 ${fontCombinations.interactive.primary}`}
                      >
                        {pageContent.contact.buttonText}
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                </BouncyFadeIn>
              </section>
            </>
          )}
        </div>
        {/* Statistics Modal */}
        {selectedStat && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className={`${colors.section.bg} rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto transition-transform duration-300`}>
              <div className="p-8 relative">
                <button
                  onClick={() => setSelectedStat(null)}
                  className="w-8 h-8 aspect-square flex items-center justify-center absolute top-4 right-4 z-10 cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-3xl ${colors.section.title} ${fontCombinations.section.main}`}>{selectedStat?.title}</h3>
                </div>
                <div className="flex justify-center items-center mb-6">
                  <div className="relative flex items-center justify-center w-80 h-80">
                    <img 
                      src={selectedStat?.image} 
                      alt={selectedStat?.title} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
                <p className={`text-lg ${colors.section.text} ${fontCombinations.content.lead}`}>
                  {selectedStat?.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}