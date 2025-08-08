'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on every page change and initial load
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const handleScrollToTop: EventListener = () => {
      const scrollToTopNow = () => {
        try {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch {
          window.scrollTo(0, 0);
        }
        const scrollRoot = document.scrollingElement || document.documentElement;
        if (scrollRoot) {
          try {
            scrollRoot.scrollTo({ top: 0, behavior: 'smooth' } as ScrollToOptions);
          } catch {
            scrollRoot.scrollTo(0, 0);
          }
        }
        // Fallbacks for various browsers/containers without using 'any'
        const htmlElement = document.documentElement as HTMLElement | null;
        const bodyElement = document.body as HTMLElement | null;
        if (htmlElement) htmlElement.scrollTop = 0;
        if (bodyElement) bodyElement.scrollTop = 0;
      };

      // Run now, on next frame, and after a short delay to account for layout changes
      scrollToTopNow();
      requestAnimationFrame(scrollToTopNow);
      setTimeout(scrollToTopNow, 60);
    };

    const eventName = 'akpsi-scroll-to-top';
    window.addEventListener(eventName, handleScrollToTop);
    document.addEventListener(eventName, handleScrollToTop);
    return () => {
      window.removeEventListener(eventName, handleScrollToTop);
      document.removeEventListener(eventName, handleScrollToTop);
    };
  }, []);

  return null; // This component doesn't render anything
} 