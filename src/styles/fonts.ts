const fontFamilies = {
  sans: "font-inter",
} as const;

export const akpsiFonts = {
  heroTitleFont: "font-inter font-black tracking-tighter",
  sectionTitleFont: "font-inter font-black tracking-tighter",
  sectionSubtitleFont: "font-inter font-extrabold tracking-tighter",
  sectionTextFont: "font-inter font-bold leading-relaxed tracking-tighter",
  bodyFont: "font-inter font-bold leading-relaxed tracking-tighter",
};

const responsiveFontSizes = {
  heroTitle: "text-6xl md:text-8xl",
  sectionMain: "text-4xl md:text-5xl",
  sectionSecondary: "text-2xl md:text-3xl",
  sectionTertiary: "text-lg md:text-xl",
  contentLead: "text-lg md:text-xl",
  contentBody: "text-base md:text-lg",
  contentSmall: "text-sm md:text-base",
};

export const fontCombinations = {
  hero: {
    title: `${fontFamilies.sans} font-black ${responsiveFontSizes.heroTitle} tracking-tighter leading-none`,
  },
  section: {
    main: `${fontFamilies.sans} font-black ${responsiveFontSizes.sectionMain} tracking-tighter leading-tight`,
    secondary: `${fontFamilies.sans} font-black ${responsiveFontSizes.sectionSecondary} tracking-tighter leading-relaxed`,
    tertiary: `${fontFamilies.sans} font-extrabold ${responsiveFontSizes.sectionTertiary} tracking-tighter leading-relaxed`,
  },
  content: {
    lead: `${fontFamilies.sans} font-medium ${responsiveFontSizes.contentLead} leading-relaxed`,
    body: `${fontFamilies.sans} font-normal ${responsiveFontSizes.contentBody} leading-relaxed`,
    small: `${fontFamilies.sans} font-light ${responsiveFontSizes.contentSmall} leading-relaxed`,
  },
  interactive: {
    primary: `${fontFamilies.sans} font-black text-base tracking-tighter uppercase`,
    tertiary: `${fontFamilies.sans} font-bold text-xs tracking-tighter uppercase`,
  },
  navigation: {
    primary: `${fontFamilies.sans} font-black text-sm tracking-tighter uppercase`,
    secondary: `${fontFamilies.sans} font-black text-xs tracking-tighter uppercase`,
  },
  values: {
    title: `${fontFamilies.sans} font-black text-lg md:text-xl tracking-tighter uppercase`,
    description: `${fontFamilies.sans} font-bold text-sm md:text-base leading-relaxed tracking-tighter`,
  },
  technical: {
    label: `${fontFamilies.sans} font-black text-xs tracking-tighter uppercase`,
  },
};

export const hierarchyWeights = {
  title: "font-black",
  hero: "font-black",
  valuesTitle: "font-black",
  important: "font-bold",
  footer: "font-bold",
  paragraph: "font-normal",
  signature: "font-normal",
};
