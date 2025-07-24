'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '../../../../../supabase/client';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';

interface Brother {
  name: string;
  pronouns: string;
  location: string;
  bio: string;
  linkedin: string;
  imageUrl: string;
}

export default function BrotherPage() {
  const [brother, setBrother] = useState<Brother | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const name = Array.isArray(params.name) ? params.name[0] : params.name;

  useEffect(() => {
    if (!name) return;

    const fetchBrother = async () => {
      try {
        const supabase = createClient();
        const decodedName = decodeURIComponent(name);
        
        const { data, error } = await supabase
          .from('actives-spring25')
          .select('*')
          .eq('name', decodedName)
          .single();

        if (error) {
          console.error('Error fetching brother:', error);
          setBrother(null);
        } else if (data) {
          const { data: imageData } = supabase.storage
            .from('brothers-spring25')
            .getPublicUrl(data.image_path);

          setBrother({
            name: data.name,
            pronouns: data.pronouns,
            location: data.location,
            bio: data.bio,
            linkedin: data.linkedin,
            imageUrl: imageData.publicUrl,
          });
        }
      } catch (error) {
        console.error('Error:', error);
        setBrother(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBrother();
  }, [name]);

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
        <main className="flex-1 flex items-center justify-center py-16">
          {loading && <div className="flex items-center justify-center min-h-screen text-white text-xl">Loading...</div>}
          {!loading && !brother && <div className="flex items-center justify-center min-h-screen text-white text-xl">Brother not found.</div>}
          {!loading && brother && (
            <div className="flex w-full gap-8 items-center">
              {/* Large Profile Image on Left */}
              <div className="flex-shrink-0 ml-8">
                <img 
                  src={brother.imageUrl} 
                  alt={brother.name} 
                  className="w-96 h-[600px] object-cover object-top shadow-2xl" 
                />
              </div>
              
              {/* White Overlay Content on Right */}
              <div className="flex-1 bg-white/95 backdrop-blur-sm p-12 shadow-2xl mr-0">
                <div className="mb-4">
                  <span className="text-sm text-gray-600 uppercase tracking-wide font-medium">Brother</span>
                </div>
                <h1 className="text-4xl font-light text-gray-900 mb-2">{brother.name}</h1>
                <div className="text-lg text-gray-700 mb-1 font-medium">{brother.pronouns}</div>
                <div className="text-lg text-gray-700 mb-8 font-medium">{brother.location}</div>
                
                <div className="text-base text-gray-800 leading-relaxed whitespace-pre-line font-normal">
                  {brother.bio}
                </div>
                
                {/* LinkedIn Button */}
                <div className="mt-8">
                  {brother.linkedin ? (
                    <a 
                      href={brother.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      LinkedIn
                    </a>
                  ) : (
                    <button className="px-4 py-2 border border-gray-300 text-gray-400 text-sm font-medium cursor-not-allowed" disabled>
                      LinkedIn
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
} 