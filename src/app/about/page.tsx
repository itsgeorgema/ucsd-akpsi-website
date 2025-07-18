"use client";

import ScrollArrow from '../../components/ScrollArrow';

export default function About() {
  return (
    <div className="relative">
      {/* Full Page Background */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/about/aboutBackground.jpg)',
        }}
      />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center z-10">
        {/* Crest/Logo */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8">
            <img src="/about/crest.png" alt="AKPsi Crest" className="object-contain w-72 h-80 mx-auto" />
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">OUR HISTORY</h1>
          <p className="text-white text-xl md:text-2xl mb-12 drop-shadow-lg max-w-3xl mx-auto font-medium">
            Learn more about the Nu Xi Chapter and the history of our fraternity.
          </p>
          <ScrollArrow />
        </div>
      </section>

      {/* What is Alpha Kappa Psi Section */}
      <section id="akpsi-info" className="relative py-20 bg-white z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">WHAT IS ALPHA KAPPA PSI (AKΨ)?</h2>
          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              Founded on October 5, 1904, at New York University, Alpha Kappa Psi is the world's oldest and largest business fraternity. 
              AKPsi was founded by "Brooklyn Four" --- George L. Bergen, Howard M. Jefferson, Nathan Lane Jr., and Frederic R. Leach --- 
              with the purpose of developing its members into principled business leaders. Every night, the founding fathers would walk 
              home together on the Brooklyn Bridge and as their brotherhood grew stronger, it encouraged them to begin an outline for 
              the future of their organization.
            </p>
            <p>
              Alpha Kappa Psi is a Professional, Co-ed Business Fraternity that is open to all majors. This professional organization 
              currently has over 298,000 initiated members at 219 universities in 4 countries. With an extensive network of alumni, 
              members have access to countless opportunities and are prepared for a life of success.
            </p>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="relative py-0 bg-gray-50 z-10">
        <div className="w-full">
          <div className="w-full h-[36rem] rounded-none overflow-hidden flex items-center justify-center">
            <img src="/about/group-about.jpg" alt="Group Photo About Page" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* About Nu Xi Chapter Section */}
      <section className="relative py-20 bg-white z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">ABOUT THE NU XI CHAPTER</h2>
          <h3 className="text-2xl font-semibold text-center text-blue-800 mb-12">UNIVERSITY OF CALIFORNIA - SAN DIEGO</h3>
          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              Located in the sunny town of La Jolla, the Nu Xi (NΞ) Chapter brings the values of Alpha Kappa Psi to the UC San Diego campus. 
              Established in 2019, the chapter has grown its presence on-campus and is continuing to develop an extensive alumni network in 
              numerous different industries. Our Brothers gain professional mentorship from industry-experienced individuals and reach their 
              career aspirations with tools and resources offered by the fraternity. Alpha Kappa Psi offers an equal opportunity to individuals 
              in all academic departments.
            </p>
            <p>
              Beyond the professionalism, our Brothers are able to create lifelong friendships and find a community away from home. 
              Alpha Kappa Psi welcomes individuals from all backgrounds and embraces the diverse student population. Our Brothers inspire 
              and help each other pursue our greatest dreams. We congratulate each other on our victories, but more importantly, we are 
              there for each other through our defeats. More than an organization, we build each other up as a family.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter Statistics */}
      <section className="relative py-20 bg-white z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16">NU XI CHAPTER STATISTICS</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Gender Statistics */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-900 mb-8">GENDER</h3>
              <div className="w-64 h-64 bg-gray-200 rounded-full mx-auto flex items-center justify-center mb-4">
                <span className="text-gray-500 text-lg">Gender Distribution Chart</span>
              </div>
            </div>
            {/* Grade Level Statistics */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-900 mb-8">GRADE LEVEL</h3>
              <div className="w-64 h-64 bg-gray-200 rounded-full mx-auto flex items-center justify-center mb-4">
                <span className="text-gray-500 text-lg">Grade Level Distribution Chart</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 bg-white z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-4xl font-bold text-center text-black mb-8">CONTACT NU XI</h2>
          <p className="text-center text-gray-700 mb-12 text-lg max-w-2xl mx-auto">
            For any questions, please complete the form below. You may also contact us via social media for a quicker response time.
          </p>
          
          <a
            href="/contact"
            className="inline-block bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
          >
            CONTACT US
          </a>
        </div>
      </section>

      {/* Group Photo Section */}
      <section className="relative py-0 bg-white z-10">
        <div className="w-full">
          <div className="w-full h-[40rem] rounded-none overflow-hidden flex items-center justify-center">
            <img 
              src="/about/group2.jpg" 
              alt="Alpha Kappa Psi Nu Xi Chapter Group Photo on Beach" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative py-8 text-white z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Text */}
              <div className="flex items-center space-x-4">
                <img src="/akpsiLogo.png" alt="Alpha Kappa Psi Logo" className="h-12 w-auto" />

              </div>
              
              {/* Social Media Icons */}
              <div className="flex items-center space-x-6">
                <a href="#" className="text-white hover:text-white/80 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-white/80 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-white/80 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
              

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}