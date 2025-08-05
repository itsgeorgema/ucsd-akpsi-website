import React from 'react';
import Image from 'next/image';
import loadingImage from '../../public/assets/spinner.svg';

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
  const containerClasses = fullScreen 
    ? "fixed top-16 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-background/95 backdrop-blur-lg z-40"
    : "flex items-center justify-center w-full h-full";

  return (
    <div className={containerClasses} data-loading-type={type}>
      {/* spinning logo */}
      <Image
        src={loadingImage}
        alt="Loading..."
        className={`${size === 'large' ? 'h-24 w-24' : size === 'medium' ? 'h-16 w-16' : 'h-8 w-8'} animate-spin`}
        width={96}
        height={96}
      />
    </div>
  );
};

export default LoadingSpinner;