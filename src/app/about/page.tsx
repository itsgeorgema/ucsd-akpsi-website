"use client";

import { useState, useEffect } from 'react';
import { createClient } from '../../../supabase/client';
import ScrollArrow from '../../components/ScrollArrow';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';
import { akpsiColors } from '../../styles/colors';
import { akpsiFonts } from '../../styles/fonts';

interface Company {
  image_path: string;
  imageUrl: string;
}

interface AboutImages {
  background: string;
  backgroundVideo: string;
  crest: string;
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

export default function About() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [images, setImages] = useState<AboutImages>({
    background: '',
    backgroundVideo: '',
    crest: '',
    groupPhoto1: '',
    groupPhoto2: '',
    genderPie: '',
    gradePie: '',
    industryDistribution: ''
  });
  const [loading, setLoading] = useState(true);
  const [selectedStat, setSelectedStat] = useState<StatModalData | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const supabase = createClient();
        
        // Define image paths to fetch directly from storage bucket
        const imagePaths = [
          'aboutBackground.jpeg',
          'backgroundVid3.mp4',
          'crest.png',
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
      title: "OUR HISTORY",
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

  const openStatModal = (type: 'gender' | 'grade') => {
    const modalData: StatModalData = {
      title: type === 'gender' ? pageContent.statistics.genderTitle : pageContent.statistics.gradeLevelTitle,
      image: type === 'gender' ? images.genderPie : images.gradePie,
      description: type === 'gender' ? pageContent.statistics.genderDescription : pageContent.statistics.gradeLevelDescription
    };
    setSelectedStat(modalData);
  };

  return (
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
                  <div className={`w-72 h-80 ${akpsiColors.statCircleBg} flex items-center justify-center`}>
                    <span className={`${akpsiColors.statCircleText} ${akpsiFonts.bodyFont}`}>Loading crest...</span>
                  </div>
                )}
              </div>
              <h1 className={`text-5xl md:text-7xl mb-6 drop-shadow-2xl ${akpsiColors.heroTitle} ${akpsiFonts.heroTitleFont}`}>{pageContent.hero.title}</h1>
              <p className={`text-xl md:text-2xl mb-12 drop-shadow-lg max-w-3xl mx-auto ${akpsiColors.heroSubtitle} ${akpsiFonts.sectionTextFont}`}>
                {pageContent.hero.subtitle}
              </p>
              <ScrollArrow />
            </div>
          </section>

