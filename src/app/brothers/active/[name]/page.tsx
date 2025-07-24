'use client';

import { createClient } from '../../../../../supabase/client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';

type Brother = {
  name: string;
  imageUrl: string;
  pronouns?: string;
  position?: string;
  location?: string;
  desc?: string;
};

export default function BrotherBio() {
  const { name: rawName } = useParams();
  const name = decodeURIComponent(rawName as string);
  const [brother, setBrother] = useState<Brother | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrother = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('actives-spring25')
        .select('*')
        .eq('name', name)
        .single();
      if (!error && data) {
        const { data: publicUrlData } = supabase
          .storage
          .from('brothers-spring25')
          .getPublicUrl(data.image_path);
        setBrother({ ...data, imageUrl: publicUrlData?.publicUrl || '' });
      }
      setLoading(false);
    };
    fetchBrother();
  }, [name]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!brother) return <div className="flex items-center justify-center min-h-screen">Brother not found.</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center">
        <img src={brother.imageUrl} alt={brother.name} className="w-80 h-80 object-contain mb-4" />
        <h1 className="text-3xl font-bold mb-2">{brother.name}</h1>
        <div className="text-lg mb-2">{brother.pronouns}</div>
        <div className="text-lg mb-2">{brother.position}</div>
        <div className="text-lg mb-2">{brother.location}</div>
        <div className="max-w-xl text-center text-base mt-4">{brother.bio}</div>
      </main>
      <Footer />
    </div>
  );
} 