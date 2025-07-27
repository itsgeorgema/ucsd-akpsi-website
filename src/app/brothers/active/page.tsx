'use client';
import { useState, useEffect } from 'react';
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
    <div className="relative min-h-screen flex flex-col">
      {/* Full Page Background */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/brothers/brothersBackground.jpg)" }}
      />
      {/* Overlay for readability */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-black/30" />
      <div className="relative z-20 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-center mt-35">
            <div className="text-center mb-2">
              <div className="text-white text-sm tracking-widest mb-2">INTRODUCING OUR</div>
              <h1 className="text-5xl font-bold text-white tracking-wide mb-8">ACTIVE BROTHERS</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
              {brothers.map((brother, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <Link href={`/brothers/active/${encodeURIComponent(brother.name)}`}>
                    <div className="w-80 h-110 rounded-sm overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                      <img
                        src={brother.imageUrl}
                        alt={brother.name}
                        className="w-full h-full object-cover object-center scale-110"
                      />
                    </div>
                  </Link>
                  <span className="text-lg font-semibold mt-2 text-white" style={{fontFamily: 'Montserrat, Arial, Helvetica, sans-serif'}}>{brother.name}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
} 