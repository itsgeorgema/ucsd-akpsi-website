'use client';
import { useState, useEffect } from 'react';
import { createClient } from '../../../../supabase/client';
import { usePathname } from 'next/navigation';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Link from 'next/link';
import { fontCombinations } from '../../../styles/fonts';
import { colors } from '../../../styles/colors';
import BouncyFadeIn from '../../../components/BouncyFadeIn';
import { useResponsiveColumns } from '../../../hooks/useResponsiveColumns';
import Image from 'next/image';


export default function ActiveBrothers() {
  const [brothers, setBrothers] = useState<Array<{ name: string; imageUrl: string }>>([]);
  const backgroundImage = '/assets/sunsetBackground.jpeg';
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const columns = useResponsiveColumns(
    [
      { minWidth: 768, columns: 4 }, // md and up
      { minWidth: 640, columns: 2 }, // sm and up
    ],
    1,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = await createClient();
        
        // Fetch brothers data
        const { data, error } = await supabase
          .from('actives-fall25')
          .select('image_path, name')
          .order('name', { ascending: true });
        if (error || !data || data.length === 0) {
          setBrothers([]);
        } else {
          const brothersWithUrls = data.map((row: { image_path: string; name: string }) => {
            return {
              name: row.name,
              imageUrl: `/brothers/${row.image_path}`,
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

  // columns is memoized & updated efficiently by the hook

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
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          {loading ? (
            <LoadingSpinner size="large" fullScreen={false} type="component" />
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="text-center mb-8 mt-8 md:mt-12">
                <div className={`text-sm tracking-tighter mb-2 ${colors.text.inverse} ${fontCombinations.navigation.secondary}`}>INTRODUCING OUR</div>
                <h1 className={`text-5xl lg:text-6xl ${fontCombinations.hero.title} ${colors.text.inverse} mb-4`}>ACTIVE BROTHERS</h1>
              </div>
            <div className="flex flex-wrap justify-center gap-10">
              {brothers.map((brother, idx) => {
                const colIndex = columns > 0 ? idx % columns : 0;
                const delay = colIndex * 0.06;
                return (
                <BouncyFadeIn key={idx} delay={delay} bounce={0} threshold={0}>
                <div className="flex flex-col items-center">
                  <Link href={`/brothers/active/${encodeURIComponent(brother.name.replace(/\s/g, ""))}`}>
                    <div className="w-72 h-96 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                      <div className="relative w-full h-full">
                        <Image
                          src={brother.imageUrl}
                          alt={brother.name}
                          fill
                          sizes="(max-width: 768px) 288px, 288px"
                          className="object-cover object-center scale-110"
                        />
                      </div>
                    </div>
                  </Link>
                  <span className={`text-lg mt-2 text-white ${fontCombinations.section.tertiary}`}>{brother.name}</span>
                </div>
                </BouncyFadeIn>
              );})}
            </div>
          </div>
          )}
        </main>
      </div>
    </div>
  );
} 