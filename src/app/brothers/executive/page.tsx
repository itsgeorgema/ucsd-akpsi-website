'use client';
import { useState, useEffect, use } from 'react';
import { akpsiColors } from '../../../styles/colors';
import { akpsiFonts } from '../../../styles/fonts';

export default function ExecutiveCommittee() {
  return (
    <div className={`flex items-center justify-center min-h-screen ${akpsiColors.mainBg}`}>
      <div className="text-center">
        <h1 className={`text-4xl mb-4 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
          Executive Committee
        </h1>
      </div>
    </div>
  );
} 