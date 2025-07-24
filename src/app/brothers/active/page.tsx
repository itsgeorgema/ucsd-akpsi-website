'use client';
import { useState, useEffect } from 'react';
import { akpsiColors } from '../../../styles/colors';
import { akpsiFonts } from '../../../styles/fonts';
import { createClient } from '../../../../supabase/client';
import { usePathname } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';


export default function ActiveBrothers() {
  const [brothers, setBrothers] = useState<Array<{ name: string; imageUrl: string }>>([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchImages = async () => {
      const supabase = await createClient();
      
      const { data, error } = await supabase
        .from('actives-spring25')
        .select('image_path, name')
        .order('name', { ascending: true });
      if (error || !data || data.length === 0) {
        console.log('No data or error fetching from actives-spring25');
        return;
      }
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
    };
    fetchImages();
  }, [pathname]);

  return (
    <div className={`${akpsiColors.mainBg} min-h-screen flex flex-col`}>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center w-full">
          <h1 className={`text-4xl mb-4 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
            Active Brothers
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
            {brothers.map((brother, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <Link href={`/brothers/active/${encodeURIComponent(brother.name)}`}>
                  <img
                    src={brother.imageUrl}
                    alt={brother.name}
                    className="w-80 h-80 object-contain cursor-pointer hover:scale-105 transition-transform"
                  />
                </Link>
                <span className="text-lg font-semibold mt-2">{brother.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 