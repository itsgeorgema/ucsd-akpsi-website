// Utility functions for reading images from public directories

export interface GalleryImage {
  imageUrl: string;
  num: number;
}

export interface Company {
  name: string;
  imageUrl: string;
  num: number;
}

export interface HomeImages {
  background: string;
  groupPhoto1: string;
  groupPhoto2: string;
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
  akpsiLogoSvg: string;
}

// Gallery images from /public/gallery directory
export const getGalleryImages = (): GalleryImage[] => {
  const images = [
    '/gallery/gallery1.png',
    '/gallery/gallery2.png',
    '/gallery/gallery3.png',
    '/gallery/gallery4.png',
    '/gallery/gallery5.png',
    '/gallery/gallery6.png',
    '/gallery/gallery7.png',
    '/gallery/gallery8.png',
    '/gallery/gallery9.png',
    '/gallery/gallery10.png',
    '/gallery/gallery11.png',
    '/gallery/gallery12.png',
    '/gallery/gallery13.png',
    '/gallery/gallery14.png',
    '/gallery/gallery15.png',
    '/gallery/gallery16.png',
    '/gallery/gallery17.png',
    '/gallery/gallery18.png'
  ];

  return images.map((imageUrl, index) => ({
    imageUrl,
    num: index + 1
  }));
};

// Company images from /public/companies directory
export const getCompanyImages = (): Company[] => {
  const companies = [
    { name: 'Apple', imageUrl: '/companies/1apple.png', num: 1 },
    { name: 'Google', imageUrl: '/companies/2google.png', num: 2 },
    { name: 'Amazon', imageUrl: '/companies/3amazon.png', num: 3 },
    { name: 'NVIDIA', imageUrl: '/companies/4nvidia.png', num: 4 },
    { name: 'Atlassian', imageUrl: '/companies/5atlassian.png', num: 5 },
    { name: 'Meta', imageUrl: '/companies/6meta.png', num: 6 },
    { name: 'Tesla', imageUrl: '/companies/7tesla.png', num: 7 },
    { name: 'Microsoft', imageUrl: '/companies/8microsoft.png', num: 8 },
    { name: 'Stifel', imageUrl: '/companies/9stifel.png', num: 9 },
    { name: 'Deloitte', imageUrl: '/companies/10deloitte.png', num: 10 },
    { name: 'Adobe', imageUrl: '/companies/11adobe.png', num: 11 },
    { name: 'BlackRock', imageUrl: '/companies/12blackrock.png', num: 12 },
    { name: 'Bank of America', imageUrl: '/companies/13bankofamerica.png', num: 13 },
    { name: 'IBM', imageUrl: '/companies/14ibm.png', num: 14 },
    { name: 'Mercedes', imageUrl: '/companies/15mercedes.png', num: 15 },
    { name: 'Live Nation', imageUrl: '/companies/16livenation.png', num: 16 },
    { name: 'DreamWorks', imageUrl: '/companies/17dreamworks.png', num: 17 },
    { name: 'Citi', imageUrl: '/companies/18citi.png', num: 18 },
    { name: 'Goldman Sachs', imageUrl: '/companies/19goldmansachs.png', num: 19 },
    { name: 'Visa', imageUrl: '/companies/20visa.png', num: 20 },
    { name: 'Sony', imageUrl: '/companies/21sony.png', num: 21 },
    { name: 'Pure Storage', imageUrl: '/companies/22purestorage.png', num: 22 },
    { name: 'Viasat', imageUrl: '/companies/23viasat.png', num: 23 },
    { name: 'Hewlett Packard', imageUrl: '/companies/24hewlettpackard.png', num: 24 },
    { name: 'Fullscreen', imageUrl: '/companies/25fullscreen.png', num: 25 },
    { name: 'Bespoke', imageUrl: '/companies/26bespoke.png', num: 26 },
    { name: 'Ameritrade', imageUrl: '/companies/27ameritrade.png', num: 27 },
    { name: 'Capital Advisors', imageUrl: '/companies/28capitaladvisors.png', num: 28 },
    { name: 'Nike', imageUrl: '/companies/29nike.png', num: 29 },
    { name: 'Johnson & Johnson', imageUrl: '/companies/30johnsonjohnson.png', num: 30 },
    { name: 'Bainbridge', imageUrl: '/companies/31bainbridge.png', num: 31 },
    { name: 'CBS', imageUrl: '/companies/32cbs.png', num: 32 },
    { name: 'Lumentum', imageUrl: '/companies/33lumentum.png', num: 33 },
    { name: 'Warner Bros', imageUrl: '/companies/34warnerbros.png', num: 34 },
    { name: 'Outreach', imageUrl: '/companies/35outreach.png', num: 35 }
  ];

  return companies;
};

// Home page images from /public/home directory
export const getHomeImages = (): HomeImages => {
  return {
    background: '/home/homePageBackground.jpg',
    groupPhoto1: '/home/homePageGroupPhoto.jpg',
    groupPhoto2: '/home/homePageGroupPhoto2.png',
    unity: '/home/unity.png',
    service: '/home/service.png',
    knowledge: '/home/knowledge.png',
    integrity: '/home/integrity.png',
    broho: '/home/broho.png'
  };
};

// About page images from /public/about directory
export const getAboutImages = (): AboutImages => {
  return {
    backgroundVideo: '/about/backgroundVid3.mp4',
    crest: '/about/crest.png',
    akpsiLogo: '/about/akpsiLogo.svg',
    groupPhoto1: '/about/groupAbout1.jpeg',
    groupPhoto2: '/about/groupAbout2.jpeg',
    genderPie: '/about/genderPie.png',
    gradePie: '/about/gradePie.png',
    industryDistribution: '/about/industryDistribution.png',
    crestSvg: '/about/crest1.svg',
    akpsiLogoSvg: '/about/akpsiLogo.svg'
  };
}; 