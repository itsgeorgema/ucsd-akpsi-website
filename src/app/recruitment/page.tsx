'use client';
import { useState, useEffect } from 'react';
import { createClient } from '../../../supabase/client';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors } from '../../styles/colors';
import { fontCombinations } from '../../styles/fonts';
import { rushColors } from '../../styles/rushColors';
import InfiniteCarousel from '../../components/InfiniteCarousel';
import { getGalleryImages } from '../../utils/imageUtils';
import BouncyFadeIn from '../../components/BouncyFadeIn';

export default function Recruitment() {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [flyerImage, setFlyerImage] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<Array<{ imageUrl: string; num: number }>>([]);
  const [loading, setLoading] = useState(true);
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

        // Get gallery images from utility function
        const galleryImagesData = getGalleryImages();
        setGalleryImages(galleryImagesData);

        // Hardcoded contact information
        setContactInfo({
          chairs: [
            { name: 'Amanda Wu', number: '(949) 572-8948' },
            { name: 'Josh Hoffmann', number: '(510) 634-9132' }
          ],
          email: 'akpfallrush25@gmail.com'
        });

        // Fetch recruitment events
        const { data: eventsData, error: eventsError } = await supabase
          .from('recruitmentEvents')
          .select('eventName, date, day, description, details')
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
      <div 
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat bg-black"
        style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
      />
      {/* Overlay for readability */}
      <div className={`fixed top-0 left-0 w-full h-full z-10 bg-black/30`} />
      <div className="relative z-20 min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center py-16 px-4 mt-20">
          {loading && (
            <LoadingSpinner size="large" fullScreen={false} type="component" />
          )}
          {!loading && (
            <BouncyFadeIn delay={0.1} bounce={0} threshold={0}>
            <div className={`${colors.glass.bg} backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-6xl w-full mx-auto ${colors.glass.border}`}>
            {/* ABOUT RECRUITMENT Section */}
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              {/* Left Side - About Content */}
              <div className="space-y-6">
                <h2 className={`text-4xl ${fontCombinations.section.main} ${rushColors.rushTextHighlight}`}>
                  ABOUT RECRUITMENT
                </h2>
                <p className={`text-lg leading-relaxed ${rushColors.rushTextBody} ${fontCombinations.content.body}`}>
                  The brothers of Alpha Kappa Psi cordially invite you to attend our Fall 2025 In-Person Rush:<span className={rushColors.rushTextHighlightBold}> Blueprint for Excellence</span>!
                </p>
                <p className={`text-lg leading-relaxed ${rushColors.rushTextBody} ${fontCombinations.content.body}`}>
                  Come out in Week 2 of Fall Quarter to meet our amazing active members and esteemed alumni. Get a glimpse of the professional development and tight-knit community we can offer.
                </p>
                <p className={`text-lg ${fontCombinations.navigation.secondary} ${rushColors.rushTextHighlight} ${fontCombinations.content.lead}`}>
                  Please fill out the interest form to stay updated on our upcoming events!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSe2ooyLbCv2zen2gl0OFc75oJJgqQq-_HbpK2sl0VLHw5mADQ/viewform?usp=sharing&ouid=114377584957303722556"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-8 py-3 ${colors.glass.bg} ${colors.glass.bgHover} backdrop-blur-sm ${fontCombinations.interactive.primary} rounded-lg transition-all duration-300 transform hover:scale-105 text-center ${rushColors.rushText} ${colors.glass.borderHover}`}
                  >
                    INTEREST FORM
                  </a>
                  <a 
                    href="https://www.akpsiucsd.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-8 py-3 ${rushColors.rushButtonSecondary} ${fontCombinations.interactive.primary} rounded-lg transition-all duration-300 transform hover:scale-105 inline-block text-center ${rushColors.rushText} ${rushColors.rushButtonSecondaryBorder}`}
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
                  <div className={`${colors.bg.surfaceAlt} rounded-xl p-6 flex items-center justify-center h-64`}>
                    <div className={`text-center ${colors.text.secondary} ${fontCombinations.content.body}`}>
                      <p className={`text-lg mb-2 ${fontCombinations.content.lead}`}>Loading flyer...</p>
                      <p className={`text-sm ${fontCombinations.content.small}`}>flyer.png</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RUSH WEEK SCHEDULE Section */}
            <div className="mb-12">
                              <h2 className={`text-4xl ${fontCombinations.section.main} mb-8 text-center ${rushColors.rushText}`}>
                  RUSH WEEK SCHEDULE
                </h2>
              <div className="space-y-6">
                {loading ? (
                  <div className={`${colors.glass.bg} backdrop-blur-sm rounded-lg p-6 ${colors.glass.border} text-center`}>
                    <p className={`${rushColors.rushText} ${fontCombinations.content.body}`}>Loading events...</p>
                  </div>
                ) : recruitmentEvents.length > 0 ? (
                  recruitmentEvents.map((event, index) => (
                    <div key={index} className={`${colors.glass.bg} backdrop-blur-sm rounded-lg p-6 ${colors.glass.border}`}>
                      <h3 className={`text-xl ${fontCombinations.navigation.primary} mb-2 ${rushColors.rushTextHighlight}`}>{event.eventName.toUpperCase()}</h3>
                      <p className={`text-lg font-bold ${rushColors.rushTextHighlight} ${fontCombinations.navigation.primary} mb-2`}>
                        {event.day.toUpperCase()}, {event.date}
                      </p>
                      <p className={`text-lg font-medium ${rushColors.rushTextSubtitle} ${fontCombinations.navigation.secondary} mb-2 ${fontCombinations.content.small}`}>
                        {event.details}
                      </p>
                      <p className={`${rushColors.rushTextBody} ${fontCombinations.content.body}`}>
                        {event.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className={`${colors.glass.bg} backdrop-blur-sm rounded-lg p-6 ${colors.glass.border} text-center`}>
                    <p className={`${rushColors.rushText} ${fontCombinations.content.body}`}>No events found. Please check back later!</p>
                  </div>
                )}
              </div>
              <div className="text-center mt-8">
                <a 
                  href="https://www.instagram.com/ucsdakpsi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-8 py-3 ${rushColors.rushButtonSecondary} ${fontCombinations.interactive.primary} rounded-lg transition-all duration-300 transform hover:scale-105 inline-block ${rushColors.rushText} ${rushColors.rushButtonSecondaryBorder}`}
                >
                  STAY UPDATED
                </a>
              </div>
            </div>

                        {/* QUESTIONS? CONTACT US! Section */}
            <div className="text-center">
                              <h2 className={`text-4xl ${fontCombinations.section.main} mb-6 ${rushColors.rushText}`}>
                  QUESTIONS? CONTACT US!
                </h2>
              <div className={`${colors.glass.bg} backdrop-blur-sm rounded-lg p-8 ${colors.glass.border}`}>
                <h3 className={`text-xl ${fontCombinations.section.tertiary} mb-4 ${rushColors.rushTextHighlight}`}>Rush Chairs</h3>
                <div className={`space-y-2 ${rushColors.rushTextBody}`}>
                  {contactInfo.chairs.map((chair, index) => (
                    <p key={index} className={`text-lg ${fontCombinations.content.lead} break-words block`}>
                      <span className="font-semibold">{chair.name}:</span> <span className="break-all">{chair.number}</span>
                    </p>
                  ))}
                  <div className={`text-lg mt-4 ${fontCombinations.content.lead} flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 text-center flex-wrap`}>
                    <span className={rushColors.rushTextHighlight}>
                      <u>
                      <a href="https://www.instagram.com/ucsdakpsi/" target="_blank" rel="noopener noreferrer">@ucsdakpsi</a>
                      </u>
                    </span>

                    <span className="mx-2 hidden md:inline">|</span>
                    {contactInfo.email && (
                      <span className={rushColors.rushTextHighlight}>
                        <u>
                        <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                        </u>
                      </span>
                    )}
                    {contactInfo.email && <span className="mx-2 hidden md:inline">|</span>}
                    <span className={rushColors.rushTextHighlight}> 
                      <u>
                      <a href="https://akpsiucsd.app" target="_blank" rel="noopener noreferrer">akpsiucsd.app</a>
                      </u>
                    </span>
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
          </BouncyFadeIn>)}
        </main>

      </div>
    </div>
  );
} 