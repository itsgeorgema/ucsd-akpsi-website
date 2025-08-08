// UCSD AKPsi Website Font System
// Comprehensive font hierarchy with depth and complexity while maintaining consistency

// FONT FAMILY TOKENS
export const fontFamilies = {
  sans: 'font-inter',
  mono: 'font-mono',
  serif: 'font-serif',
} as const;

// HIERARCHY ROLES (weights, tracking, casing) – no sizes here
export const fontRoles = {
  displayStrong: 'font-black tracking-tighter',
  display: 'font-extrabold tracking-tighter',
  bodyStrong: 'font-bold tracking-tighter',
  body: 'font-semibold tracking-tighter',
  label: 'font-bold tracking-tighter uppercase',
  code: 'font-bold tracking-wide',
} as const;

// Back-compat composite map preserving previous names
export const akpsiFonts = {
  // === PRIMARY FONT FAMILY (Inter) ===
  // Used for most content with maximum boldness and ultra-tight spacing
  
  // Display/Headline fonts - Large, impactful text
  display: {
    large: `${fontFamilies.sans} ${fontRoles.displayStrong}`,
    medium: `${fontFamilies.sans} ${fontRoles.displayStrong}`,
    small: `${fontFamilies.sans} ${fontRoles.display}`,
  },
  
  // Body text fonts - Readable content
  body: {
    large: `${fontFamilies.sans} font-bold leading-relaxed tracking-tighter`,
    medium: `${fontFamilies.sans} font-bold leading-relaxed tracking-tighter`,
    small: `${fontFamilies.sans} font-semibold leading-relaxed tracking-tighter`,
  },
  
  // UI/Interactive fonts - Buttons, navigation, etc.
  ui: {
    primary: `${fontFamilies.sans} ${fontRoles.displayStrong}`,
    secondary: `${fontFamilies.sans} ${fontRoles.bodyStrong}`,
    tertiary: `${fontFamilies.sans} ${fontRoles.bodyStrong}`,
  },
  
  // Accent fonts - Special use cases
  accent: {
    mono: `${fontFamilies.mono} ${fontRoles.code}`,
    serif: `${fontFamilies.serif} font-bold italic`,
  },
  
  // === LEGACY COMPATIBILITY ===
  // Maintain existing references for backward compatibility
  navBarFont: 'font-inter font-black tracking-tighter',
  heroTitleFont: 'font-inter font-black tracking-tighter',
  sectionTitleFont: 'font-inter font-black tracking-tighter',
  sectionSubtitleFont: 'font-inter font-extrabold tracking-tighter',
  sectionTextFont: 'font-inter font-bold leading-relaxed tracking-tighter',
  bodyFont: 'font-inter font-bold leading-relaxed tracking-tighter',
  monoFont: 'font-mono font-bold tracking-wide',
};

// === RESPONSIVE FONT SIZES ===
// Separated responsive sizing for flexible usage across different contexts
export const responsiveFontSizes = {
  heroTitle: 'text-6xl md:text-8xl',
  heroSubtitle: 'text-xl md:text-2xl',
  sectionMain: 'text-4xl md:text-5xl',
  sectionSecondary: 'text-2xl md:text-3xl',
  sectionTertiary: 'text-lg md:text-xl',
  contentLead: 'text-lg md:text-xl',
  contentBody: 'text-base md:text-lg',
  contentSmall: 'text-sm md:text-base',
};

// === SPECIALIZED FONT COMBINATIONS ===
// Pre-composed font combinations for specific use cases

export const fontCombinations = {
  // Hero section - Maximum boldness
  hero: {
    // Keep exact order for hydration parity
    title: `${fontFamilies.sans} font-black ${responsiveFontSizes.heroTitle} tracking-tighter leading-none`,
    subtitle: `${fontFamilies.sans} font-black ${responsiveFontSizes.heroSubtitle} tracking-tighter leading-relaxed`,
  },
  
  // Section headers - Maximum boldness
  section: {
    main: `${fontFamilies.sans} font-black ${responsiveFontSizes.sectionMain} tracking-tighter leading-tight`,
    secondary: `${fontFamilies.sans} font-black ${responsiveFontSizes.sectionSecondary} tracking-tighter leading-relaxed`,
    tertiary: `${fontFamilies.sans} font-extrabold ${responsiveFontSizes.sectionTertiary} tracking-tighter leading-relaxed`,
  },
  
  // Content blocks - Maximum boldness
  content: {
    lead: `${fontFamilies.sans} font-medium ${responsiveFontSizes.contentLead} leading-relaxed`,
    body: `${fontFamilies.sans} font-normal ${responsiveFontSizes.contentBody} leading-relaxed`,
    small: `${fontFamilies.sans} font-light ${responsiveFontSizes.contentSmall} leading-relaxed`,
  },
  
  // Interactive elements - Maximum boldness
  interactive: {
    primary: `${fontFamilies.sans} font-black text-base tracking-tighter uppercase`,
    secondary: `${fontFamilies.sans} font-black text-sm tracking-tighter uppercase`,
    tertiary: `${fontFamilies.sans} font-bold text-xs tracking-tighter uppercase`,
  },
  
  // Navigation and UI - Maximum boldness
  navigation: {
    // Order matches server-rendered HTML to avoid hydration diffs
    primary: `${fontFamilies.sans} font-black text-sm tracking-tighter uppercase`,
    secondary: `${fontFamilies.sans} font-black text-xs tracking-tighter uppercase`,
    dropdown: `${fontFamilies.sans} font-bold text-xs tracking-tighter`,
  },
  
  // Values and features - Maximum boldness
  values: {
    title: `${fontFamilies.sans} font-black text-lg md:text-xl tracking-tighter uppercase`,
    description: `${fontFamilies.sans} font-bold text-sm md:text-base leading-relaxed tracking-tighter`,
  },
  
  // Quotes and testimonials - Maximum boldness
  quote: {
    text: `${fontFamilies.serif} font-bold text-lg md:text-xl italic leading-relaxed`,
    attribution: `${fontFamilies.sans} font-black text-sm tracking-tighter uppercase`,
  },
  
  // Technical content - Maximum boldness
  technical: {
    code: `${fontFamilies.mono} font-bold text-sm tracking-wide`,
    label: `${fontFamilies.sans} font-black text-xs tracking-tighter uppercase`,
    data: `${fontFamilies.mono} font-bold text-sm tracking-wide`,
  },
};

// === FONT WEIGHTS MAPPING ===
// For consistent weight usage across the site - hierarchy-based weights
export const fontWeights = {
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
};

// === HIERARCHY-SPECIFIC FONT WEIGHTS ===
// For specific use cases with appropriate boldness levels
export const hierarchyWeights = {
  // Maximum boldness for primary elements (900)
  primary: 'font-black',
  title: 'font-black', 
  hero: 'font-black',
  valuesTitle: 'font-black',
  
  // High boldness for important elements (700)
  important: 'font-bold',
  section: 'font-bold',
  navbar: 'font-bold',
  footer: 'font-bold',
  
  // Medium boldness for body content (600)
  body: 'font-semibold',
  content: 'font-semibold',
  
  // Normal weight for paragraph content (400)
  paragraph: 'font-normal',
  valuesDescription: 'font-normal',
  
  // Light elements (400)
  secondary: 'font-normal',
  signature: 'font-normal',
  description: 'font-normal',
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
export const heroFont = 'font-inter font-black tracking-tighter'; 

// Clean, modular export for consumers who want explicit tokens/roles
export const akpsiTypography = {
  families: fontFamilies,
  roles: fontRoles,
  sizes: responsiveFontSizes,
  combinations: fontCombinations,
} as const;