'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../../supabase/client';
import LoadingSpinner from '../../components/LoadingSpinner';
import { akpsiFonts } from '../../styles/fonts';
import { akpsiColors } from '../../styles/colors';
import Footer from '../../components/Footer';

interface GalleryImage {
  imageUrl: string;
  num: number;
}

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('gallery')
          .select('image_path, num')
          .order('num', { ascending: true });

        if (error) {
          console.error('Error fetching gallery images:', error);
          setGalleryImages([]);
        } else if (data) {
          const imagesWithUrls = data.map((image: { image_path: string; num: number }) => {
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
      } catch (error) {
        console.error('Error:', error);
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryImages();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Full Page Background */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/gallery/galleryBackground.jpg)" }}
      />
      {/* Enhanced overlay for better readability */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-gradient-to-br from-black/40 via-black/30 to-black/50" />
      <div className="relative z-20 min-h-screen flex flex-col">
        <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
          {loading && (
            <LoadingSpinner size="large" fullScreen={false} type="component" />
          )}
          {!loading && galleryImages.length === 0 && (
            <div className={`flex flex-col items-center justify-center min-h-[60vh] ${akpsiColors.heroTitle}`}>
              <div className={`text-2xl ${akpsiFonts.sectionTitleFont} mb-2`}>No gallery images found</div>
              <div className={`text-lg opacity-80 ${akpsiFonts.bodyFont} ${akpsiColors.heroSubtitle}`}>Gallery images are not available.</div>
            </div>
          )}
          {!loading && galleryImages.length > 0 && (
            <div className="w-full max-w-6xl mx-auto">
              {/* Header Section */}
              <div className="text-center mb-16 mt-24">
                <h1 className={`text-5xl lg:text-6xl ${akpsiFonts.heroTitleFont} ${akpsiColors.heroTitle} mb-4`}>
                  GALLERY
                </h1>
                <p className={`text-xl ${akpsiColors.heroSubtitle} ${akpsiFonts.bodyFont} max-w-2xl mx-auto`}>
                  BEYOND PROFESSIONALISM – BROTHERHOOD MOMENTS
                </p>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image, index) => (
                  <div key={index} className="group">
                    <div className="relative overflow-hidden rounded-sm shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
                      <img 
                        src={image.imageUrl} 
                        alt={`Gallery image ${index + 1}`} 
                        className="w-full h-80 object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
} 