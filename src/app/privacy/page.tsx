'use client';
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Privacy() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-black" />
      <div className="relative z-20 min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        {!mounted||isLoading?(
            <LoadingSpinner size="large" fullScreen={false} type="component" />):(

      <div className="flex-grow items-center justify-center">
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-lg">Last updated: August 1, 2025</p>
        </div>
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">1. Introduction</h2>
        </div>
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">2. Use of the Website</h2>
        </div>
      </div>
      )}</main>
      </div>
    </div>
  );
}