          {/* What is Alpha Kappa Psi Section - REDESIGNED */}
          <section id="akpsi-info" className="relative py-20 z-10 bg-gradient-to-b from-white/95 to-gray-50/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                                <h2 className={`text-5xl font-bold mb-6 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
                  {pageContent.akpsiInfo.title}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-700 mx-auto rounded-md"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Founding Card */}
                <div className={`${akpsiColors.sectionBg}/90 backdrop-blur-sm rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border ${akpsiColors.navBarBorder} hover:scale-105`}>
                  <div className="flex items-center mb-6">
                                      <div className={`w-12 h-12 ${akpsiColors.sectionTitleBg} rounded-full flex items-center justify-center mr-4`}>
                    <span className={`${akpsiColors.contactButtonText} font-bold text-xl`}>1904</span>
                  </div>
                    <h3 className={`text-2xl font-bold ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
                      {pageContent.akpsiInfo.foundingTitle}
                    </h3>
                  </div>
                  <p className={`text-lg leading-relaxed ${akpsiColors.sectionText} ${akpsiFonts.sectionTextFont}`}>
                    {pageContent.akpsiInfo.foundingText}
                  </p>
                </div>

                {/* Network Card */}
                <div className={`${akpsiColors.sectionBg}/90 backdrop-blur-sm rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border ${akpsiColors.navBarBorder} hover:scale-105`}>
                  <div className="flex items-center mb-6">
                                      <div className={`w-12 h-12 ${akpsiColors.sectionTitleBg} rounded-full flex items-center justify-center mr-4`}>
                    <span className={`${akpsiColors.contactButtonText} font-bold text-sm`}>298K+</span>
                  </div>
                    <h3 className={`text-2xl font-bold ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
                      {pageContent.akpsiInfo.networkTitle}
                    </h3>
                  </div>
                  <p className={`text-lg leading-relaxed ${akpsiColors.sectionText} ${akpsiFonts.sectionTextFont}`}>
                    {pageContent.akpsiInfo.networkText}
                  </p>
              </div>
            </div>

              {/* Featured Image */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
                {images.groupPhoto1 ? (
                  <img src={images.groupPhoto1} alt="Group Photo About Page" className="w-full h-96 object-cover" />
                ) : (
                                    <div className={`w-full h-96 ${akpsiColors.statCircleBg} flex items-center justify-center`}>
                    <span className={`${akpsiColors.statCircleText}`}>Loading group photo...</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </section>

          {/* About Nu Xi Chapter Section - REDESIGNED */}
          <section className="relative py-20 z-10 bg-gradient-to-b from-gray-50/95 to-white/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className={`text-5xl font-bold mb-4 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
                  {pageContent.nuXiInfo.title}
                </h2>
                <h3 className={`text-2xl font-medium mb-6 ${akpsiColors.sectionSubtitle} ${akpsiFonts.sectionSubtitleFont}`}>
                  {pageContent.nuXiInfo.subtitle}
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-700 mx-auto rounded-md"></div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content Cards */}
                <div className="space-y-8">
                  {/* Professional Excellence Card */}
                  <div 
                    className={`${akpsiColors.sectionBg}/90 backdrop-blur-sm rounded-lg shadow-xl p-8 border ${akpsiColors.navBarBorder} transition-all duration-300 hover:shadow-2xl hover:scale-105`}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 ${akpsiColors.sectionTitleBg} rounded-full flex items-center justify-center mr-4`}>
                        <svg className={`w-5 h-5 ${akpsiColors.contactButtonText}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                        </svg>
                      </div>
                      <h3 className={`text-2xl font-bold ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
                        {pageContent.nuXiInfo.professionalTitle}
                      </h3>
                    </div>
                    <p className={`text-lg leading-relaxed ${akpsiColors.sectionText} ${akpsiFonts.sectionTextFont}`}>
                      {pageContent.nuXiInfo.professionalText}
                    </p>
                  </div>

                  {/* Brotherhood & Community Card */}
                  <div 
                    className={`${akpsiColors.sectionBg}/90 backdrop-blur-sm rounded-lg shadow-xl p-8 border ${akpsiColors.navBarBorder} transition-all duration-300 hover:shadow-2xl hover:scale-105`}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 ${akpsiColors.sectionTitleBg} rounded-full flex items-center justify-center mr-4`}>
                        <svg className={`w-5 h-5 ${akpsiColors.contactButtonText}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <h3 className={`text-2xl font-bold ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
                        {pageContent.nuXiInfo.communityTitle}
                      </h3>
                    </div>
                    <p className={`text-lg leading-relaxed ${akpsiColors.sectionText} ${akpsiFonts.sectionTextFont}`}>
                      {pageContent.nuXiInfo.communityText}
                    </p>
                  </div>
                </div>

                {/* Chapter Image */}
                <div className="relative">
                  <div className="relative rounded-lg overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
                    {images.groupPhoto2 ? (
                      <img 
                        src={images.groupPhoto2} 
                        alt="Nu Xi Chapter Group Photo" 
                        className="w-full h-96 object-cover"
                      />
                    ) : (
                      <div className={`w-full h-96 ${akpsiColors.statCircleBg} flex items-center justify-center`}>
                        <span className={`${akpsiColors.statCircleText}`}>Loading chapter photo...</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter Statistics - REDESIGNED */}
          <section className="relative py-20 z-10 bg-gradient-to-b from-white/95 to-gray-50/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                                 <h2 className={`text-5xl font-bold mb-6 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
                   {pageContent.statistics.title}
                 </h2>
                 <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-700 mx-auto rounded-md"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                {/* Gender Statistics Card */}
                                 <div 
                   className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-gray-200/50 group"
                 >
                  <h3 className={`text-3xl font-bold text-center mb-8 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
                    {pageContent.statistics.genderTitle}
                  </h3>
                                     <div className="flex justify-center items-center mb-6">
                    {images.genderPie ? (
                       <div className="relative flex items-center justify-center w-80 h-80">
                      <img 
                        src={images.genderPie} 
                        alt="Gender Distribution Pie Chart" 
                           className="max-w-full max-h-full object-contain transition-transform duration-300"
                      />
                         <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                       </div>
                    ) : (
                       <div className={`w-80 h-80 ${akpsiColors.statCircleBg} rounded-full flex items-center justify-center`}>
                         <span className={`${akpsiColors.statCircleText}`}>Loading chart...</span>
                      </div>
                    )}
                   </div>
                                    <div className="text-center">
                    <button className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-md hover:from-blue-800 hover:to-blue-600 transition-all duration-300 font-semibold hover:scale-105 cursor-pointer`} onClick={() => openStatModal('gender')}>
                      View Details
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                                </div>

                {/* Grade Level Statistics Card */}
                <div 
                  className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-gray-200/50 group"
                >
                  <h3 className={`text-3xl font-bold text-center mb-8 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
                    {pageContent.statistics.gradeLevelTitle}
                  </h3>
                  <div className="flex justify-center items-center mb-6">
                    {images.gradePie ? (
                      <div className="relative flex items-center justify-center w-80 h-80">
                        <img 
                          src={images.gradePie} 
                          alt="Grade Level Distribution Pie Chart" 
                          className="max-w-full max-h-full object-contain transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ) : (
                      <div className={`w-80 h-80 ${akpsiColors.statCircleBg} rounded-full flex items-center justify-center`}>
                        <span className={`${akpsiColors.statCircleText}`}>Loading chart...</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <button className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-md hover:from-blue-800 hover:to-blue-600 transition-all duration-300 font-semibold hover:scale-105 cursor-pointer`} onClick={() => openStatModal('grade')}>
                      View Details
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Industries Section - REDESIGNED */}
          <section className="relative py-20 z-10 bg-gradient-to-b from-gray-50/95 to-white/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                                 <h2 className={`text-5xl font-bold mb-6 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
                   OUR INDUSTRIES
                 </h2>
                 <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-700 mx-auto rounded-md"></div>
              </div>
              
              <div className={`${akpsiColors.sectionBg}/90 backdrop-blur-sm rounded-lg shadow-2xl p-12 border ${akpsiColors.navBarBorder}`}>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
                  {/* Industry Chart */}
                  <div className="relative flex-shrink-0">
                    {images.industryDistribution ? (
                      <div className="relative">
                        <img 
                          src={images.industryDistribution} 
                          alt="Industries Distribution Chart" 
                          className="w-96 h-96 object-contain"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-full"></div>
                      </div>
                    ) : (
                      <div className={`w-96 h-96 ${akpsiColors.statCircleBg} rounded-full flex items-center justify-center`}>
                        <span className={`${akpsiColors.statCircleText}`}>Loading industry chart...</span>
                      </div>
                    )}
                  </div>

                  {/* Industry Labels */}
                  <div className="grid grid-cols-1 gap-6">
                    {[
                      { label: "37% STEM", color: "#ec7c6c", icon: "🔬" },
                      { label: "29% Business", color: "#16044f", icon: "💼" },
                      { label: "20% Design", color: "#9d336f", icon: "🎨" },
                      { label: "10% Finance & Accounting", color: "#ca5772", icon: "💰" },
                      { label: "4% Political Science", color: "#651766", icon: "🏛️" }
                    ].map((industry, index) => (
                      <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl" style={{ backgroundColor: industry.color }}>
                          {industry.icon}
                        </div>
                        <span className={`text-xl font-bold ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
                          {industry.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Companies Section - REDESIGNED */}
          <section className="relative py-20 z-10 bg-gradient-to-b from-white/95 to-gray-50/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                             <h2 className={`text-5xl font-bold mb-6 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
                   WHERE WE&apos;RE AT
                 </h2>
                 <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-700 mx-auto rounded-md"></div>
                <p className={`text-xl mt-6 max-w-3xl mx-auto ${akpsiColors.sectionText} ${akpsiFonts.sectionTextFont}`}>
                  Our brothers have secured positions at leading companies across various industries
                </p>
              </div>
              
              <div className={`${akpsiColors.sectionBg}/90 backdrop-blur-sm rounded-lg shadow-2xl p-12 border ${akpsiColors.navBarBorder}`}>
              {companies.length === 0 ? (
                  <div className="text-center py-12">
                    <div className={`w-16 h-16 ${akpsiColors.statCircleBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className={`text-xl ${akpsiColors.sectionText}`}>No companies found</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {companies.map((company, index) => (
                      <div 
                        key={index}
                        className={`group relative ${akpsiColors.sectionBg} rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border ${akpsiColors.navBarBorder} hover:scale-105`}
                      >
                        <div className="aspect-square flex items-center justify-center">
                          <img 
                    src={company.imageUrl} 
                    alt={company.image_path ? company.image_path.replace('.png', '') : 'Company logo'} 
                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                    onError={() => console.error('Image failed to load:', company.imageUrl)}
                  />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Contact Section - REDESIGNED */}
          <section className="relative py-20 z-10 bg-gradient-to-b from-gray-50/95 to-white/95 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                             <div className={`${akpsiColors.sectionBg}/90 backdrop-blur-sm rounded-lg shadow-2xl p-12 border ${akpsiColors.navBarBorder} text-center`}>
                <div className="mb-8">
                                     <h2 className={`text-5xl font-bold mb-6 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
                     {pageContent.contact.title}
                   </h2>
                   <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-700 mx-auto rounded-md mb-8"></div>
                  <p className={`text-xl leading-relaxed max-w-2xl mx-auto ${akpsiColors.sectionText} ${akpsiFonts.sectionTextFont}`}>
                {pageContent.contact.subtitle}
              </p>
                </div>
              
                                 <div className="flex justify-center">
                   <a
                     href="/contact"
                     className={`group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105`}
                   >
                     {pageContent.contact.buttonText}
                     <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                     </svg>
                   </a>
                 </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </>
        )}
      </div>

      {/* Statistics Modal */}
      {selectedStat && (
                 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className={`${akpsiColors.sectionBg} rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto transition-transform duration-300`}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-3xl font-bold ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
                  {selectedStat.title}
                </h3>
                                 <button
                   onClick={() => setSelectedStat(null)}
                   className={`w-10 h-10 ${akpsiColors.statCircleBg} hover:bg-gray-200 rounded-md flex items-center justify-center transition-colors duration-200`}>
                  <svg className={`w-6 h-6 ${akpsiColors.statCircleText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
                             <div className="flex justify-center items-center mb-6">
                 <div className="relative flex items-center justify-center w-80 h-80">
                   <img 
                     src={selectedStat.image} 
                     alt={selectedStat.title} 
                     className="max-w-full max-h-full object-contain"
                   />
                 </div>
               </div>
              
              <p className={`text-lg leading-relaxed ${akpsiColors.sectionText} ${akpsiFonts.sectionTextFont}`}>
                {selectedStat.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}