"use client";

import { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { akpsiColors } from '../../styles/colors';
import { akpsiFonts } from '../../styles/fonts';

export default function Recruitment() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false immediately when component mounts
    // This will be replaced with actual data fetching logic later
    setLoading(false);
  }, []);

  return (
    <div className={`flex items-center justify-center min-h-screen ${akpsiColors.mainBg}`}>
      {loading ? (
        <LoadingSpinner size="large" fullScreen={false} type="component" />
      ) : (
        <div className="text-center">
          <h1 className={`text-4xl mb-4 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
            Recruitment
          </h1>
        </div>
      )}
    </div>
  );
} 