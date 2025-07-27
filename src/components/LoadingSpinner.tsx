import React from 'react';
import Image from 'next/image';
import loadingImage from './akpsilogo.png';

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
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-16 w-16', 
    large: 'h-24 w-24'
  };

  const containerClasses = fullScreen 
    ? "fixed top-16 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-background/95 backdrop-blur-lg z-40"
    : "flex flex-col items-center justify-center p-8";

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
      
      {/* Loading text with typing animation */}
      {fullScreen && (
        <div className="mt-8 space-y-2 text-center">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-lg font-medium text-foreground">Loading</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;