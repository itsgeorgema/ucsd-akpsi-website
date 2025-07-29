'use client';
import { useState, useEffect } from 'react';
import { createClient } from '../../../supabase/client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';
import { akpsiColors } from '../../styles/colors';
import { akpsiFonts } from '../../styles/fonts';
import { rushColors } from '../../styles/rushColors';
import InfiniteCarousel from '../../components/InfiniteCarousel';

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

  const [contactInfo, setContactInfo] = useState<{
    chairs: Array<{ name: string; number: string }>;
    email: string;
  }>({
    chairs: [],
    email: ''
  });

  const [recruitmentEvents, setRecruitmentEvents] = useState<Array<{
    eventName: string;
    date: string;
    day: string;
    description: string;
    details: string;
  }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        
        // Fetch background image directly from storage
        const { data: bgImageData } = supabase.storage
          .from('rush-fall25')
          .getPublicUrl('fall25Background.png');
        
        setBackgroundImage(bgImageData.publicUrl);

        // Fetch flyer image directly from storage
        const { data: flyerImageData } = supabase.storage
          .from('rush-fall25')
          .getPublicUrl('fall25Flyer.png');
        
        setFlyerImage(flyerImageData.publicUrl);

        // Fetch all gallery images
        const { data: galleryData, error: galleryError } = await supabase
          .from('gallery')
          .select('image_path, num')
          .order('num', { ascending: true });

        if (galleryError) {
          console.error('Error fetching gallery images:', galleryError);
        } else if (galleryData) {
          // Shuffle all images but keep all of them
          const shuffled = [...galleryData].sort(() => Math.random() - 0.5);
          
          const imagesWithUrls = shuffled.map((image) => {
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

        // Fetch recruitment contact information
        const { data: contactData, error: contactError } = await supabase
          .from('recruitmentContact')
          .select('name, number, email');
        if (contactError) {
          console.error('Error fetching contact information:', contactError);
        } else if (contactData && contactData.length > 0) {
          // Get the email from the first person (should be the same for all)
          const email = contactData[0].email || '';
          // Get all chairs' names and numbers
          const chairs = contactData.map(person => ({
            name: person.name,
            number: person.number
          }));
          setContactInfo({
            chairs,
            email
          });
        }

        // Fetch recruitment events
        const { data: eventsData, error: eventsError } = await supabase
          .from('recruitmentEvents')
          .select('eventName, date, day, description, details, order')
          .order('order', { ascending: true });
        if (eventsError) {
          console.error('Error fetching recruitment events:', eventsError);
        } else if (eventsData) {
          setRecruitmentEvents(eventsData);
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
            <div className={`${akpsiColors.glassBg} ${akpsiColors.glassBlurMd} rounded-2xl shadow-2xl p-10 max-w-6xl w-full mx-auto ${akpsiColors.glassBorder}`}>
            {/* ABOUT RECRUITMENT Section */}
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              {/* Left Side - About Content */}
              <div className="space-y-6">
                <h2 className={`text-4xl ${akpsiFonts.sectionTitleFont} ${rushColors.rushTextHighlight}`}>
                  ABOUT RECRUITMENT
                </h2>
                <p className={`text-lg leading-relaxed ${rushColors.rushTextBody} ${akpsiFonts.bodyFont}`}>
                  The brothers of Alpha Kappa Psi cordially invite you to attend our Fall 2025 In-Person Rush:<span className={rushColors.rushTextHighlightBold}> Blueprint for Excellence</span>!
                </p>
                <p className={`text-lg leading-relaxed ${rushColors.rushTextBody} ${akpsiFonts.bodyFont}`}>
                  Come out in Week 2 of Fall Quarter to meet our amazing active members and esteemed alumni. Get a glimpse of the professional development and tight-knit community we can offer.
                </p>
                <p className={`text-lg ${akpsiFonts.sectionSubtitleFont} ${rushColors.rushTextHighlight} ${akpsiFonts.bodyFont}`}>
                  Please fill out the interest form to stay updated on our upcoming events!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={links.interestForm || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-8 py-3 ${akpsiColors.glassBg} ${akpsiColors.glassBgHover} ${akpsiColors.glassBlur} ${akpsiFonts.sectionSubtitleFont} rounded-lg transition-all duration-300 transform hover:scale-105 ${akpsiFonts.sectionTextFont} text-center ${rushColors.rushText} ${akpsiColors.glassBorderHover} ${!links.interestForm ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    className={`px-8 py-3 ${rushColors.rushButtonSecondary} ${akpsiFonts.sectionSubtitleFont} rounded-lg transition-all duration-300 transform hover:scale-105 ${akpsiFonts.sectionTextFont} text-center ${rushColors.rushText} ${rushColors.rushButtonSecondaryBorder} ${!links.applicationWebsite ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    alt="Rush Flyer"
                    className="w-full h-auto object-cover rounded-xl"
                  />
                ) : (
                  <div className={`${akpsiColors.statCircleBg} rounded-xl p-6 flex items-center justify-center h-64`}>
                    <div className={`text-center ${akpsiColors.statCircleText} ${akpsiFonts.bodyFont}`}>
                      <p className={`text-lg mb-2 ${akpsiFonts.sectionTextFont}`}>Loading flyer...</p>
                      <p className={`text-sm ${akpsiFonts.sectionTextFont}`}>flyer.png</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RUSH WEEK SCHEDULE Section */}
            <div className="mb-12">
                              <h2 className={`text-4xl ${akpsiFonts.sectionTitleFont} mb-8 text-center ${rushColors.rushText}`}>
                  RUSH WEEK SCHEDULE
                </h2>
              <div className="space-y-6">
                {loading ? (
                  <div className={`${akpsiColors.glassBg} ${akpsiColors.glassBlur} rounded-lg p-6 ${akpsiColors.glassBorder} text-center`}>
                    <p className={`${rushColors.rushText} ${akpsiFonts.bodyFont}`}>Loading events...</p>
                  </div>
                ) : recruitmentEvents.length > 0 ? (
                  recruitmentEvents.map((event, index) => (
                    <div key={index} className={`${akpsiColors.glassBg} ${akpsiColors.glassBlur} rounded-lg p-6 ${akpsiColors.glassBorder}`}>
                      <h3 className={`text-xl ${akpsiFonts.sectionTitleFont} mb-2 ${rushColors.rushTextHighlight}`}>{event.eventName.toUpperCase()}</h3>
                      <p className={`${rushColors.rushTextHighlight} ${akpsiFonts.sectionSubtitleFont} mb-2 ${akpsiFonts.sectionTextFont}`}>
                        {event.day.toUpperCase()}, {event.date}
                      </p>
                      <p className={`${rushColors.rushTextSubtitle} ${akpsiFonts.sectionSubtitleFont} mb-2 ${akpsiFonts.sectionTextFont}`}>
                        {event.details}
                      </p>
                      <p className={`${rushColors.rushTextBody} ${akpsiFonts.bodyFont}`}>
                        {event.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className={`${akpsiColors.glassBg} ${akpsiColors.glassBlur} rounded-lg p-6 ${akpsiColors.glassBorder} text-center`}>
                    <p className={`${rushColors.rushText} ${akpsiFonts.bodyFont}`}>No events found. Please check back later!</p>
                  </div>
                )}
              </div>
              <div className="text-center mt-8">
                <a 
                  href={links.instagram || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-8 py-3 ${rushColors.rushButtonSecondary} ${akpsiFonts.sectionSubtitleFont} rounded-lg transition-all duration-300 transform hover:scale-105 ${akpsiFonts.sectionTextFont} inline-block ${rushColors.rushText} ${rushColors.rushButtonSecondaryBorder} ${!links.instagram ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={!links.instagram ? (e) => e.preventDefault() : undefined}
                >
                  STAY UPDATED
                </a>
              </div>
            </div>

                        {/* QUESTIONS? CONTACT US! Section */}
            <div className="text-center">
                              <h2 className={`text-4xl ${akpsiFonts.sectionTitleFont} mb-6 ${rushColors.rushText}`}>
                  QUESTIONS? CONTACT US!
                </h2>
              <div className={`${akpsiColors.glassBg} ${akpsiColors.glassBlur} rounded-lg p-8 ${akpsiColors.glassBorder}`}>
                <h3 className={`text-xl ${akpsiFonts.sectionTitleFont} mb-4 ${rushColors.rushTextHighlight}`}>Rush Chairs</h3>
                <div className={`space-y-2 ${rushColors.rushTextBody}`}>
                  {contactInfo.chairs.map((chair, index) => (
                    <p key={index} className={`text-lg ${akpsiFonts.bodyFont}`}>
                      {chair.name}: {chair.number}
                    </p>
                  ))}
                  <div className={`text-lg mt-4 ${akpsiFonts.bodyFont} text-center`}>
                    <span className={rushColors.rushTextHighlight}>@ucsdakpsi</span>
                    <span className="mx-2">|</span>
                    {contactInfo.email && (
                      <span className={rushColors.rushTextHighlight}>{contactInfo.email}</span>
                    )}
                    {contactInfo.email && <span className="mx-2">|</span>}
                    <span className={rushColors.rushTextHighlight}>akpsiucsd.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RANDOM GALLERY IMAGES Section */}
            {galleryImages.length > 0 && (
              <div className="mt-12">
                <div className="px-4 sm:px-6 lg:px-8">
                  <InfiniteCarousel images={galleryImages} />
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