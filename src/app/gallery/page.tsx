'use client';

import { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { fontCombinations } from "../../styles/fonts";
import { colors } from "../../styles/colors";
import { getGalleryImages, GalleryImage } from "../../utils/imageUtils";
import BouncyFadeIn from "../../components/BouncyFadeIn";

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const backgroundImage = '/assets/sunsetBackground.jpeg';
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        // Get gallery images from utility function
        const images = getGalleryImages();
        setGalleryImages(images);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  // Track responsive columns so delays reset each row and avoid window usage during render
  useEffect(() => {
    const updateColumns = () => {
      if (typeof window === 'undefined') return;
      const lg = window.matchMedia('(min-width: 1024px)').matches; // lg breakpoint
      const md = window.matchMedia('(min-width: 768px)').matches;   // md breakpoint
      setColumns(lg ? 3 : md ? 2 : 1);
    };
    updateColumns();
    const onResize = () => updateColumns();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col gallery-page">
      {/* Full Page Background */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat bg-black"
        style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
      />
      {/* Enhanced overlay for better readability */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-gradient-to-br from-black/40 via-black/30 to-black/50" />
      <div className="relative z-20 min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          {loading ? (
            <LoadingSpinner size="large" fullScreen={false} type="component" />
          ) : (
            <>
              {galleryImages.length === 0 ? (
                <div className={`flex flex-col items-center justify-center min-h-[60vh] ${colors.text.inverse}`}>
                  <div className={`text-2xl ${fontCombinations.section.secondary} mb-2`}>No gallery images found</div>
                  <div className={`text-lg opacity-80 ${fontCombinations.content.body} ${colors.glass.textSubtle}`}>Gallery images are not available.</div>
                </div>
              ) : (
                <div className="w-full max-w-6xl mx-auto">
                  {/* Header Section */}
                  <div className="text-center mb-16 mt-8 md:mt-12">
                    <h1 className={`text-5xl lg:text-6xl ${fontCombinations.hero.title} ${colors.text.inverse} mb-4`}>
                      GALLERY
                    </h1>
                    <p className={`text-xl ${colors.glass.textSubtle} ${fontCombinations.content.body} max-w-2xl mx-auto`}>
                      BEYOND PROFESSIONALISM – BROTHERHOOD MOMENTS
                    </p>
                  </div>

                  {/* Gallery Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image, index) => {
                      const colIndex = columns > 0 ? index % columns : 0;
                      const delay = colIndex * 0.06;
                      return (
                        <BouncyFadeIn key={index} delay={delay} bounce={0} threshold={0}>
                          <div className="group">
                            <div className="relative overflow-hidden rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
                              <img 
                                src={image.imageUrl} 
                                alt={`Gallery image ${index + 1}`} 
                                className="w-full h-80 object-cover"
                              />
                            </div>
                          </div>
                        </BouncyFadeIn>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
} 