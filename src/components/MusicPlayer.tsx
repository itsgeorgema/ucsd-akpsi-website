'use client';

import { useEffect, useRef, useState } from 'react'
import { createClient } from '../../supabase/client'

const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

export const MusicPlayer = () => {

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [musicUrl, setMusicUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchMusicUrl = async () => {         
            const { data } = await supabase
                .storage
                .from('misc')
                .getPublicUrl('KSI - Thick Of It (Lyrics) ft. Trippie Redd.mp3')

            if (!data.publicUrl) {
                console.error('Public URL not found');
            } else {
                setMusicUrl(data.publicUrl);
            }
        };

        fetchMusicUrl();

    }, []);

      const handlePlayMusic = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <button
            className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 transition duration-300"
            onClick={handlePlayMusic}
            disabled={!musicUrl}
            >
            {musicUrl ? "Enter Site & Play Music" : "Loading..."}
            </button>

            {musicUrl && (
            <audio ref={audioRef} src={musicUrl} loop />
            )}
        </div>
    )
}
