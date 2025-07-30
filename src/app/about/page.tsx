"use client";

import { useState, useEffect } from 'react';
import { createClient } from '../../../supabase/client';
import ScrollArrow from '../../components/ScrollArrow';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';
import BouncyFadeIn from '../../components/BouncyFadeIn';
import { colors } from '../../styles/colors';
import { akpsiFonts } from '../../styles/fonts';

interface Company {
  image_path: string;
  imageUrl: string;
}

interface AboutImages {
  background: string;
  backgroundVideo: string;
  crest: string;
  akpsiLogo: string;
  groupPhoto1: string;
  groupPhoto2: string;
  genderPie: string;
  gradePie: string;
  industryDistribution: string;
}

interface StatModalData {
  title: string;
  image: string;
  description: string;
}

type ActiveTab = 'akpsi' | 'nuxi' | 'statistics';

export default function About() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [images, setImages] = useState<AboutImages>({
    background: '',
    backgroundVideo: '',
    crest: '',
    akpsiLogo: '',
    groupPhoto1: '',
    groupPhoto2: '',
    genderPie: '',
    gradePie: '',
    industryDistribution: ''
  });
  const [loading, setLoading] = useState(true);
  const [selectedStat, setSelectedStat] = useState<StatModalData | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('akpsi');
  const [isTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [displayedTab, setDisplayedTab] = useState<ActiveTab>(activeTab);
  const [contentAnim, setContentAnim] = useState<'in' | 'out'>('in');

  // Auto-switch tabs every 12 seconds with progress bar
  useEffect(() => {
    const duration = 12000; // 12 seconds

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
          handleTabChange(tabs[nextIndex]);
        }, 100); // Small delay to show 100% completion
      }
    };

    const interval = setInterval(updateProgress, 50); // Update every 50ms for smooth animation

    return () => clearInterval(interval);
  }, [activeTab, startTime]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const supabase = createClient();
        
        // Define image paths to fetch directly from storage bucket
        const imagePaths = [
          'aboutBackground.jpeg',
          'backgroundVid3.mp4',
          'crest.png',
          'akpsiLogo.png',
          'groupAbout1.jpeg', 
          'groupAbout2.jpeg',
          'genderPie.png',
          'gradePie.png',
          'industryDistribution.png'
        ];
        
        // Generate public URLs for each image directly from storage
        const imageUrls: AboutImages = {
          background: '',
          backgroundVideo: '',
          crest: '',
          akpsiLogo: '',
          groupPhoto1: '',
          groupPhoto2: '',
          genderPie: '',
          gradePie: '',
          industryDistribution: ''
        };

        imagePaths.forEach(imagePath => {
          const { data: imageData } = supabase.storage
            .from('about-page')
            .getPublicUrl(imagePath);
          
          // Map image paths to their corresponding state properties
          switch (imagePath) {
            case 'aboutBackground.jpeg':
              imageUrls.background = imageData.publicUrl;
              break;
            case 'backgroundVid3.mp4':
              imageUrls.backgroundVideo = imageData.publicUrl;
              break;
            case 'crest.png':
              imageUrls.crest = imageData.publicUrl;
              break;
            case 'akpsiLogo.png':
              imageUrls.akpsiLogo = imageData.publicUrl;
              break;
            case 'groupAbout1.jpeg':
              imageUrls.groupPhoto1 = imageData.publicUrl;
              break;
            case 'groupAbout2.jpeg':
              imageUrls.groupPhoto2 = imageData.publicUrl;
              break;
            case 'genderPie.png':
              imageUrls.genderPie = imageData.publicUrl;
              break;
            case 'gradePie.png':
              imageUrls.gradePie = imageData.publicUrl;
              break;
            case 'industryDistribution.png':
              imageUrls.industryDistribution = imageData.publicUrl;
              break;
          }
        });
        setImages(imageUrls);
        
        // Fetch companies
        const { data: companiesData, error: companiesError } = await supabase
          .from('companies')
          .select('image_path');

        if (companiesError) {
          console.error('Error fetching companies:', companiesError);
          setCompanies([]);
        } else if (companiesData) {
          console.log('Fetched companies data:', companiesData);
          const companiesWithUrls = companiesData.map(company => {
            console.log('Processing company:', company);
            const cleanImagePath = company.image_path.trim();
            const { data: imageData } = supabase.storage
              .from('home-page-companies')
              .getPublicUrl(cleanImagePath);
            
            console.log('Generated URL for', cleanImagePath, ':', imageData.publicUrl);
            
            return {
              image_path: cleanImagePath,
              imageUrl: imageData.publicUrl,
            };
          });

          console.log('Final companies with URLs:', companiesWithUrls);
          setCompanies(companiesWithUrls);
        }
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
              <h2 className={`text-4xl font-bold mb-6 ${colors.section.title} ${akpsiFonts.sectionTitleFont}`}>
                {pageContent.akpsiInfo.title}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Founding Card */}
              <div className="bg-gradient-to-br from-[#F8F8F8] to-[#B3CDE0]/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#B3CDE0]/20 hover:border-[#D4AF37]/40 transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#003366] to-[#6497B1] rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-[#F8F8F8] font-bold text-sm">1904</span>
                  </div>
                  <h3 className={`text-2xl font-bold bg-gradient-to-r from-[#003366] to-[#6497B1] bg-clip-text text-transparent ${akpsiFonts.sectionTitleFont}`}>
                    {pageContent.akpsiInfo.foundingTitle}
                  </h3>
                </div>
                <p className={`text-base leading-relaxed ${colors.section.text} ${akpsiFonts.sectionTextFont} relative pl-4 border-l-2 border-[#D4AF37]/30`}>
                  {pageContent.akpsiInfo.foundingText}
                </p>
              </div>

              {/* Network Card */}
              <div className="bg-gradient-to-br from-[#F8F8F8] to-[#D4AF37]/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#D4AF37]/20 hover:border-[#B89334]/40 transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-900 font-bold text-xs">298K+</span>
                  </div>
                  <h3 className={`text-2xl font-bold ${colors.section.title} ${akpsiFonts.sectionTitleFont}`}>
                    {pageContent.akpsiInfo.networkTitle}
                  </h3>
                </div>
                <p className={`text-base leading-relaxed ${colors.section.text} ${akpsiFonts.sectionTextFont}`}>
                  {pageContent.akpsiInfo.networkText}
                </p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              {images.groupPhoto1 ? (
                <img src={images.groupPhoto1} alt="Group Photo About Page" className="w-full h-64 object-cover" />
              ) : (
                <div className={`w-full h-64 ${colors.bg.surfaceAlt} flex items-center justify-center`}>
                  <span className={`${colors.text.secondary}`}>Loading group photo...</span>
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
              <h2 className={`text-4xl font-bold mb-4 ${colors.section.title} ${akpsiFonts.sectionTitleFont}`}>
                {pageContent.nuXiInfo.title}
              </h2>
              <h3 className={`text-xl font-medium mb-6 ${colors.section.subtitle} ${akpsiFonts.sectionSubtitleFont}`}>
                {pageContent.nuXiInfo.subtitle}
              </h3>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Content Cards */}
              <div className="space-y-6">
                {/* Professional Excellence Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                      </svg>
                    </div>
                    <h3 className={`text-xl font-bold ${colors.section.title} ${akpsiFonts.sectionTitleFont}`}>
                      {pageContent.nuXiInfo.professionalTitle}
                    </h3>
                  </div>
                  <p className={`text-base leading-relaxed ${colors.section.text} ${akpsiFonts.sectionTextFont}`}>
                    {pageContent.nuXiInfo.professionalText}
                  </p>
                </div>

                {/* Brotherhood & Community Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h3 className={`text-xl font-bold ${colors.section.title} ${akpsiFonts.sectionTitleFont}`}>
                      {pageContent.nuXiInfo.communityTitle}
                    </h3>
                  </div>
                  <p className={`text-base leading-relaxed ${colors.section.text} ${akpsiFonts.sectionTextFont}`}>
                    {pageContent.nuXiInfo.communityText}
                  </p>
                </div>
              </div>

              {/* Chapter Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  {images.groupPhoto2 ? (
                    <img 
                      src={images.groupPhoto2} 
                      alt="Nu Xi Chapter Group Photo" 
                      className="w-full h-80 object-cover"
                    />
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
              <h2 className={`text-4xl font-bold mb-6 ${colors.section.title} ${akpsiFonts.sectionTitleFont}`}>
                {pageContent.statistics.title}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Gender Statistics Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
                <h3 className={`text-2xl font-bold mb-6 ${colors.section.title} ${akpsiFonts.sectionTitleFont}`}>
                  {pageContent.statistics.genderTitle}
                </h3>
                <div className="flex justify-center items-center mb-6">
                  {images.genderPie ? (
                    <div className="relative flex items-center justify-center w-64 h-64">
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
                  className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-300 font-semibold hover:scale-105 shadow-lg hover:shadow-xl transform cursor-pointer"
                  onClick={() => openStatModal('gender')}
                >
                  View Details
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Grade Level Statistics Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
                <h3 className={`text-2xl font-bold mb-6 ${colors.section.title} ${akpsiFonts.sectionTitleFont}`}>
                  {pageContent.statistics.gradeLevelTitle}
                </h3>
                <div className="flex justify-center items-center mb-6">
                  {images.gradePie ? (
                    <div className="relative flex items-center justify-center w-64 h-64">
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
                  className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-300 font-semibold hover:scale-105 shadow-lg hover:shadow-xl transform cursor-pointer"
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <h3 className={`text-2xl font-bold text-center mb-8 ${colors.section.title} ${akpsiFonts.sectionTitleFont}`}>
                INDUSTRY DISTRIBUTION
              </h3>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                {/* Industry Chart */}
                <div className="relative flex-shrink-0">
                  {images.industryDistribution ? (
                    <img 
                      src={images.industryDistribution} 
                      alt="Industries Distribution Chart" 
                      className="w-64 h-64 object-contain"
                    />
                  ) : (
                    <div className={`w-64 h-64 ${colors.bg.surfaceAlt} rounded-full flex items-center justify-center`}>
                      <span className={`${colors.text.secondary}`}>Loading industry chart...</span>
                    </div>
                  )}
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
                      <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: industry.color }}></div>
                      <span className={`text-sm font-semibold ${colors.section.title} ${akpsiFonts.sectionTitleFont}`}>
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getProgressBarWidth = (progress: number) => `${progress}%`;

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
        {!images.backgroundVideo && images.background && (
          <div 
            className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${images.background})`,
            }}
          />
        )}
        <div className="relative z-20 min-h-screen flex flex-col">
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#F8F8F8]/95 via-[#F8F8F8]/90 to-[#B3CDE0]/20 backdrop-blur-lg rounded-3xl border border-[#B3CDE0]/30 shadow-2xl"></div>
                <div className="relative z-10 max-w-6xl mx-auto">
                  <div className="flex flex-col space-y-6">
                    {/* Tab Buttons - Sliding Flex Group */}
                    <BouncyFadeIn delay={0.3}>
                      <div className="relative flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-2 md:gap-x-2 mb-1" style={{minHeight: 64, height: 'auto'}}>
                        {['akpsi', 'nuxi', 'statistics'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => handleTabChange(tab as ActiveTab)}
                          className={`transition-all duration-500 font-semibold rounded-2xl flex items-center justify-start relative h-16 cursor-pointer ${activeTab === tab ? 'bg-gradient-to-r from-[#6497B1] to-[#B3CDE0] text-[#F8F8F8]' : 'bg-gradient-to-r from-[#F8F8F8] to-[#E0E0E0] text-[#212121] hover:from-[#B3CDE0]/20 hover:to-[#D4AF37]/10'} shadow-lg overflow-hidden border ${activeTab === tab ? 'border-[#6497B1]' : 'border-[#E0E0E0] hover:border-[#B3CDE0]/40'}`}
                          style={{
                            flexGrow: activeTab === tab ? 1.5 : 1,
                            flexShrink: 1,
                            flexBasis: 0,
                            height: '64px',
                            minHeight: '64px',
                            maxHeight: '64px',
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
                                className="bg-blue-200 h-full transition-all duration-50 ease-linear rounded-2xl"
                                style={{ 
                                  width: `${progress}%`,
                                }}
                              />
                            </div>
                          )}
                          <span className="relative z-10 text-left w-full flex items-center pr-8">
                            <div className={`h-14 w-14 mr-3 ml-1 rounded-2xl flex items-center justify-center bg-blue-700
                            }`}>
                              {tab === 'akpsi' && images.crest && (
                                <img 
                                  src={images.crest} 
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
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="0.5" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 18v-4M8 18v-8M12 18v-6M16 18v-10M20 18v-2"/>
                                </svg>
                              )}
                            </div>
                            <span className="font-semibold text-base">
                              {tab === 'akpsi' && 'WHAT IS AKPSI'}
                              {tab === 'nuxi' && 'NU XI CHAPTER'}
                              {tab === 'statistics' && 'STATISTICS'}
                            </span>
                          </span>
                        </button>
                      ))}
                      </div>
                    </BouncyFadeIn>
                                         {/* Main Card */}
                     <BouncyFadeIn delay={0.2}>
                       <div 
                         className="bg-gradient-to-br from-[#F8F8F8]/95 via-[#F8F8F8]/90 to-[#B3CDE0]/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-[#B3CDE0]/30"
                         style={{ height: '800px' }}
                       >
                       {/* Tab Content */}
                       <div className="p-8 lg:p-12 h-full overflow-y-auto">
                         {renderTabContent()}
                       </div>
                                            </div>
                     </BouncyFadeIn>
                    {/* Companies Section */}
                    <BouncyFadeIn delay={.1} threshold={.2} className="mt-[-100px] pt-[100px]">
                      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 lg:p-12 mt-8">
                      <div className="text-center mb-12">
                        <h2 className={`text-4xl font-bold mb-6 ${colors.section.title} ${akpsiFonts.sectionTitleFont}`}>
                          WHERE WE&apos;RE AT
                        </h2>
                        <p className={`text-lg max-w-3xl mx-auto ${colors.section.text} ${akpsiFonts.sectionTextFont}`}>
                          Our brothers have secured positions at leading companies across various industries
                        </p>
                      </div>
                      {companies.length === 0 ? (
                        <div className="text-center py-12">
                          <div className={`w-16 h-16 ${colors.bg.surfaceAlt} rounded-full flex items-center justify-center mx-auto mb-4`}>
                            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className={`text-xl ${colors.section.text}`}>No companies found</span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                          {companies.map((company, index) => (
                            <div 
                              key={index}
                              className="group relative bg-white/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:scale-105"
                            >
                              <div className="aspect-square flex items-center justify-center">
                                <img 
                                  src={company.imageUrl} 
                                  alt={company.image_path ? company.image_path.replace('.png', '') : 'Company logo'} 
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
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 lg:p-12 text-center">
                    <div className="mb-8">
                      <h2 className={`text-4xl font-bold mb-6 ${colors.section.title} ${akpsiFonts.sectionTitleFont}`}>
                        {pageContent.contact.title}
                      </h2>
                      <p className={`text-lg leading-relaxed max-w-2xl mx-auto ${colors.section.text} ${akpsiFonts.sectionTextFont}`}>
                        {pageContent.contact.subtitle}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <a
                        href="/contact"
                        className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
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
              {/* Footer */}
              <Footer />
            </>
          )}
        </div>
      </div>
      {/* Statistics Modal */}
      {selectedStat && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${colors.section.bg} rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto transition-transform duration-300`}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-3xl font-bold ${colors.section.title} ${akpsiFonts.sectionTitleFont}`}>
                  {selectedStat?.title}
                </h3>
                <button
                  onClick={() => setSelectedStat(null)}
                  className={`w-10 h-10 ${colors.bg.surfaceAlt} hover:bg-gray-200 rounded-md flex items-center justify-center transition-colors duration-200 cursor-pointer`}>
                  <svg className={`w-6 h-6 ${colors.text.secondary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
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
              <p className={`text-lg leading-relaxed ${colors.section.text} ${akpsiFonts.sectionTextFont}`}>
                {selectedStat?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}