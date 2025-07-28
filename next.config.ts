import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    //allow all images from supabase
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'djekvaceqwddsizsrazo.supabase.co', 
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
