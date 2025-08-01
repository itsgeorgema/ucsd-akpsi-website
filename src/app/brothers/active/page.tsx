'use client';
import { useState, useEffect } from 'react';
import { createClient } from '../../../../supabase/client';
import { usePathname } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Link from 'next/link';
import { fontCombinations } from '../../../styles/fonts';
import { colors } from '../../../styles/colors';


export default function ActiveBrothers() {
  const [brothers, setBrothers] = useState<Array<{ name: string; imageUrl: string }>>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = await createClient();
        
        // Fetch background image directly from storage
        console.log('Starting to fetch background image...');
        const { data: imageData } = supabase.storage
          .from('background')
          .getPublicUrl('background.jpeg');
        
        console.log('Background image URL:', imageData.publicUrl);
        setBackgroundImage(imageData.publicUrl);
        
        // Fetch brothers data
        const { data, error } = await supabase
          .from('actives-spring25')
          .select('image_path, name')
          .order('name', { ascending: true });
        if (error || !data || data.length === 0) {
          console.log('No data or error fetching from actives-spring25');
          setBrothers([]);
        } else {
          const brothersWithUrls = data.map((row: { image_path: string; name: string }) => {
            const { data: publicUrlData } = supabase
              .storage
              .from('brothers-spring25')
              .getPublicUrl(row.image_path);
            return {
              name: row.name,
              imageUrl: publicUrlData?.publicUrl || '',
            };
          });
          setBrothers(brothersWithUrls);
        }
      } catch (error) {
        console.error('Error:', error);
        setBrothers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pathname]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Full Page Background */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat bg-black"
        style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
      />
      {/* Overlay for readability */}
      <div className={`fixed top-0 left-0 w-full h-full z-10 bg-black/30`} />
      <div className="relative z-20 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          {loading ? (
            <LoadingSpinner size="large" fullScreen={false} type="component" />
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="text-center mb-8 mt-8 md:mt-12">
                <div className={`text-sm tracking-tighter mb-2 ${colors.text.inverse} ${fontCombinations.navigation.secondary}`}>INTRODUCING OUR</div>
                <h1 className={`text-5xl lg:text-6xl ${fontCombinations.hero.title} ${colors.text.inverse} mb-4`}>ACTIVE BROTHERS</h1>
              </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
              {brothers.map((brother, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <Link href={`/brothers/active/${encodeURIComponent(brother.name.replace(/\s/g, ""))}`}>
                    <div className="w-72 h-96 rounded-sm overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                      <img
                        src={brother.imageUrl}
                        alt={brother.name}
                        className="w-full h-full object-cover object-center scale-110"
                      />
                    </div>
                  </Link>
                  <span className={`text-lg mt-2 text-white ${fontCombinations.section.tertiary}`}>{brother.name}</span>
                </div>
              ))}
            </div>
          </div>
          )}
        </main>
        {!loading && <Footer />}
      </div>
    </div>
  );
} 