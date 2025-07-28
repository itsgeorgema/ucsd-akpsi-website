'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../supabase/client';
import Footer from '../components/Footer';
import ScrollArrow from '../components/ScrollArrow';
import LoadingSpinner from '../components/LoadingSpinner';
import { heroFont } from '../styles/fonts';

interface Company {
  image_path: string;
  imageUrl: string;
}

interface President {
  name: string;
  imageUrl: string;
}

interface HomeImages {
  background: string;
  groupPhoto1: string;
  groupPhoto2: string;
  industryDistribution: string;
  broho: string;
  integrity: string;
  service: string;
  unity: string;
  knowledge: string;
  akpsiLogo: string;
}

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [president, setPresident] = useState<President | null>(null);
  const [homeImages, setHomeImages] = useState<HomeImages>({
    background: '',
    groupPhoto1: '',
    groupPhoto2: '',
    industryDistribution: '',
    broho: '',
    integrity: '',
    service: '',
    unity: '',
    knowledge: '',
    akpsiLogo: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        
        // Fetch home page images from storage bucket
        const imagePaths = [
          'homePageBackground.jpg',
          'homePageGroupPhoto.jpg',
          'homePageGroupPhoto2.png',
          'industryDistribution.png',
          'broho.png',
          'integrity.png',
          'service.png',
          'unity.png',
          'knowledge.png'
        ];

        // Fetch AKPsi logo from misc bucket
        const { data: logoData } = supabase.storage
          .from('misc')
          .getPublicUrl('akpsiLogo.png');

        const newHomeImages: HomeImages = {
          background: '',
          groupPhoto1: '',
          groupPhoto2: '',
          industryDistribution: '',
          broho: '',
          integrity: '',
          service: '',
          unity: '',
          knowledge: '',
          akpsiLogo: logoData?.publicUrl || ''
        };

        imagePaths.forEach(imagePath => {
          const { data: imageData } = supabase.storage
            .from('home-page')
            .getPublicUrl(imagePath);
          
          switch (imagePath) {
            case 'homePageBackground.jpg':
              newHomeImages.background = imageData.publicUrl;
              break;
            case 'homePageGroupPhoto.jpg':
              newHomeImages.groupPhoto1 = imageData.publicUrl;
              break;
            case 'homePageGroupPhoto2.png':
              newHomeImages.groupPhoto2 = imageData.publicUrl;
              break;
            case 'industryDistribution.png':
              newHomeImages.industryDistribution = imageData.publicUrl;
              break;
            case 'broho.png':
              newHomeImages.broho = imageData.publicUrl;
              break;
            case 'integrity.png':
              newHomeImages.integrity = imageData.publicUrl;
              break;
            case 'service.png':
              newHomeImages.service = imageData.publicUrl;
              break;
            case 'unity.png':
              newHomeImages.unity = imageData.publicUrl;
              break;
            case 'knowledge.png':
              newHomeImages.knowledge = imageData.publicUrl;
              break;
          }
        });

        setHomeImages(newHomeImages);
        
        // Fetch companies
        const { data: companiesData, error: companiesError } = await supabase
          .from('companies')
          .select('image_path');

        if (companiesError) {
          console.error('Error fetching companies:', companiesError);
          setCompanies([]);
        } else if (companiesData) {
          console.log('Fetched companies data:', companiesData);
          const companiesWithUrls = companiesData.map(company => {
            console.log('Processing company:', company);
            const cleanImagePath = company.image_path.trim();
            const { data: imageData } = supabase.storage
              .from('home-page-companies')
              .getPublicUrl(cleanImagePath);
            
            console.log('Generated URL for', cleanImagePath, ':', imageData.publicUrl);
            
            return {
              image_path: cleanImagePath,
              imageUrl: imageData.publicUrl,
            };
          });

          console.log('Final companies with URLs:', companiesWithUrls);
          setCompanies(companiesWithUrls);
        }

        // Fetch president data
        const { data: presidentData, error: presidentError } = await supabase
          .from('ecomm-spring-25')
          .select('name, image_path')
          .eq('position', 'President')
          .single();

        if (presidentError) {
          console.error('Error fetching president:', presidentError);
        } else if (presidentData) {
          console.log('Fetched president data:', presidentData);
          const cleanImagePath = presidentData.image_path.trim();
          const { data: imageData } = supabase.storage
            .from('brothers-spring25')
            .getPublicUrl(cleanImagePath);
          
          setPresident({
            name: presidentData.name,
            imageUrl: imageData.publicUrl
          });
        }
      } catch (error) {
        console.error('Error:', error);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between">
      {/* Fixed full-page background */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: homeImages.background ? `url(${homeImages.background})` : undefined }}
      />
      {/* Overlay for readability */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-black/40" />
      <div className="relative z-20 flex flex-col min-h-screen justify-between">
        {loading ? (
          <main className="flex-1 flex items-center justify-center py-16 px-4">
            <LoadingSpinner size="large" fullScreen={false} type="component" />
          </main>
        ) : (
          <>
            {/* HERO SECTION */}
            <section className="relative flex flex-col items-center justify-center min-h-[70vh] pt-16 pb-8">
              <div className="mb-6">
                <img
                  src={homeImages.akpsiLogo}
                  alt="Alpha Kappa Psi Logo"
                  className="h-28 w-auto mx-auto"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <ScrollArrow />
            </section>

            {/* VALUES SECTION */}
            <section id="akpsi-info" className="relative py-16 px-4 md:px-0 flex justify-center">
              <div
                className="absolute inset-0 w-full h-full pointer-events-none rounded-none"
                style={{
                  background: 'linear-gradient(50.498759152186665deg, rgba(243,226,214,0.96) 17.010498046875%, rgba(52,44,55,0.96) 70.611572265625%, #282634 100%, #262626 100%)'
                }}
              />
              <div className="relative max-w-5xl w-full mx-auto z-10">
                <h2 className="text-3xl md:text-4xl mb-10 text-center text-white font-bold">OUR VALUES</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
                  {/* Brotherhood */}
                  <div>
                    <img src={homeImages.broho} alt="Brotherhood" className="h-25 w-25 mx-auto mb-2" />
                    <div className="text-lg text-white font-semibold">BROTHERHOOD</div>
                    <div className="text-sm text-white">We are a family of life-long friends that stick together through thick and thin.</div>
                  </div>
                  {/* Integrity */}
                  <div>
                    <img src={homeImages.integrity} alt="Integrity" className="h-25 w-25 mx-auto mb-2" />
                    <div className="text-lg text-white font-semibold">INTEGRITY</div>
                    <div className="text-sm text-white">We do things through hard work and dedication, while not taking any unnecessary shortcuts.</div>
                  </div>
                  {/* Service */}
                  <div>
                    <img src={homeImages.service} alt="Service" className="h-25 w-25 mx-auto mb-2" />
                    <div className="text-lg text-white font-semibold">SERVICE</div>
                    <div className="text-sm text-white">We believe in giving back to the communities that have shaped us into the people we are today.</div>
                  </div>
                  {/* Unity */}
                  <div>
                    <img src={homeImages.unity} alt="Unity" className="h-25 w-25 mx-auto mb-2" />
                    <div className="text-lg text-white font-semibold">UNITY</div>
                    <div className="text-sm text-white">We strive to build our bonds and strengthen the brotherhood that we are proud of.</div>
                  </div>
                  {/* Knowledge */}
                  <div>
                    <img src={homeImages.knowledge} alt="Knowledge" className="h-25 w-25 mx-auto mb-2" />
                    <div className="text-lg text-white font-semibold">KNOWLEDGE</div>
                    <div className="text-sm text-white">We are scholars of diverse disciplines and professionals in varied industries.</div>
                  </div>
                </div>
              </div>
            </section>

            {/* GROUP PHOTO SECTION */}
            <section className="relative py-0 z-10">
              <div className="w-full">
                <div className="w-full h-[28rem] md:h-[33rem] overflow-hidden flex items-center justify-center">
                  <img src={homeImages.groupPhoto1} alt="AKPsi Group Photo" className="w-full h-full object-cover object-[center_35%]" />
                </div>
              </div>
            </section>

            {/* HERO DESCRIPTION SECTION */}
            <section className="relative z-10 flex items-center justify-center w-full min-h-[440px] md:min-h-[520px] py-16 md:py-24" style={{ background: 'none' }}>
              <div className="max-w-lg w-full px-6 md:px-12 flex flex-col items-start justify-center mx-auto">
                <h2 className={`text-white text-2xl md:text-4xl font-light mb-6 leading-snug text-left ${heroFont}`} style={{textShadow: '0 2px 16px rgba(0,0,0,0.25)'}}>
                  Alpha Kappa Psi <b>(ΑΚΨ)</b> is the nation&apos;s premier<br />
                  co-ed Business fraternity,<br />
                  providing mentorship and resources to students through programs, alumni networks, and much more.
                </h2>
                <a href="/about" className="mt-4 px-6 py-3 bg-white text-gray-900 font-semibold rounded shadow hover:bg-gray-100 transition-colors">LEARN MORE</a>
              </div>
            </section>

            {/* PRESIDENT'S MESSAGE SECTION */}
            <section className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full py-16 px-4 md:px-0 bg-white font-hero">
            <div className="flex-1 max-w-2xl w-full md:pr-12 text-black">
                <h3 className="text-5xl font-bold mb-8 leading-tight text-left">FROM<br />OUR PRESIDENT</h3>
                <p className="mb-4 text-base font-normal leading-relaxed text-left">Welcome! This is the website for the Nu Xi Chapter of Alpha Kappa Psi. Here, you can explore our values, who our brothers are, and how you can get involved. Before diving into the details, the brothers of the Nu Xi Chapter would like to thank you for your interest in our fraternity.</p>
                <p className="mb-4 text-base font-normal leading-relaxed text-left">Alpha Kappa Psi is a pre-professional student fraternity here at UC San Diego. We are built on the key values of Brotherhood, Knowledge, Integrity, Unity, and Service. The community you'll find here at Alpha Kappa Psi is unparalleled. Not only do our brothers strive towards their personal and professional aspirations, but we do so together, building genuine bonds that last us a lifetime.</p>
                <p className="mb-4 text-base font-normal leading-relaxed text-left">With that being said, we highly encourage you to explore our website to learn more about our fraternity, our brothers, and what we stand for. If you're interested in joining our community, we encourage you to come out to our upcoming Fall 2025 Rush. At Rush, you'll get the chance to meet the brothers and learn more about how this fraternity can help you grow both personally and professionally.</p>
                <div className="mt-6 text-base font-normal text-left">
                  Sincerely,<br />
                  {president ? president.name : 'Loading...'}
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center w-full max-w-xl mt-10 md:mt-0">
                {president ? (
                  <img src={president.imageUrl} alt={`${president.name} - President`} className="w-full max-w-md md:max-w-lg h-auto rounded-md object-cover scale-110" />
                ) : (
                  <div className="w-full max-w-md md:max-w-lg h-80 bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500">Loading president image...</span>
                  </div>
                )}
              </div>
            </section>

            {/* INDUSTRIES SECTION */}
            <section className="relative py-20 flex justify-center items-center">
              {/* Gradient overlay, same as values section */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none rounded-none"
                style={{
                  background: 'linear-gradient(50.498759152186665deg, rgba(243,226,214,0.96) 17.010498046875%, rgba(52,44,55,0.96) 70.611572265625%, #282634 100%, #262626 100%)'
                }}
              />
              <div className="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl mb-12 text-center text-white font-bold tracking-widest">OUR INDUSTRIES</h2>
                <div className="flex flex-col md:flex-row items-center justify-center w-full gap-12">
                  {/* Pie Chart Image with Overlayed Labels and Lines */}
                  <div className="relative flex-shrink-0 w-[480px] h-[480px] flex items-center justify-center">
                    <img src={homeImages.industryDistribution} alt="Industries Pie Chart" className="w-[360px] h-[360px] object-contain mx-auto" />
                    {/* SVG lines connecting labels to chart */}
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" width="480" height="480">
                      {/* 29% Business (vertical up, shifted left) */}
                      <line x1="192" y1="96" x2="192" y2="-10" stroke="white" strokeWidth="3" />
                      {/* 37% STEM (horizontal right) */}
                      <line x1="350" y1="192" x2="480" y2="192" stroke="white" strokeWidth="3" />
                      {/* 4% Political Science (horizontal left, moved down) */}
                      <line x1="96" y1="300" x2="-60" y2="320" stroke="white" strokeWidth="3" />
                      {/* 20% Design (points to middle of Design segment, lower left quadrant) */}
                      <line x1="160" y1="384" x2="-32" y2="480" stroke="white" strokeWidth="3" />
                      {/* 10% Finance & Accounting (horizontal right) */}
                      <line x1="296" y1="384" x2="480" y2="384" stroke="white" strokeWidth="3" />
                    </svg>
                    {/* Labels - positioned around the chart */}
                    {/* 29% Business */}
                    <span className="absolute text-white text-xl font-bold whitespace-nowrap" style={{left: '168px', top: '-30px'}}>29% Business</span>
                    {/* 37% STEM */}
                    <span className="absolute text-white text-xl font-bold whitespace-nowrap" style={{left: '500px', top: '175px'}}>37% STEM</span>
                    {/* 4% Political Science */}
                    <span className="absolute text-white text-xl font-bold whitespace-nowrap" style={{left: '-215px', top: '305px'}}>4% Political Science</span>
                    {/* 20% Design */}
                    <span className="absolute text-white text-xl font-bold whitespace-nowrap" style={{left: '-60px', top: '470px'}}>20% Design</span>
                    {/* 10% Finance & Accounting */}
                    <span className="absolute text-white text-xl font-bold whitespace-nowrap" style={{left: '490px', top: '370px'}}>10% Finance & Accounting</span>
                  </div>
                </div>
              </div>
            </section>

            {/* GROUP PHOTO 2 SECTION */}
            <section className="relative py-0 z-10">
              <div className="w-full">
                <div className="w-full  md:h-[35rem] overflow-hidden flex items-center justify-center">
                  <img src={homeImages.groupPhoto2} alt="AKPsi Group Photo 2" className="w-full h-full object-cover object-[center_40%]" />
                </div>
              </div>
            </section>

            {/* WHERE WE'RE AT SECTION */}
            <section className="relative py-16 bg-white z-10">
              <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10 tracking-widest text-gray-600">WHERE WE&apos;RE AT</h2>
              <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center px-4">
                {companies.length === 0 ? (
                  <div className="col-span-5 text-center text-gray-500">No companies found</div>
                ) : (
                  companies.map((company, index) => (
                    <img 
                      key={index}
                      src={company.imageUrl} 
                      alt={company.image_path ? company.image_path.replace('.png', '') : 'Company logo'} 
                      className="w-40 h-24 object-contain" 
                      onError={() => console.error('Image failed to load:', company.imageUrl)}
                    />
                  ))
                )}
              </div>
            </section>
          </>
        )}

        {/* Footer (includes social links and login) */}
        <Footer />
      </div>
    </div>
  );
}
