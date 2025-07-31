"use client";

import { useState, useEffect, useRef } from 'react';
import { createClient } from '../../../supabase/client';
import { colors } from '../../styles/colors';
import { fontCombinations } from '../../styles/fonts';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function Contact() {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [checkmarkAnimation, setCheckmarkAnimation] = useState(false);
  const checkmarkRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (submitted) {
      // Delay the checkmark animation to ensure it starts after the component renders
      const timer = setTimeout(() => {
        console.log('Starting checkmark animation');
        setShowCheckmark(true);
        // Start the animation after a short delay
        setTimeout(() => {
          setCheckmarkAnimation(true);
        }, 200);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const supabase = createClient();
        
        // Fetch background image directly from storage (same as executive page)
        console.log('Starting to fetch background image...');
        const { data: imageData } = supabase.storage
          .from('background')
          .getPublicUrl('background.jpeg');
        
        console.log('Background image URL:', imageData.publicUrl);
        setBackgroundImage(imageData.publicUrl);
      } catch (error) {
        console.error('Error fetching background:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBackground();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between contact-page">
      {/* Full Page Background */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat bg-black"
        style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
      />
      {/* Enhanced overlay with subtle gradient */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-gradient-to-br from-black/30 via-black/20 to-[#212121]/30" />
      <div className="relative z-20 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-16 px-4 mt-8 md:mt-12">
          {loading ? (
            <LoadingSpinner size="large" fullScreen={false} type="component" />
          ) : (
            <div className="max-w-4xl w-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-8 lg:p-12">
                <div className="mb-8">
                <h2 className={`text-3xl font-bold mb-8 text-center md:text-left ${colors.glass.text} ${fontCombinations.section.main}`}>Contact Us</h2>
                </div>

                {submitted ? (
                  <div className="text-center py-8">
                    {/* Animated Checkmark Circle */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#003366] to-[#6497B1] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-single-pulse-fade">
                      <svg 
                        ref={checkmarkRef}
                        className="w-8 h-8 text-white"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M5 13l4 4L19 7"
                          style={{
                            strokeDasharray: '20',
                            strokeDashoffset: checkmarkAnimation ? '0' : '20',
                            transition: checkmarkAnimation ? 'stroke-dashoffset 0.8s ease-in-out' : 'none'
                          }}
                        />
                      </svg>
                    </div>
                    
                    {/* Animated Text */}
                    <div className="space-y-4">
                      <h2 
                        className={`text-2xl font-semibold ${colors.text.primary} ${fontCombinations.section.main} mb-4 opacity-0 animate-fadeIn`}
                        style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
                      >
                        Thank you for your message!
                      </h2>
                      <p 
                        className={`${colors.text.secondary} ${fontCombinations.content.body} opacity-0 animate-fadeIn`}
                        style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
                      >
                        We&apos;ll get back to you soon.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* First Name and Last Name on same row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* First Name Input */}
                      <div>
                        <label htmlFor="firstName" className={`block text-sm mb-2 ${colors.glass.text} ${fontCombinations.navigation.secondary}`}>
                          First Name
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          className={`appearance-none rounded-lg relative block w-full px-4 py-3 border-2 ${colors.glass.border} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] text-base ${fontCombinations.content.body} ${colors.glass.bg} shadow-lg transition-all duration-200`}
                          placeholder="Enter your first name"
                        />
                      </div>

                      {/* Last Name Input */}
                      <div>
                        <label htmlFor="lastName" className={`block text-sm mb-2 ${colors.glass.text} ${fontCombinations.navigation.secondary}`}>
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          className={`appearance-none rounded-lg relative block w-full px-4 py-3 border-2 ${colors.glass.border} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] text-base ${fontCombinations.content.body} ${colors.glass.bg} shadow-lg transition-all duration-200`}
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="email" className={`block text-sm mb-2 ${colors.glass.text} ${fontCombinations.navigation.secondary}`}>
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className={`appearance-none rounded-lg relative block w-full px-4 py-3 border-2 ${colors.glass.border} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] text-base ${fontCombinations.content.body} ${colors.glass.bg} shadow-lg transition-all duration-200`}
                        placeholder="Enter your email"
                      />
                    </div>

                  {/* Message Input - Extended horizontally */}
                  <div>
                    <label htmlFor="message" className={`block text-sm mb-2 ${colors.glass.text} ${fontCombinations.navigation.secondary}`}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className={`appearance-none rounded-lg relative block w-full px-4 py-3 border-2 ${colors.glass.border} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] text-base ${fontCombinations.content.body} ${colors.glass.bg} shadow-lg transition-all duration-200 resize-none`}
                      placeholder="Enter your message"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className={`group relative w-full flex justify-center py-4 px-8 border-2 border-[#B89334] hover:border-[#D4AF37] rounded-xl bg-gradient-to-r from-[#B89334] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B89334] text-[#F8F8F8] transition-all duration-300 shadow-lg hover:shadow-2xl backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:ring-offset-2 cursor-pointer ${fontCombinations.interactive.primary} transform hover:scale-105 active:scale-95`}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
                )}
              </div>
            </div>
          )}
        </main>
        {!loading && <Footer />}
      </div>
    </div>
  );
}