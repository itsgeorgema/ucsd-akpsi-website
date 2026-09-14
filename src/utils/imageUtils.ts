// Utility functions for reading images from public directories

export interface GalleryImage {
  imageUrl: string;
}

export interface Company {
  name: string;
  imageUrl: string;
}

export interface HomeImages {
  background: string;
  groupPhoto1: string;
  unity: string;
  service: string;
  knowledge: string;
  integrity: string;
  broho: string;
}

export interface AboutImages {
  backgroundVideo: string;
  crest: string;
  akpsiLogo: string;
  groupPhoto1: string;
  groupPhoto2: string;
  genderPie: string;
  gradePie: string;
  industryDistribution: string;
  crestSvg: string;
}

// Gallery images from /public/gallery directory
export const getGalleryImages = (): GalleryImage[] => {
  const images = [
    "/gallery/gallery1.png",
    "/gallery/gallery2.png",
    "/gallery/gallery3.png",
    "/gallery/gallery4.png",
    "/gallery/gallery5.png",
    "/gallery/gallery6.png",
    "/gallery/gallery7.png",
    "/gallery/gallery8.png",
    "/gallery/gallery10.png",
    "/gallery/gallery11.png",
    "/gallery/gallery12.png",
    "/gallery/gallery13.png",
    "/gallery/gallery14.png",
    "/gallery/gallery15.png",
    "/gallery/gallery16.png",
    "/gallery/gallery17.png",
    "/gallery/gallery18.png",
  ];

  return images.map((imageUrl) => ({
    imageUrl,
  }));
};

// Company images from /public/companies directory
export const getCompanyImages = (): Company[] => {
  const companies = [
    { name: "Apple", imageUrl: "/companies/1apple.png" },
    { name: "Google", imageUrl: "/companies/2google.png" },
    { name: "Amazon", imageUrl: "/companies/3amazon.png" },
    { name: "NVIDIA", imageUrl: "/companies/4nvidia.png" },
    { name: "Atlassian", imageUrl: "/companies/5atlassian.png" },
    { name: "Meta", imageUrl: "/companies/6meta.png" },
    { name: "Tesla", imageUrl: "/companies/7tesla.png" },
    { name: "Microsoft", imageUrl: "/companies/8microsoft.png" },
    { name: "Stifel", imageUrl: "/companies/9stifel.png" },
    { name: "Deloitte", imageUrl: "/companies/10deloitte.png" },
    { name: "Adobe", imageUrl: "/companies/11adobe.png" },
    { name: "BlackRock", imageUrl: "/companies/12blackrock.png" },
    { name: "Bank of America", imageUrl: "/companies/13bankofamerica.png" },
    { name: "IBM", imageUrl: "/companies/14ibm.png" },
    { name: "Mercedes", imageUrl: "/companies/15mercedes.png" },
    { name: "Live Nation", imageUrl: "/companies/16livenation.png" },
    { name: "DreamWorks", imageUrl: "/companies/17dreamworks.png" },
    { name: "Citi", imageUrl: "/companies/18citi.png" },
    { name: "Goldman Sachs", imageUrl: "/companies/19goldmansachs.png" },
    { name: "Visa", imageUrl: "/companies/20visa.png" },
    { name: "Sony", imageUrl: "/companies/21sony.png" },
    { name: "Pure Storage", imageUrl: "/companies/22purestorage.png" },
    { name: "Viasat", imageUrl: "/companies/23viasat.png" },
    { name: "Hewlett Packard", imageUrl: "/companies/24hewlettpackard.png" },
    { name: "Fullscreen", imageUrl: "/companies/25fullscreen.png" },
    { name: "Bespoke", imageUrl: "/companies/26bespoke.png" },
    { name: "Ameritrade", imageUrl: "/companies/27ameritrade.png" },
    { name: "Capital Advisors", imageUrl: "/companies/28capitaladvisors.png" },
    { name: "Nike", imageUrl: "/companies/29nike.png" },
    { name: "Johnson & Johnson", imageUrl: "/companies/30johnsonjohnson.png" },
    { name: "Bainbridge", imageUrl: "/companies/31bainbridge.png" },
    { name: "CBS", imageUrl: "/companies/32cbs.png" },
    { name: "Lumentum", imageUrl: "/companies/33lumentum.png" },
    { name: "Warner Bros", imageUrl: "/companies/34warnerbros.png" },
    { name: "Outreach", imageUrl: "/companies/35outreach.png" },
    { name: "TikTok", imageUrl: "/companies/36tiktok.png" },
    {
      name: "US State Department",
      imageUrl: "/companies/37usstatedepartment.png",
    },
    { name: "American Express", imageUrl: "/companies/38amex.png" },
    { name: "Verizon", imageUrl: "/companies/39verizon.png" },
    { name: "Qualcomm", imageUrl: "/companies/40qualcomm.png" },
    { name: "Wells Fargo", imageUrl: "/companies/41wellsfargo.png" },
    { name: "Experian", imageUrl: "/companies/42experian.png" },
    { name: "Mercer", imageUrl: "/companies/43mercer.png" },
    { name: "Hyundai", imageUrl: "/companies/44hyundai.png" },
    { name: "Workday", imageUrl: "/companies/45workday.png" },
    { name: "EY", imageUrl: "/companies/46ey.png" },
    { name: "Exa", imageUrl: "/companies/47exa.png" },
    { name: "JPMorgan", imageUrl: "/companies/48jpmorgan.png" },
    { name: "CARB", imageUrl: "/companies/49carb.png" },
    {
      name: "Cantor Fitzgerald",
      imageUrl: "/companies/50cantorfitzgerald.png",
    },
    { name: "Juniper Networks", imageUrl: "/companies/51junipernetworks.png" },
    { name: "Jack in the Box", imageUrl: "/companies/52jackinthebox.png" },
    { name: "Blue Shield", imageUrl: "/companies/53blueshield.png" },
    { name: "Light & Wonder", imageUrl: "/companies/54lightandwonder.png" },
    { name: "Bloom", imageUrl: "/companies/55bloom.png" },
  ];

  return companies;
};

// Home page images from /public/home directory
export const getHomeImages = (): HomeImages => {
  return {
    background: "/home/homePageBackground.jpg",
    groupPhoto1: "/home/homePageGroupPhoto.jpg",
    unity: "/home/unity.png",
    service: "/home/service.png",
    knowledge: "/home/knowledge.png",
    integrity: "/home/integrity.png",
    broho: "/home/broho.png",
  };
};

// About page images from /public/about directory
export const getAboutImages = (): AboutImages => {
  return {
    backgroundVideo: "/about/backgroundVid3.mp4",
    crest: "/about/crest.png",
    akpsiLogo: "/about/akpsiLogo.svg",
    groupPhoto1: "/about/groupAbout1.jpeg",
    groupPhoto2: "/about/groupAbout2.jpeg",
    genderPie: "/about/genderPie.png",
    gradePie: "/about/gradePie.png",
    industryDistribution: "/about/industryDistribution.png",
    crestSvg: "/about/crest1.svg",
  };
};
