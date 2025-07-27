'use client';
import { useState, useEffect } from 'react';
import { createClient } from '../../../supabase/client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';
import { akpsiColors } from '../../styles/colors';
import { akpsiFonts } from '../../styles/fonts';

export default function Recruitment() {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [flyerImage, setFlyerImage] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<Array<{ imageUrl: string; num: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<{
    interestForm: string;
    applicationWebsite: string;
    instagram: string;
  }>({
    interestForm: '',
    applicationWebsite: '',
    instagram: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        
        // Fetch background image
        const { data: bgData, error: bgError } = await supabase
          .from('spring25Rush')
          .select('image_path')
          .eq('image_path', 'spring25RushBackground.png')
          .single();

        if (bgError) {
          console.error('Error fetching background image:', bgError);
        } else if (bgData) {
          const cleanImagePath = bgData.image_path.trim();
          const { data: imageData } = supabase.storage
            .from('rush-spring25')
            .getPublicUrl(cleanImagePath);
          
          setBackgroundImage(imageData.publicUrl);
        }

        // Fetch all images from spring25Rush table to see what's available
        const { data: allImagesData, error: imagesError } = await supabase
          .from('spring25Rush')
          .select('image_path');

        if (imagesError) {
          console.error('Error fetching images:', imagesError);
        } else {
          console.log('All available images:', allImagesData);
          
          // Try to find the flyer image
          const flyerItem = allImagesData?.find(item => item.image_path === 'spring25RushFlyer.jpg');
          console.log('Found flyer item:', flyerItem);
          
          if (flyerItem) {
            const cleanFlyerPath = flyerItem.image_path.trim();
            const { data: flyerImageData } = supabase.storage
              .from('rush-spring25')
              .getPublicUrl(cleanFlyerPath);
            
            setFlyerImage(flyerImageData.publicUrl);
            console.log('Flyer image URL set:', flyerImageData.publicUrl);
          } else {
            console.log('spring25RushFlyer.jpg not found in table');
          }
        }

        // Fetch random gallery images
        const { data: galleryData, error: galleryError } = await supabase
          .from('gallery')
          .select('image_path, num')
          .order('num', { ascending: true });

        if (galleryError) {
          console.error('Error fetching gallery images:', galleryError);
        } else if (galleryData) {
          // Shuffle the array and take first 3
          const shuffled = [...galleryData].sort(() => Math.random() - 0.5);
          const randomImages = shuffled.slice(0, 8);
          
          const imagesWithUrls = randomImages.map((image) => {
            const cleanImagePath = image.image_path.trim();
            const { data: imageData } = supabase.storage
              .from('gallery')
              .getPublicUrl(cleanImagePath);
            return {
              imageUrl: imageData.publicUrl,
              num: image.num,
            };
          });
          
          setGalleryImages(imagesWithUrls);
        }

        // Fetch links by name
        const { data: allLinksData, error: linksError } = await supabase
          .from('links')
          .select('name, link');
        if (linksError) {
          console.error('Error fetching links:', linksError);
        } else if (allLinksData) {
          // Find specific links by name
          const interestFormItem = allLinksData.find(item => item.name === 'interestForm');
          const applicationWebsiteItem = allLinksData.find(item => item.name === 'applicationWebsite');
          const instagramItem = allLinksData.find(item => item.name === 'instagram');
          const interestFormLink = interestFormItem?.link || '';
          const applicationWebsiteLink = applicationWebsiteItem?.link || '';
          const instagramLink = instagramItem?.link || '';
          setLinks({
            interestForm: interestFormLink,
            applicationWebsite: applicationWebsiteLink,
            instagram: instagramLink
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
    <div className="relative min-h-screen flex flex-col">
      {/* Full Page Background */}
      {backgroundImage && (
        <div 
          className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      {/* Overlay for readability */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-black/30" />
      <div className="relative z-20 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-16 px-4 mt-20">
          {loading && (
            <LoadingSpinner size="large" fullScreen={false} type="component" />
          )}
          {!loading && (
            <div className={`${akpsiColors.sectionBg} rounded-2xl shadow-2xl p-10 max-w-6xl w-full mx-auto`}>
            {/* ABOUT RECRUITMENT Section */}
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              {/* Left Side - About Content */}
              <div className="space-y-6">
                <h2 className={`text-4xl ${akpsiFonts.sectionTitleFont} ${akpsiColors.sectionTitle}`}>
                  ABOUT RECRUITMENT
                </h2>
                <p className={`text-lg leading-relaxed ${akpsiColors.sectionText} ${akpsiFonts.bodyFont}`}>
                  The brothers of Alpha Kappa Psi cordially invite you to attend our Spring 2025 In-Person Rush: Broadcasting Your Success!
                </p>
                <p className={`text-lg leading-relaxed ${akpsiColors.sectionText} ${akpsiFonts.bodyFont}`}>
                  Come out in Week 2 of Spring Quarter to meet our amazing active members and esteemed alumni. Get a glimpse of the professional development and tight-knit community we can offer.
                </p>
                <p className={`text-lg ${akpsiFonts.sectionSubtitleFont} ${akpsiColors.sectionText} ${akpsiFonts.bodyFont}`}>
                  Please fill out this form to stay updated on our upcoming events!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={links.interestForm || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-8 py-3 ${akpsiColors.contactButton} ${akpsiColors.contactButtonHover} ${akpsiFonts.sectionSubtitleFont} rounded-lg transition-colors ${akpsiFonts.sectionTextFont} text-center ${!links.interestForm ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={(e) => {
                      console.log('Interest form clicked, link:', links.interestForm);
                      if (!links.interestForm) {
                        e.preventDefault();
                        console.log('Prevented navigation - no link available');
                      }
                    }}
                  >
                    INTEREST FORM
                  </a>
                  <a 
                    href={links.applicationWebsite || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-8 py-3 ${akpsiColors.contactButton} ${akpsiColors.contactButtonHover} ${akpsiFonts.sectionSubtitleFont} rounded-lg transition-colors ${akpsiFonts.sectionTextFont} text-center ${!links.applicationWebsite ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={!links.applicationWebsite ? (e) => e.preventDefault() : undefined}
                  >
                    APPLICATION
                  </a>
                </div>
              </div>
              
              {/* Right Side - Flyer Image */}
              <div className="rounded-xl overflow-hidden">
                {flyerImage ? (
                  <img 
                    src={flyerImage} 
                    alt="Spring 2025 Rush Flyer" 
                    className="w-full h-auto object-cover rounded-xl"
                  />
                ) : (
                  <div className={`${akpsiColors.statCircleBg} rounded-xl p-6 flex items-center justify-center h-64`}>
                    <div className={`text-center ${akpsiColors.statCircleText} ${akpsiFonts.bodyFont}`}>
                      <p className={`text-lg mb-2 ${akpsiFonts.sectionTextFont}`}>Loading flyer...</p>
                      <p className={`text-sm ${akpsiFonts.sectionTextFont}`}>spring25RushFlyer.jpg</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RUSH WEEK SCHEDULE Section */}
            <div className="mb-12">
              <h2 className={`text-4xl ${akpsiFonts.sectionTitleFont} mb-8 text-center ${akpsiColors.sectionTitle}`}>
                RUSH WEEK SCHEDULE
              </h2>
              <div className="space-y-6">
                {/* INFO NIGHT */}
                <div className={`${akpsiColors.mainBg} rounded-lg p-6`}>
                  <h3 className={`text-xl ${akpsiFonts.sectionTitleFont} mb-2 ${akpsiColors.sectionTitle}`}>INFO NIGHT</h3>
                  <p className={`${akpsiColors.sectionSubtitle} ${akpsiFonts.sectionSubtitleFont} mb-2 ${akpsiFonts.sectionTextFont}`}>MONDAY, 4/07 @ 6:00 PM</p>
                  <p className={`${akpsiColors.sectionSubtitle} ${akpsiFonts.sectionSubtitleFont} mb-2 ${akpsiFonts.sectionTextFont}`}>Price Center Theater | Casual Attire</p>
                  <p className={`${akpsiColors.sectionText} ${akpsiFonts.bodyFont}`}>Come hear inspirational talks from our brothers as we talk about career opportunities and professional development growth! See how you&apos;ll fit in with the brothers from our chapter.</p>
                </div>

                {/* BUSINESS WORKSHOP */}
                <div className={`${akpsiColors.mainBg} rounded-lg p-6`}>
                  <h3 className={`text-xl ${akpsiFonts.sectionTitleFont} mb-2 ${akpsiColors.sectionTitle}`}>BUSINESS WORKSHOP</h3>
                  <p className={`${akpsiColors.sectionSubtitle} ${akpsiFonts.sectionSubtitleFont} mb-2 ${akpsiFonts.sectionTextFont}`}>TUESDAY, 4/08 @ 8:00 PM</p>
                  <p className={`${akpsiColors.sectionSubtitle} ${akpsiFonts.sectionSubtitleFont} mb-2 ${akpsiFonts.sectionTextFont}`}>Price Center-Ballroom West B | Business Casual Attire</p>
                  <p className={`${akpsiColors.sectionText} ${akpsiFonts.bodyFont}`}>Bring your resumes (and cover letters optional) so we can guide you a step closer to your dream career. Inspirational talks from our brothers are also included!</p>
                </div>

                {/* CASE STUDY NIGHT */}
                <div className={`${akpsiColors.mainBg} rounded-lg p-6`}>
                  <h3 className={`text-xl ${akpsiFonts.sectionTitleFont} mb-2 ${akpsiColors.sectionTitle}`}>CASE STUDY NIGHT</h3>
                  <p className={`${akpsiColors.sectionSubtitle} ${akpsiFonts.sectionSubtitleFont} mb-2 ${akpsiFonts.sectionTextFont}`}>WEDNESDAY, 4/09 | *BY APPOINTMENT ONLY</p>
                  <p className={`${akpsiColors.sectionSubtitle} ${akpsiFonts.sectionSubtitleFont} mb-2 ${akpsiFonts.sectionTextFont}`}>TBA | Professional Attire</p>
                  <p className={`${akpsiColors.sectionText} ${akpsiFonts.bodyFont}`}>Tackle a real-life business problem and test your teamwork and analytical skills. Case Study Night participation is mandatory for membership consideration.</p>
                </div>

                {/* SOCIAL MIXER */}
                <div className={`${akpsiColors.mainBg} rounded-lg p-6`}>
                  <h3 className={`text-xl ${akpsiFonts.sectionTitleFont} mb-2 ${akpsiColors.sectionTitle}`}>SOCIAL MIXER</h3>
                  <p className={`${akpsiColors.sectionSubtitle} ${akpsiFonts.sectionSubtitleFont} mb-2 ${akpsiFonts.sectionTextFont}`}>FRIDAY, 4/11 | *INVITE ONLY</p>
                  <p className={`${akpsiColors.sectionSubtitle} ${akpsiFonts.sectionSubtitleFont} mb-2 ${akpsiFonts.sectionTextFont}`}>TBA | Casual Attire</p>
                  <p className={`${akpsiColors.sectionText} ${akpsiFonts.bodyFont}`}>Mingle with our brothers in a casual setting with food and drinks provided. Experience wholesome brotherhood within our tight-knit family in AKPsi!</p>
                </div>

                {/* INTERVIEWS */}
                <div className={`${akpsiColors.mainBg} rounded-lg p-6`}>
                  <h3 className={`text-xl ${akpsiFonts.sectionTitleFont} mb-2 ${akpsiColors.sectionTitle}`}>INTERVIEWS</h3>
                  <p className={`${akpsiColors.sectionSubtitle} ${akpsiFonts.sectionSubtitleFont} mb-2 ${akpsiFonts.sectionTextFont}`}>SATURDAY, 4/12 | *BY APPOINTMENT ONLY</p>
                  <p className={`${akpsiColors.sectionSubtitle} ${akpsiFonts.sectionSubtitleFont} mb-2 ${akpsiFonts.sectionTextFont}`}>TBA | Professional Attire</p>
                  <p className={`${akpsiColors.sectionText} ${akpsiFonts.bodyFont}`}>Interview participation is mandatory for membership consideration.</p>
                </div>
              </div>
              <div className="text-center mt-8">
                <a 
                  href={links.instagram || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-8 py-3 ${akpsiColors.contactButton} ${akpsiColors.contactButtonHover} ${akpsiFonts.sectionSubtitleFont} rounded-lg transition-colors ${akpsiFonts.sectionTextFont} inline-block ${!links.instagram ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={!links.instagram ? (e) => e.preventDefault() : undefined}
                >
                  STAY UPDATED
                </a>
              </div>
            </div>

                        {/* QUESTIONS? CONTACT US! Section */}
            <div className="text-center">
              <h2 className={`text-4xl ${akpsiFonts.sectionTitleFont} mb-6 ${akpsiColors.sectionTitle}`}>
                QUESTIONS? CONTACT US!
              </h2>
              <div className={`${akpsiColors.mainBg} rounded-lg p-8`}>
                <h3 className={`text-xl ${akpsiFonts.sectionTitleFont} mb-4 ${akpsiColors.sectionTitle}`}>Rush Chairs</h3>
                <div className={`space-y-2 ${akpsiColors.sectionText}`}>
                  <p className={`text-lg ${akpsiFonts.bodyFont}`}>Kristen Lee: (732) 484-8791</p>
                  <p className={`text-lg ${akpsiFonts.bodyFont}`}>Jessie Ha: (626) 267-4161</p>
                  <p className={`text-lg mt-4 ${akpsiFonts.bodyFont}`}>akpspring25rush@gmail.com</p>
                  <p className={`text-lg ${akpsiFonts.bodyFont}`}>@ucsdakpsi | akpsiucsd.com</p>
                </div>
              </div>
            </div>

            {/* RANDOM GALLERY IMAGES Section */}
            {galleryImages.length > 0 && (
              <div className="mt-12">
                <div className="relative">
                  <div className="flex gap-4 overflow-hidden gallery-container scroll-smooth">
                    {galleryImages.map((image, index) => (
                      <div key={index} className="flex-shrink-0">
                        <div className="relative overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                          <img 
                            src={image.imageUrl} 
                            alt={`Gallery image ${index + 1}`} 
                            className="w-64 h-48 object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Left Arrow */}
                  <button 
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 ${akpsiColors.sectionBg}/80 hover:${akpsiColors.sectionBg} ${akpsiColors.sectionText} rounded-full p-2 shadow-lg transition-all duration-200`}
                    onClick={() => {
                      const container = document.querySelector('.gallery-container') as HTMLElement;
                      if (container) {
                        const scrollAmount = 280; // 256px image + 16px gap
                        const currentScroll = container.scrollLeft;
                        
                        // Scroll left smoothly
                        container.scrollTo({
                          left: Math.max(0, currentScroll - scrollAmount),
                          behavior: 'smooth'
                        });
                      }
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {/* Right Arrow */}
                  <button 
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 ${akpsiColors.sectionBg}/80 hover:${akpsiColors.sectionBg} ${akpsiColors.sectionText} rounded-full p-2 shadow-lg transition-all duration-200`}
                    onClick={() => {
                      const container = document.querySelector('.gallery-container') as HTMLElement;
                      if (container) {
                        const scrollAmount = 280; // 256px image + 16px gap
                        const currentScroll = container.scrollLeft;
                        const maxScroll = (galleryImages.length * scrollAmount) - scrollAmount;
                        
                        // Scroll right smoothly
                        container.scrollTo({
                          left: Math.min(maxScroll, currentScroll + scrollAmount),
                          behavior: 'smooth'
                        });
                      }
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
} 