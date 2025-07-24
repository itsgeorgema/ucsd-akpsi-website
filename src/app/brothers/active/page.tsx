'use client';
import { useState, useEffect } from 'react';
import { akpsiColors } from '../../../styles/colors';
import { akpsiFonts } from '../../../styles/fonts';
import { createClient } from '../../../../supabase/client';
import { usePathname } from 'next/navigation';


export default function ActiveBrothers() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchImage = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('actives-spring25')
        .select('image_path, name')
        .order('name', { ascending: true });
      console.log('Supabase table fetch (all rows, sorted by name):', { data, error });
      if (error || !data || data.length === 0) {
        console.log('No data or error fetching from actives-spring25');
        return;
      }
      const firstImagePath = data[0].image_path;
      const { data: publicUrlData } = supabase
        .storage
        .from('brothers-spring25')
        .getPublicUrl(firstImagePath);
      setImageUrl(publicUrlData?.publicUrl || null);
    };
    fetchImage();
  }, [pathname]);

  {/* these will be pulled from the database*/}
  const ecom = [
    {name: "", pronouns: "", position: "", location: "", desc: ""} 
  ]
  return (
    <div className={`flex items-center justify-center min-h-screen ${akpsiColors.mainBg}`}>
      <div className="text-center">
        <h1 className={`text-4xl mb-4 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
          Active Brothers
        </h1>

        <div className="flex flex-col items-center">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="Active Brother" 
              className="w-48 h-48 object-cover rounded-full mb-4"
              onClick={() => console.log('hello')}
            />
          )}
        </div>

      </div>
    </div>
  );
} 