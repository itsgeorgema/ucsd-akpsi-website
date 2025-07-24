'use client';
import { useState, useEffect, use } from 'react';
import { akpsiColors } from '../../../styles/colors';
import { akpsiFonts } from '../../../styles/fonts';
import Footer from '../../../components/Footer';
import { createClient } from '../../../../supabase/client'; // make sure your client is configured
import { url } from 'inspector';
import Link from 'next/link';

export default function ExecutiveCommittee() {

  type ecomMember = {name: string, image_path: string, pronouns: string, position: string, location: string, bio: string, linkedin: string, imageUrl?: string} 
  

    const [ecom, setEcom] = useState<ecomMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchEcom = async () => {
        const supabase = await createClient();
        const { data, error } = await supabase
          .from('ecomm-spring-25') // replace with your actual table name
          .select('*');

        if (error) {
          console.error('Error fetching ECOM data:', error);
        } else {
          // For each member, get the public image URL from storage
          const ecomWithImages = data.map((member: ecomMember) => {
            const { data: publicUrlData } = supabase
              .storage
              .from('brothers-spring25')
              .getPublicUrl(member.image_path);
            return {
              ...member,
              imageUrl: publicUrlData?.publicUrl || '',
            };
          });
          setEcom(ecomWithImages);
        }

        setLoading(false);
      };

      fetchEcom();
    }, []);

  return (
    <div className={`relative w-full flex flex-col items-center justify-center min-h-screen ${akpsiColors.mainBg} mt-30`}>
      
      <div 
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/brothers/brothersPageBackground.jpg')" }}
      />

      {/* Overlay for readability */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-black/40" />
      <div className="relative z-20 flex flex-col min-h-screen justify-between">

      
        <div className="text-center">
          <h2 className={`text-3xl md:text-4xl mb-10 text-center text-white font-bold`}>
            Executive Committee
          </h2>

          
          <div className="flex flex-col items-center">
            {ecom.map((member) => (
              <div
                key={member.name}
                className="flex bg-white rounded-xl shadow-md p-6 transition hover:shadow-lg"
              >
                <div>
                  <img src={member.imageUrl} alt={member.name} />
                </div>
                <div>
                <h2 className="text-xl text-gray-700 font-bold">{member.name}</h2>
                <p className="text-sm text-gray-700">{member.pronouns}</p>
                <p className="text-blue-600 font-semibold">{member.position}</p>
                <p className="text-sm text-gray-700 italic">{member.location}</p>
                <p className="mt-2 text-gray-700">{member.bio}</p>
                <button 
                className="inline-block border-2 border-color-black px-10 py-2 font-semibold text-sm text-gray-700 hover: bg-black-700"
                ><Link href={member.linkedin}>LinkedIn</Link>
                </button>
                </div>

              </div>
            ))}
          </div>

        </div>
        <Footer />
      </div>

    </div>
  );
}
