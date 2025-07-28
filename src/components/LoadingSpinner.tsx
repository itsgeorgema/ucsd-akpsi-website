'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '../../supabase/client';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  type?: 'navigation' | 'form' | 'component';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'large', 
  fullScreen = true,
  type = 'component'
}) => {
  const [spinnerUrl, setSpinnerUrl] = useState('');

  useEffect(() => {
    const fetchSpinner = async () => {
      try {
        const supabase = createClient();
        const { data: spinnerData } = supabase.storage
          .from('misc')
          .getPublicUrl('akpsiSpinner.png');
        
        setSpinnerUrl(spinnerData?.publicUrl || '');
      } catch (error) {
        console.error('Error fetching spinner:', error);
      }
    };

    fetchSpinner();
  }, []);

  const containerClasses = fullScreen 
    ? "fixed top-16 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-background/95 backdrop-blur-lg z-40"
    : "flex items-center justify-center w-full h-full";

  return (
    <div className={containerClasses} data-loading-type={type}>
      {/* spinning logo */}
      <Image
        src={spinnerUrl || '/akpsiLogo.png'}
        alt="Loading..."
        className={`${size === 'large' ? 'h-24 w-24' : size === 'medium' ? 'h-16 w-16' : 'h-8 w-8'} animate-spin`}
        width={96}
        height={96}
      />
    </div>
  );
};

export default LoadingSpinner;