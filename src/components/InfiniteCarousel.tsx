'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface GalleryImage {
  imageUrl: string;
  num: number;
}

interface InfiniteCarouselProps {
  images: GalleryImage[];
}

export default function InfiniteCarousel({ images }: InfiniteCarouselProps) {
  const [width, setWidth] = useState(0);
  const [mounted, setMounted] = useState(false);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (carousel.current && mounted) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [images, mounted]);

  // Calculate the width of a single set of images
  const singleSetWidth = width / 5; // Since we have 5 sets of images now

  // Calculate dynamic duration based on number of images
  // More images = slower speed, fewer images = faster speed
  const BASELINE_IMAGE_COUNT = 8; // The baseline number of images for calculating dynamic duration
  const baseDuration = 60; // Base duration in seconds (increased for smoother infinite effect)
  const imageCount = images.length;
  const dynamicDuration = Math.max(baseDuration, baseDuration + (imageCount - BASELINE_IMAGE_COUNT) * 4);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="relative overflow-hidden">
        <div className="flex gap-4">
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0">
              <div className="relative overflow-hidden rounded-none shadow-lg">
                <div className="relative w-48 h-36 sm:w-56 sm:h-42 md:w-64 md:h-48 lg:w-72 lg:h-54">
                  <Image 
                    src={image.imageUrl} 
                    alt={`Gallery image ${index + 1}`} 
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <motion.div
        ref={carousel}
        className="flex gap-4"
      >
        <motion.div
          className="flex gap-4"
          animate={{
            x: [0, -singleSetWidth * 2], // Move through 2 sets for smoother loop
          }}
          transition={{
            duration: dynamicDuration,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* First set of images */}
          {images.map((image, index) => (
            <div key={`set1-${index}`} className="flex-shrink-0">
              <div className="relative overflow-hidden rounded-none shadow-lg">
                <div className="relative w-48 h-36 sm:w-56 sm:h-42 md:w-64 md:h-48 lg:w-72 lg:h-54">
                  <Image 
                    src={image.imageUrl} 
                    alt={`Gallery image ${index + 1}`} 
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
          {/* Second set of images (duplicate) */}
          {images.map((image, index) => (
            <div key={`set2-${index}`} className="flex-shrink-0">
              <div className="relative overflow-hidden rounded-none shadow-lg">
                <div className="relative w-48 h-36 sm:w-56 sm:h-42 md:w-64 md:h-48 lg:w-72 lg:h-54">
                  <Image 
                    src={image.imageUrl} 
                    alt={`Gallery image ${index + 1}`} 
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
          {/* Third set of images (duplicate) */}
          {images.map((image, index) => (
            <div key={`set3-${index}`} className="flex-shrink-0">
              <div className="relative overflow-hidden rounded-none shadow-lg">
                <div className="relative w-48 h-36 sm:w-56 sm:h-42 md:w-64 md:h-48 lg:w-72 lg:h-54">
                  <Image 
                    src={image.imageUrl} 
                    alt={`Gallery image ${index + 1}`} 
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
          {/* Fourth set of images (duplicate) */}
          {images.map((image, index) => (
            <div key={`set4-${index}`} className="flex-shrink-0">
              <div className="relative overflow-hidden rounded-none shadow-lg">
                <div className="relative w-48 h-36 sm:w-56 sm:h-42 md:w-64 md:h-48 lg:w-72 lg:h-54">
                  <Image 
                    src={image.imageUrl} 
                    alt={`Gallery image ${index + 1}`} 
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
          {/* Fifth set of images (duplicate) */}
          {images.map((image, index) => (
            <div key={`set5-${index}`} className="flex-shrink-0">
              <div className="relative overflow-hidden rounded-none shadow-lg">
                <div className="relative w-48 h-36 sm:w-56 sm:h-42 md:w-64 md:h-48 lg:w-72 lg:h-54">
                  <Image 
                    src={image.imageUrl} 
                    alt={`Gallery image ${index + 1}`} 
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
} 