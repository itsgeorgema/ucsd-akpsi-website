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

      
        <div className="">
          <h2 className={`text-3xl md:text-4xl mb-10 text-center text-white font-bold`}>
            EXECUTIVE COMMITTEE
          </h2>

          
          <div className="w-screen flex flex-col items-center">
            {ecom.map((member) => (
              <div
                key={member.name}
                className="flex w-full h-[1100px] bg-white shadow-md transition hover:shadow-lg"
              >
                <div className="w-1/3 h-full">
                  <img className="w-full h-full object-cover" src={member.imageUrl} alt={member.name} />
                </div>
                <div className="flex flex-col w-2/3 space-y-4 h-full px-10 py-6">
                  <p className="text-black">{member.position}</p>
                  <h2 className="text-5xl text-black">{member.name}</h2>
                  <p className="text-sm text-black italic">{member.pronouns}</p>
                  <p className="text-sm text-black italic">{member.location}</p>
                  <p className="mt-2 text-black">{member.bio}</p>
                  <Link href={member.linkedin}> 
                    <button 
                    className="cursor-pointer w-[140px] flex border-2 border-color-black px-10 py-2 text-sm text-black transition duration-250 hover:bg-black hover:text-white"
                    >LinkedIn
                    </button>
                  </Link>
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
