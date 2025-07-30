"use client";

import { colors } from '../../styles/colors';
import { akpsiFonts } from '../../styles/fonts';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F8F8] via-[#B3CDE0]/20 to-[#D4AF37]/10 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#B89334] via-transparent to-[#6497B1]"></div>
      </div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="bg-gradient-to-br from-[#F8F8F8]/95 to-[#B3CDE0]/10 backdrop-blur-xl rounded-3xl border border-[#B3CDE0]/30 shadow-2xl p-8">
          {/* Contact Us Heading */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className={`inline-block px-4 py-2 ${colors.text.accent} bg-[#B89334]/10 rounded-full text-sm font-semibold uppercase tracking-wide border border-[#B89334]/20`}>Get In Touch</span>
            </div>
            <h1 className={`text-3xl text-center mb-4 bg-gradient-to-r from-[#003366] to-[#6497B1] bg-clip-text text-transparent ${akpsiFonts.sectionTitleFont} font-bold`}>
              Contact Us
            </h1>
            <p className={`text-sm ${colors.text.secondary} ${akpsiFonts.bodyFont}`}>We&apos;d love to hear from you</p>
          </div>

          {/* Form Container */}
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className={`block text-sm mb-3 ${colors.text.primary} ${akpsiFonts.sectionTextFont} font-semibold`}>
                Full Name
              </label>
              <div className="border-2 border-[#E0E0E0] focus-within:border-[#D4AF37] rounded-lg p-3 bg-gradient-to-r from-[#F8F8F8] to-[#F8F8F8]/50 transition-all duration-300">
                <input
                  type="text"
                  className={`w-full bg-transparent outline-none ${colors.text.primary} placeholder-[#9E9E9E] ${akpsiFonts.bodyFont}`}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className={`block text-sm mb-3 ${colors.text.primary} ${akpsiFonts.sectionTextFont} font-semibold`}>
                Email Address
              </label>
              <div className="border-2 border-[#E0E0E0] focus-within:border-[#D4AF37] rounded-lg p-3 bg-gradient-to-r from-[#F8F8F8] to-[#F8F8F8]/50 transition-all duration-300">
                <input
                  type="email"
                  className={`w-full bg-transparent outline-none ${colors.text.primary} placeholder-[#9E9E9E] ${akpsiFonts.bodyFont}`}
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Message Input */}
            <div>
              <label className={`block text-sm mb-3 ${colors.text.primary} ${akpsiFonts.sectionTextFont} font-semibold`}>
                Message
              </label>
              <div className="border-2 border-[#E0E0E0] focus-within:border-[#D4AF37] rounded-lg p-3 bg-gradient-to-r from-[#F8F8F8] to-[#F8F8F8]/50 transition-all duration-300">
                <textarea
                  rows={4}
                  className={`w-full bg-transparent outline-none ${colors.text.primary} placeholder-[#9E9E9E] ${akpsiFonts.bodyFont} resize-none`}
                  placeholder="Enter your message"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button className="bg-gradient-to-r from-[#B89334] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B89334] text-[#F8F8F8] px-8 py-4 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}