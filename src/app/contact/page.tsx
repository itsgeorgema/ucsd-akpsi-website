"use client";

import { akpsiColors } from '../../styles/colors';
import { akpsiFonts } from '../../styles/fonts';

export default function Contact() {
  return (
    <div className={`min-h-screen bg-gradient-to-b ${akpsiColors.orangeGradient} flex items-center justify-center py-12 px-4`}>
      {/* Contact Us Heading */}
      <h1 className={`text-3xl text-center mb-8 ${akpsiColors.black} ${akpsiFonts.sectionTitleFont}`}>
        Contact Us
      </h1>
      
      {/* Contact Form */}
      <form className="space-y-6">
        {/* First Name and Last Name Row */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className={`block text-sm mb-2 ${akpsiColors.black} ${akpsiFonts.sectionTextFont}`}>
              First Name
            </label>
            <div className={`border-b pb-1 ${akpsiColors.black}`}>
              <input
                type="text"
                className={`w-full bg-transparent outline-none ${akpsiColors.black} placeholder-gray-500`}
                placeholder=""
              />
            </div>
          </div>
          <div className="flex-1">
            <label className={`block text-sm mb-2 ${akpsiColors.black} ${akpsiFonts.sectionTextFont}`}>
              Last Name
            </label>
            <div className={`border-b pb-1 ${akpsiColors.black}`}>
              <input
                type="text"
                className={`w-full bg-transparent outline-none ${akpsiColors.black} placeholder-gray-500`}
                placeholder=""
              />
            </div>
          </div>
        </div>
        
        {/* Email Field */}
        <div>
          <label className={`block text-sm mb-2 ${akpsiColors.black} ${akpsiFonts.sectionTextFont}`}>
            Email *
          </label>
          <div className={`border-b pb-1 ${akpsiColors.black}`}>
            <input
              type="email"
              required
              className={`w-full bg-transparent outline-none ${akpsiColors.black} placeholder-gray-500`}
              placeholder=""
            />
          </div>
        </div>
        
        {/* Message Field */}
        <div>
          <label className={`block text-sm mb-2 ${akpsiColors.black} ${akpsiFonts.sectionTextFont}`}>
            Write a message
          </label>
          <div className={`border-b pb-1 ${akpsiColors.black}`}>
            <textarea
              rows={4}
              className={`w-full bg-transparent outline-none ${akpsiColors.black} placeholder-gray-500 resize-none`}
              placeholder=""
            ></textarea>
          </div>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 px-6 rounded-full font-medium transition-colors bg-black text-white hover:bg-gray-800`}
        >
          Submit
        </button>
      </form>
    </div>
  );
} 