"use client";

import { fontCombinations } from "../../styles/fonts";
import { colors } from "../../styles/colors";
import { getGalleryImages } from "../../utils/imageUtils";
import BouncyFadeIn from "../../components/BouncyFadeIn";
import { useResponsiveColumns } from "../../hooks/useResponsiveColumns";
import Image from "next/image";

const galleryImages = getGalleryImages();
const columnBreakpoints = [
  { minWidth: 1024, columns: 3 },
  { minWidth: 768, columns: 2 },
];

export default function Gallery() {
  const backgroundImage = "/assets/sunsetBackground.jpeg";
  const columns = useResponsiveColumns(columnBreakpoints);

  return (
    <div className="relative min-h-screen flex flex-col gallery-page">
      {/* Full Page Background */}
      <div
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat bg-black"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {/* Enhanced overlay for better readability */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-gradient-to-br from-black/40 via-black/30 to-black/50" />
      <div className="relative z-20 min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="w-full max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16 mt-8 md:mt-12">
              <h1
                className={`text-5xl lg:text-6xl ${fontCombinations.hero.title} ${colors.text.inverse} mb-4`}
              >
                GALLERY
              </h1>
              <p
                className={`text-xl ${colors.glass.textSubtle} ${fontCombinations.content.body} max-w-2xl mx-auto`}
              >
                BEYOND PROFESSIONALISM – BROTHERHOOD MOMENTS
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => {
                const colIndex = columns > 0 ? index % columns : 0;
                const delay = colIndex * 0.06;
                return (
                  <BouncyFadeIn
                    key={index}
                    delay={delay}
                    bounce={0}
                    threshold={0}
                  >
                    <div className="group">
                      <div className="relative overflow-hidden rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="relative w-full h-80">
                          <Image
                            src={image.imageUrl}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 100%, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </BouncyFadeIn>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
