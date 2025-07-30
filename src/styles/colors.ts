/**
 * UCSD AKPsi Website Color System
 * 
 * This comprehensive color system provides both CSS custom properties 
 * and Tailwind utility classes for maximum flexibility and consistency.
 * 
 * Color Palette:
 * - Neutrals: Clean whites, grays, and blacks for foundation
 * - Blues: Soft, muted blues for modern professional feel  
 * - Golds: Sophisticated gold hierarchy for accents
 * - Brand: AKPsi royal blue for key brand elements
 */

// Raw color values (hex codes)
export const colorPalette = {
  // Neutrals - Foundation colors
  neutral: {
    white: '#F8F8F8',           // Dominant background white/off-white
    black: '#212121',           // Text black/dark grey
    lightGray: '#E0E0E0',       // Subtle borders, light backgrounds
    mediumGray: '#9E9E9E',      // Disabled states, secondary text
    darkGray: '#333333',        // Alternative dark text
  },
  
  // Blues - Primary brand colors (modern, muted)
  blue: {
    soft: '#B3CDE0',            // Soft/muted blue for backgrounds
    medium: '#6497B1',          // Mid-tone blue for interactive elements
  },
  
  // Golds - Sophisticated accent hierarchy
  gold: {
    muted: '#B89334',           // Muted matte gold (primary gold)
    light: '#D4AF37',           // Lighter gold for highlights/hover
    bright: '#FFD700',          // Bright gold pop (very limited use)
  },
  
  // Brand - AKPsi identity colors
  brand: {
    royalBlue: '#003366',       // AKPsi royal blue for key brand elements
  }
} as const;

// Semantic color mappings for different use cases
export const semanticColors = {
  // Primary colors
  primary: colorPalette.blue.medium,
  primaryHover: colorPalette.blue.soft,
  primaryText: colorPalette.neutral.white,
  
  // Secondary colors  
  secondary: colorPalette.gold.muted,
  secondaryHover: colorPalette.gold.light,
  secondaryText: colorPalette.neutral.white,
  
  // Accent colors
  accent: colorPalette.brand.royalBlue,
  accentHover: colorPalette.blue.medium,
  accentText: colorPalette.neutral.white,
  
  // Background colors
  background: colorPalette.neutral.white,
  backgroundAlt: colorPalette.blue.soft,
  surface: colorPalette.neutral.white,
  surfaceAlt: colorPalette.neutral.lightGray,
  
  // Text colors
  textPrimary: colorPalette.neutral.black,
  textSecondary: colorPalette.neutral.mediumGray,
  textInverse: colorPalette.neutral.white,
  textAccent: colorPalette.gold.muted,
  
  // Border colors
  border: colorPalette.neutral.lightGray,
  borderHover: colorPalette.neutral.mediumGray,
  
  // Interactive states
  hover: colorPalette.blue.soft,
  active: colorPalette.blue.medium,
  focus: colorPalette.gold.light,
} as const;

// Tailwind utility classes for easy component usage
export const colors = {
  // Backgrounds
  bg: {
    primary: 'bg-[#F8F8F8]',
    primaryAlt: 'bg-[#B3CDE0]',
    surface: 'bg-[#F8F8F8]',
    surfaceAlt: 'bg-[#E0E0E0]',
    overlay: 'bg-black/40',
    overlayLight: 'bg-black/20',
  },
  
  // Text colors
  text: {
    primary: 'text-[#212121]',
    secondary: 'text-[#9E9E9E]',
    inverse: 'text-[#F8F8F8]',
    accent: 'text-[#B89334]',
    brand: 'text-[#003366]',
    white: 'text-white',
  },
  
  // Buttons
  button: {
    primary: 'bg-[#6497B1] hover:bg-[#B3CDE0] text-[#F8F8F8] border-[#6497B1] hover:border-[#B3CDE0]',
    secondary: 'bg-[#B89334] hover:bg-[#D4AF37] text-[#F8F8F8] border-[#B89334] hover:border-[#D4AF37]',
    accent: 'bg-[#003366] hover:bg-[#6497B1] text-[#F8F8F8] border-[#003366] hover:border-[#6497B1]',
    ghost: 'bg-transparent hover:bg-[#B3CDE0]/20 text-[#212121] border-[#E0E0E0] hover:border-[#B3CDE0]',
  },
  
  // Borders  
  border: {
    default: 'border-[#E0E0E0]',
    hover: 'hover:border-[#9E9E9E]',
    accent: 'border-[#B89334]',
    brand: 'border-[#003366]',
  },
  
  // Glass morphism effects
  glass: {
    bg: 'bg-[#F8F8F8]/10 backdrop-blur-md',
    bgHover: 'hover:bg-[#F8F8F8]/30',
    border: 'border-[#F8F8F8]/20',
    borderHover: 'hover:border-[#F8F8F8]/40',
    text: 'text-[#F8F8F8]',
    textSubtle: 'text-[#F8F8F8]/80',
    textBody: 'text-[#F8F8F8]/90',
  },
  
  // Navigation specific
  nav: {
    bg: 'bg-[#212121]/25',
    border: 'border-[#9E9E9E]/20',
    text: 'text-[#F8F8F8]',
    textActive: 'text-[#D4AF37]',
    textHover: 'hover:text-[#D4AF37]',
    bgActive: 'bg-[#212121]/40',
    bgHover: 'hover:bg-[#212121]/30',
  },
  
  // Section specific  
  section: {
    title: 'text-[#003366]',
    titleBg: 'bg-[#003366]',
    subtitle: 'text-[#6497B1]',
    text: 'text-[#212121]',
    textSecondary: 'text-[#9E9E9E]',
    bg: 'bg-[#F8F8F8]',
    bgAlt: 'bg-[#B3CDE0]',
  },
  
  // Legacy compatibility properties
  sectionTitle: 'text-[#003366]',
  sectionText: 'text-[#212121]',
  sectionBg: 'bg-[#F8F8F8]',
  heroTitle: 'text-[#F8F8F8]',
  heroSubtitle: 'text-[#F8F8F8]/80',
  black: 'text-[#212121]',
  mainBg: 'bg-[#F8F8F8]',
  statCircleBg: 'bg-[#E0E0E0]',
  statCircleText: 'text-[#9E9E9E]',
  glassBg: 'bg-[#F8F8F8]/10 backdrop-blur-md',
  glassBorder: 'border-[#F8F8F8]/20',
  glassText: 'text-[#F8F8F8]',
  glassBlurMd: 'backdrop-blur-md',
  
  // Footer specific
  footer: {
    text: 'text-[#F8F8F8]',
    textHover: 'hover:text-[#F8F8F8]/80',
    icon: 'text-[#F8F8F8] hover:text-[#D4AF37]',
    link: 'text-[#F8F8F8] hover:text-[#D4AF37]',
  },
  
  // Status/feedback colors
  status: {
    success: 'text-green-600 bg-green-50 border-green-200',
    error: 'text-red-600 bg-red-50 border-red-200', 
    warning: 'text-amber-600 bg-amber-50 border-amber-200',
    info: 'text-[#6497B1] bg-[#B3CDE0]/20 border-[#B3CDE0]',
  },
  
  // Gradients
  gradient: {
    primary: 'from-[#B3CDE0] via-[#F8F8F8] to-[#B3CDE0]',
    accent: 'from-[#6497B1] to-[#B3CDE0]',
    gold: 'from-[#D4AF37] to-[#B89334]',
    neutral: 'from-[#F8F8F8] via-[#E0E0E0] to-[#F8F8F8]',
  }
} as const; 