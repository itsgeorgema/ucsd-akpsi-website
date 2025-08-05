'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on every page change and initial load
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything
} 