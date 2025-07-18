"use client";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50 to-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Contact Us Heading */}
        <h1 className="text-3xl font-bold text-black text-center mb-8">
          Contact Us
        </h1>
        
        {/* Contact Form */}
        <form className="space-y-6">
          {/* First Name and Last Name Row */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-black mb-2">
                First Name
              </label>
              <div className="border-b border-black pb-1">
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-black placeholder-gray-500"
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-black mb-2">
                Last Name
              </label>
              <div className="border-b border-black pb-1">
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-black placeholder-gray-500"
                  placeholder=""
                />
              </div>
            </div>
          </div>
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Email *
            </label>
            <div className="border-b border-black pb-1">
              <input
                type="email"
                required
                className="w-full bg-transparent outline-none text-black placeholder-gray-500"
                placeholder=""
              />
            </div>
          </div>
          
          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Write a message
            </label>
            <div className="border-b border-black pb-1">
              <textarea
                rows={4}
                className="w-full bg-transparent outline-none text-black placeholder-gray-500 resize-none"
                placeholder=""
              ></textarea>
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
} 