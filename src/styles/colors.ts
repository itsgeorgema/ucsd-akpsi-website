export const colorPalette = {
  neutral: {
    white: "#F8F8F8",
    black: "#212121",
    lightGray: "#E0E0E0",
    mediumGray: "#9E9E9E",
    darkGray: "#333333",
  },
  blue: {
    soft: "#B3CDE0",
    medium: "#6497B1",
  },
  gold: {
    muted: "#B89334",
    light: "#D4AF37",
    bright: "#FFD700",
  },
  brand: {
    royalBlue: "#003366",
  },
  dark: {
    background: "#0A192F",
    surface: "#1a4d80",
    accent: "#B3CDE0",
  },
} as const;

export const colors = {
  bg: {
    primary: "bg-[#F8F8F8]",
    surfaceAlt: "bg-[#E0E0E0]",
    overlay: "bg-black/40",
    dark: "bg-[#0A192F]",
    darkSurface: "bg-[#1a4d80]",
  },
  text: {
    primary: "text-[#212121]",
    secondary: "text-[#333333]",
    inverse: "text-[#F8F8F8]",
    accent: "text-[#B89334]",
    white: "text-white",
    darkAccent: "text-[#B3CDE0]",
    goldLight: "text-[#D4AF37]",
  },
  border: {
    default: "border-[#E0E0E0]",
    accent: "border-[#B89334]",
    darkAccent: "border-[#B3CDE0]",
    darkAccentTransparent: "border-[#B3CDE0]/30",
  },
  glass: {
    bg: "bg-[#F8F8F8]/10 backdrop-blur-md",
    bgHover: "hover:bg-[#F8F8F8]/30",
    border: "border-[#F8F8F8]/20",
    borderHover: "hover:border-[#F8F8F8]/40",
    text: "text-[#F8F8F8]",
    textSubtle: "text-[#F8F8F8]/80",
    textBody: "text-[#F8F8F8]/90",
  },
  nav: {
    textActive: "text-[#D4AF37]",
  },
  section: {
    title: "text-[#003366]",
    titleBg: "bg-[#003366]",
    subtitle: "text-[#6497B1]",
    text: "text-[#212121]",
    bg: "bg-[#F8F8F8]",
  },
  heroTitle: "text-[#F8F8F8]",
  footer: {
    icon: "text-[#F8F8F8] hover:text-[#D4AF37]",
    link: "text-[#F8F8F8] hover:text-[#D4AF37]",
  },
  gradient: {
    brand: "from-[#003366] to-[#6497B1]",
    brandReverse: "from-[#6497B1] to-[#003366]",
  },
} as const;
