"use client";

import { useState, useEffect } from 'react';
import { createClient } from '../../../supabase/client';
import ScrollArrow from '../../components/ScrollArrow';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';
import { akpsiColors } from '../../styles/colors';
import { akpsiFonts } from '../../styles/fonts';

interface AboutImages {
  background: string;
  crest: string;
  groupPhoto1: string;
  groupPhoto2: string;
  genderPie: string;
  gradePie: string;
}

export default function About() {
  const [images, setImages] = useState<AboutImages>({
    background: '',
    crest: '',
    groupPhoto1: '',
    groupPhoto2: '',
    genderPie: '',
    gradePie: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const supabase = createClient();
        
        // Define image paths to fetch directly from storage bucket
        const imagePaths = [
          'aboutBackground.jpeg',
          'crest.png',
          'groupAbout1.jpeg', 
          'groupAbout2.jpeg',
          'genderPie.png',
          'gradePie.png'
        ];
        
        // Generate public URLs for each image directly from storage
        const imageUrls: AboutImages = {
          background: '',
          crest: '',
          groupPhoto1: '',
          groupPhoto2: '',
          genderPie: '',
          gradePie: ''
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
          }
        });

        console.log('Generated image URLs:', imageUrls);
        setImages(imageUrls);
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
      paragraphs: [
        "Founded on October 5, 1904, at New York University, Alpha Kappa Psi is the world&apos;s oldest and largest business fraternity. AKPsi was founded by &ldquo;Brooklyn Four&rdquo; --- George L. Bergen, Howard M. Jefferson, Nathan Lane Jr., and Frederic R. Leach --- with the purpose of developing its members into principled business leaders. Every night, the founding fathers would walk home together on the Brooklyn Bridge and as their brotherhood grew stronger, it encouraged them to begin an outline for the future of their organization.",
        "Alpha Kappa Psi is a Professional, Co-ed Business Fraternity that is open to all majors. This professional organization currently has over 298,000 initiated members at 219 universities in 4 countries. With an extensive network of alumni, members have access to countless opportunities and are prepared for a life of success."
      ]
    },
    nuXiInfo: {
      title: "ABOUT THE NU XI CHAPTER",
      subtitle: "UNIVERSITY OF CALIFORNIA - SAN DIEGO",
      paragraphs: [
        "Located in the sunny town of La Jolla, the Nu Xi (NΞ) Chapter brings the values of Alpha Kappa Psi to the UC San Diego campus. Established in 2019, the chapter has grown its presence on-campus and is continuing to develop an extensive alumni network in numerous different industries. Our Brothers gain professional mentorship from industry-experienced individuals and reach their career aspirations with tools and resources offered by the fraternity. Alpha Kappa Psi offers an equal opportunity to individuals in all academic departments.",
        "Beyond the professionalism, our Brothers are able to create lifelong friendships and find a community away from home. Alpha Kappa Psi welcomes individuals from all backgrounds and embraces the diverse student population. Our Brothers inspire and help each other pursue our greatest dreams. We congratulate each other on our victories, but more importantly, we are there for each other through our defeats. More than an organization, we build each other up as a family."
      ]
    },
    statistics: {
      title: "NU XI CHAPTER STATISTICS",
      genderTitle: "GENDER",
      gradeLevelTitle: "GRADE LEVEL",
      genderPlaceholder: "Gender Distribution Chart",
      gradeLevelPlaceholder: "Grade Level Distribution Chart"
    },
    contact: {
      title: "CONTACT NU XI",
      subtitle: "For any questions, please complete the form below. You may also contact us via social media for a quicker response time.",
      buttonText: "CONTACT US"
    }
  };

  return (
    <div className="relative">
      {/* Full Page Background */}
      {images.background && (
        <div 
          className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${images.background})`,
          }}
        />
      )}
      
      {loading ? (
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <LoadingSpinner size="large" fullScreen={false} type="component" />
        </main>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative h-[80vh] flex flex-col items-center justify-center text-center z-10">
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

          {/* What is Alpha Kappa Psi Section */}
          <section id="akpsi-info" className={`relative py-20 z-10 ${akpsiColors.sectionBg}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className={`text-4xl text-center mb-12 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>{pageContent.akpsiInfo.title}</h2>
              <div className={`space-y-6 text-lg leading-relaxed ${akpsiColors.sectionText} ${akpsiFonts.sectionTextFont}`}>
                {pageContent.akpsiInfo.paragraphs.map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </div>
          </section>

          {/* Main Image */}
          <section className={`relative py-0 z-10 ${akpsiColors.mainBg}`}>
            <div className="w-full">
              <div className="w-full h-[36rem] rounded-none overflow-hidden flex items-center justify-center">
                {images.groupPhoto1 ? (
                  <img src={images.groupPhoto1} alt="Group Photo About Page" className="w-full h-full object-cover" />
                ) : (
                                  <div className={`w-full h-[36rem] ${akpsiColors.statCircleBg} flex items-center justify-center`}>
                  <span className={`${akpsiColors.statCircleText} ${akpsiFonts.bodyFont}`}>Loading group photo...</span>
                </div>
                )}
              </div>
            </div>
          </section>

          {/* About Nu Xi Chapter Section */}
          <section className={`relative py-20 z-10 ${akpsiColors.sectionBg}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className={`text-4xl text-center mb-8 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>{pageContent.nuXiInfo.title}</h2>
              <h3 className={`text-2xl text-center mb-12 ${akpsiColors.sectionSubtitle} ${akpsiFonts.sectionSubtitleFont}`}>{pageContent.nuXiInfo.subtitle}</h3>
              <div className={`space-y-6 text-lg leading-relaxed ${akpsiColors.sectionText} ${akpsiFonts.sectionTextFont}`}>
                {pageContent.nuXiInfo.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>

          {/* Chapter Statistics */}
          <section className={`relative py-20 z-10 ${akpsiColors.sectionBg}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className={`text-4xl text-center mb-16 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>{pageContent.statistics.title}</h2>
              <div className="flex flex-col lg:flex-row items-start justify-between gap-20">
                {/* Gender Statistics */}
                <div className="flex flex-col items-center">
                  <h3 className={`text-2xl mb-8 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>{pageContent.statistics.genderTitle}</h3>
                  <div className="flex justify-center">
                    {images.genderPie ? (
                      <img 
                        src={images.genderPie} 
                        alt="Gender Distribution Pie Chart" 
                        className="w-[28rem] h-[28rem] object-contain"
                      />
                    ) : (
                      <div className={`w-[28rem] h-[28rem] ${akpsiColors.statCircleBg} flex items-center justify-center rounded-lg`}>
                        <span className={`${akpsiColors.statCircleText} ${akpsiFonts.bodyFont}`}>Loading gender chart...</span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Grade Level Statistics */}
                <div className="flex flex-col items-center">
                  <h3 className={`text-2xl mb-8 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>{pageContent.statistics.gradeLevelTitle}</h3>
                  <div className="flex justify-center ml-22">
                    {images.gradePie ? (
                      <img 
                        src={images.gradePie} 
                        alt="Grade Level Distribution Pie Chart" 
                        className="w-[28rem] h-[28rem] object-contain"
                      />
                    ) : (
                      <div className={`w-[28rem] h-[28rem] ${akpsiColors.statCircleBg} flex items-center justify-center rounded-lg`}>
                        <span className={`${akpsiColors.statCircleText} ${akpsiFonts.bodyFont}`}>Loading grade level chart...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className={`relative py-20 z-10 ${akpsiColors.sectionBg}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className={`text-4xl text-center mb-8 ${akpsiColors.black} ${akpsiFonts.sectionTitleFont}`}>{pageContent.contact.title}</h2>
              <p className={`text-center mb-12 text-lg max-w-2xl mx-auto ${akpsiColors.sectionText} ${akpsiFonts.sectionTextFont}`}>
                {pageContent.contact.subtitle}
              </p>
              
              <a
                href="/contact"
                className={`inline-block px-8 py-3 rounded-lg transition-colors font-semibold ${akpsiColors.contactButton}`}
              >
                {pageContent.contact.buttonText}
              </a>
            </div>
          </section>

          {/* Group Photo Section */}
          <section className={`relative py-0 z-10 ${akpsiColors.sectionBg}`}>
            <div className="w-full">
              <div className="w-full h-[33rem] rounded-none overflow-hidden flex items-center justify-center">
                {images.groupPhoto2 ? (
                  <img 
                    src={images.groupPhoto2} 
                    alt="Alpha Kappa Psi Nu Xi Chapter Group Photo on Beach" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                                  <div className={`w-full h-[33rem] ${akpsiColors.statCircleBg} flex items-center justify-center`}>
                  <span className={`${akpsiColors.statCircleText} ${akpsiFonts.bodyFont}`}>Loading group photo...</span>
                </div>
                )}
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}