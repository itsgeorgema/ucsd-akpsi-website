// UCSD AKPsi Website Font System
// Comprehensive font hierarchy with depth and complexity while maintaining consistency

export const akpsiFonts = {
  // === PRIMARY FONT FAMILY (Inter) ===
  // Used for most content with different weights for hierarchy
  
  // Display/Headline fonts - Large, impactful text
  display: {
    large: 'font-inter font-black tracking-tight', // For hero titles, main headlines
    medium: 'font-inter font-bold tracking-normal', // For section titles
    small: 'font-inter font-semibold tracking-wide', // For subsection titles
  },
  
  // Body text fonts - Readable content
  body: {
    large: 'font-inter font-medium leading-relaxed', // For important body text
    medium: 'font-inter font-normal leading-relaxed', // For regular body text
    small: 'font-inter font-light leading-relaxed', // For secondary text
  },
  
  // UI/Interactive fonts - Buttons, navigation, etc.
  ui: {
    primary: 'font-inter font-semibold tracking-wide', // For primary buttons, nav
    secondary: 'font-inter font-medium tracking-normal', // For secondary buttons
    tertiary: 'font-inter font-normal tracking-wide', // For tertiary elements
  },
  
  // Accent fonts - Special use cases
  accent: {
    mono: 'font-mono font-medium tracking-wide', // For code, technical content
    serif: 'font-serif font-medium italic', // For quotes, emphasis
  },
  
  // === LEGACY COMPATIBILITY ===
  // Maintain existing references for backward compatibility
  navBarFont: 'font-inter font-medium tracking-wide',
  heroTitleFont: 'font-inter font-bold tracking-tight',
  sectionTitleFont: 'font-inter font-semibold tracking-normal',
  sectionSubtitleFont: 'font-inter font-medium tracking-wide',
  sectionTextFont: 'font-inter font-normal leading-relaxed',
  bodyFont: 'font-inter font-normal leading-relaxed',
  monoFont: 'font-mono font-normal tracking-wide',
};

// === SPECIALIZED FONT COMBINATIONS ===
// Pre-composed font combinations for specific use cases

export const fontCombinations = {
  // Hero section - Bold, impactful
  hero: {
    title: 'font-inter font-bold text-6xl md:text-8xl tracking-tight leading-none',
    subtitle: 'font-inter font-medium text-xl md:text-2xl tracking-wide leading-relaxed',
  },
  
  // Section headers - Clear hierarchy
  section: {
    main: 'font-inter font-semibold text-4xl md:text-5xl tracking-normal leading-tight',
    secondary: 'font-inter font-medium text-2xl md:text-3xl tracking-wide leading-relaxed',
    tertiary: 'font-inter font-normal text-lg md:text-xl tracking-wide leading-relaxed',
  },
  
  // Content blocks - Readable and engaging
  content: {
    lead: 'font-inter font-medium text-lg md:text-xl leading-relaxed',
    body: 'font-inter font-normal text-base md:text-lg leading-relaxed',
    small: 'font-inter font-light text-sm md:text-base leading-relaxed',
  },
  
  // Interactive elements - Clear and accessible
  interactive: {
    primary: 'font-inter font-semibold text-base tracking-wide uppercase',
    secondary: 'font-inter font-medium text-sm tracking-wide uppercase',
    tertiary: 'font-inter font-normal text-xs tracking-wide uppercase',
  },
  
  // Navigation and UI - Consistent and clear
  navigation: {
    primary: 'font-inter font-semibold text-sm tracking-wide uppercase',
    secondary: 'font-inter font-medium text-xs tracking-wide uppercase',
    dropdown: 'font-inter font-normal text-xs tracking-wide',
  },
  
  // Values and features - Stand out
  values: {
    title: 'font-inter font-semibold text-lg md:text-xl tracking-wide uppercase',
    description: 'font-inter font-normal text-sm md:text-base leading-relaxed',
  },
  
  // Quotes and testimonials - More personality
  quote: {
    text: 'font-serif font-medium text-lg md:text-xl italic leading-relaxed',
    attribution: 'font-inter font-semibold text-sm tracking-wide uppercase',
  },
  
  // Technical content - Clear and precise
  technical: {
    code: 'font-mono font-medium text-sm tracking-wide',
    label: 'font-inter font-semibold text-xs tracking-wide uppercase',
    data: 'font-mono font-normal text-sm tracking-wide',
  },
};

// === FONT WEIGHTS MAPPING ===
// For consistent weight usage across the site
export const fontWeights = {
  thin: 'font-thin',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
};

// === FONT SIZES MAPPING ===
// For consistent sizing across the site
export const fontSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
};

// === LEGACY EXPORTS ===
// For backward compatibility
export const heroFont = 'font-inter font-black tracking-tight'; 