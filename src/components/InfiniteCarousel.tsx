'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GalleryImage {
  imageUrl: string;
  num: number;
}

interface InfiniteCarouselProps {
  images: GalleryImage[];
}

export default function InfiniteCarousel({ images }: InfiniteCarouselProps) {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [images]);

  // Calculate the width of a single set of images
  const singleSetWidth = width / 3; // Since we have 3 sets of images

  return (
    <div className="relative overflow-hidden">
      <motion.div
        ref={carousel}
        className="flex gap-4"
      >
        <motion.div
          className="flex gap-4"
          animate={{
            x: [0, -singleSetWidth],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* First set of images */}
          {images.map((image, index) => (
            <div key={`set1-${index}`} className="flex-shrink-0">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={image.imageUrl} 
                  alt={`Gallery image ${index + 1}`} 
                  className="w-48 h-36 sm:w-56 sm:h-42 md:w-64 md:h-48 lg:w-72 lg:h-54 object-cover"
                />
              </div>
            </div>
          ))}
          {/* Second set of images (duplicate) */}
          {images.map((image, index) => (
            <div key={`set2-${index}`} className="flex-shrink-0">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={image.imageUrl} 
                  alt={`Gallery image ${index + 1}`} 
                  className="w-48 h-36 sm:w-56 sm:h-42 md:w-64 md:h-48 lg:w-72 lg:h-54 object-cover"
                />
              </div>
            </div>
          ))}
          {/* Third set of images (duplicate) */}
          {images.map((image, index) => (
            <div key={`set3-${index}`} className="flex-shrink-0">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={image.imageUrl} 
                  alt={`Gallery image ${index + 1}`} 
                  className="w-48 h-36 sm:w-56 sm:h-42 md:w-64 md:h-48 lg:w-72 lg:h-54 object-cover"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
} 