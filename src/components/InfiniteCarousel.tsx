"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { GalleryImage } from "../utils/imageUtils";

interface InfiniteCarouselProps {
  images: GalleryImage[];
}

const SET_COUNT = 5;
const BASELINE_IMAGE_COUNT = 8;
const BASE_DURATION = 60;

export default function InfiniteCarousel({ images }: InfiniteCarouselProps) {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [images]);

  const singleSetWidth = width / SET_COUNT;
  const dynamicDuration = Math.max(
    BASE_DURATION,
    BASE_DURATION + (images.length - BASELINE_IMAGE_COUNT) * 4,
  );

  return (
    <div className="relative overflow-hidden">
      <motion.div ref={carousel} className="flex gap-4">
        <motion.div
          className="flex gap-4"
          animate={{
            x: [0, -singleSetWidth * 2], // Move through 2 sets for smoother loop
          }}
          transition={{
            duration: dynamicDuration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Array.from({ length: SET_COUNT }, (_, setIndex) =>
            images.map((image, index) => (
              <div key={`${setIndex}-${index}`} className="flex-shrink-0">
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
            )),
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
