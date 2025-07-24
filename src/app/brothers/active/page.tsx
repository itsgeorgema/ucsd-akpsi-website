'use client';
import { useState, useEffect, use } from 'react';
import { akpsiColors } from '../../../styles/colors';
import { akpsiFonts } from '../../../styles/fonts';


export default function ActiveBrothers() {

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

        </div>

      </div>
    </div>
  );
} 