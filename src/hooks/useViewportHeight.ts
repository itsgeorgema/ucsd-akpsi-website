'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect Safari popup windows and provide appropriate viewport height
 * Safari popup windows (like from Facebook Messenger) handle viewport differently
 * than regular Safari, causing layout issues with bottom UI elements
 */
export function useViewportHeight() {
  const [isPopupWindow, setIsPopupWindow] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    function detectPopupWindow() {
      // Check if we're in a popup window by examining window properties
      const isPopup = 
        // Check if window has opener (opened by another window)
        window.opener !== null ||
        // Check if window name suggests it's a popup
        window.name === 'popup' ||
        // Check if window is significantly smaller than screen (common in popup windows)
        (window.screen && 
         window.innerHeight < window.screen.height * 0.75 &&
         window.innerWidth < window.screen.width * 0.9) ||
        // Check for specific user agents that indicate in-app browsers
        /FBAN|FBAV|Instagram|Line|WeChat|Twitter|MessengerLiteForiOS|MessengerForiOS/.test(navigator.userAgent) ||
        // Check for constrained viewport (typical of popup windows)
        (window.innerHeight < 600 && window.innerWidth < 500) ||
        // Check if running in standalone mode (PWA) which can have similar constraints
        window.matchMedia('(display-mode: standalone)').matches;

      setIsPopupWindow(isPopup);
    }

    function updateViewportHeight() {
      // For popup windows, use the actual window height relative to viewport
      // For regular browsing, use standard viewport units
      let height = window.innerHeight;
      
      if (isPopupWindow) {
        // In popup windows, use the full available viewport height
        // This maintains relative proportions instead of fixed minimums
        height = window.innerHeight;
      }
      
      setViewportHeight(height);
    }

    detectPopupWindow();
    updateViewportHeight();

    // Listen for viewport changes
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);

    // Clean up listeners
    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
    };
  }, [isPopupWindow]);

  return {
    isPopupWindow,
    viewportHeight,
    // Provide CSS custom property for dynamic height
    cssVarHeight: `${viewportHeight}px`,
  };
}
