import Footer from '../components/Footer';
import ScrollArrow from '../components/ScrollArrow';
import { heroFont } from '../styles/fonts';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between">
      {/* Fixed full-page background */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/homePageBackground.jpg')" }}
      />
      {/* Overlay for readability */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-black/40" />
      <div className="relative z-20 flex flex-col min-h-screen justify-between">
        {/* HERO SECTION */}
        <section className="relative flex flex-col items-center justify-center min-h-[70vh] pt-16 pb-8">
          <div className="mb-6">
            <img
              src="/akpsiLogo.png"
              alt="Alpha Kappa Psi Logo"
              className="h-28 w-auto mx-auto"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <ScrollArrow />
        </section>

        {/* VALUES SECTION */}
        <section id="akpsi-info" className="relative py-16 px-4 md:px-0 flex justify-center">
          <div
            className="absolute inset-0 w-full h-full pointer-events-none rounded-none"
            style={{
              background: 'linear-gradient(50.498759152186665deg, rgba(243,226,214,0.96) 17.010498046875%, rgba(52,44,55,0.96) 70.611572265625%, #282634 100%, #262626 100%)'
            }}
          />
          <div className="relative max-w-5xl w-full mx-auto z-10">
            <h2 className="text-3xl md:text-4xl mb-10 text-center text-white font-bold">OUR VALUES</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
              {/* Brotherhood */}
              <div>
                <img src="/home/values/broho.png" alt="Brotherhood" className="h-25 w-25 mx-auto mb-2" />
                <div className="text-lg text-white font-semibold">BROTHERHOOD</div>
                <div className="text-sm text-white">We are a family of life-long friends that stick together through thick and thin.</div>
              </div>
              {/* Integrity */}
              <div>
                <img src="/home/values/integrity.png" alt="Integrity" className="h-25 w-25 mx-auto mb-2" />
                <div className="text-lg text-white font-semibold">INTEGRITY</div>
                <div className="text-sm text-white">We do things through hard work and dedication, while not taking any unnecessary shortcuts.</div>
              </div>
              {/* Service */}
              <div>
                <img src="/home/values/service.png" alt="Service" className="h-25 w-25 mx-auto mb-2" />
                <div className="text-lg text-white font-semibold">SERVICE</div>
                <div className="text-sm text-white">We believe in giving back to the communities that have shaped us into the people we are today.</div>
              </div>
              {/* Unity */}
              <div>
                <img src="/home/values/unity.png" alt="Unity" className="h-25 w-25 mx-auto mb-2" />
                <div className="text-lg text-white font-semibold">UNITY</div>
                <div className="text-sm text-white">We strive to build our bonds and strengthen the brotherhood that we are proud of.</div>
              </div>
              {/* Knowledge */}
              <div>
                <img src="/home//values/knowledge.png" alt="Knowledge" className="h-25 w-25 mx-auto mb-2" />
                <div className="text-lg text-white font-semibold">KNOWLEDGE</div>
                <div className="text-sm text-white">We are scholars of diverse disciplines and professionals in varied industries.</div>
              </div>
            </div>
          </div>
        </section>

        {/* GROUP PHOTO SECTION */}
        <section className="relative py-0 z-10">
          <div className="w-full">
            <div className="w-full h-[28rem] md:h-[33rem] overflow-hidden flex items-center justify-center">
              <img src="/home/homePageGroupPhoto.jpg" alt="AKPsi Group Photo" className="w-full h-full object-cover object-[center_35%]" />
            </div>
          </div>
        </section>

        {/* HERO DESCRIPTION SECTION */}
        <section className="relative z-10 flex items-center justify-center w-full min-h-[440px] md:min-h-[520px] py-16 md:py-24" style={{ background: 'none' }}>
          <div className="max-w-lg w-full px-6 md:px-12 flex flex-col items-start justify-center mx-auto">
            <h2 className={`text-white text-2xl md:text-4xl font-light mb-6 leading-snug text-left ${heroFont}`} style={{textShadow: '0 2px 16px rgba(0,0,0,0.25)'}}>
              Alpha Kappa Psi <b>(ΑΚΨ)</b> is the nation’s premier<br />
              co-ed Business fraternity,<br />
              providing mentorship and resources to students through programs, alumni networks, and much more.
            </h2>
            <a href="/about" className="mt-4 px-6 py-3 bg-white text-gray-900 font-semibold rounded shadow hover:bg-gray-100 transition-colors">LEARN MORE</a>
          </div>
        </section>

        {/* PRESIDENT'S MESSAGE SECTION */}
        <section className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full py-16 px-4 md:px-0 bg-white font-hero">
          <div className="flex-1 max-w-2xl w-full md:pr-12 text-black">
            <h3 className="text-5xl font-bold mb-8 leading-tight text-left">FROM<br />OUR PRESIDENT</h3>
            <p className="mb-4 text-base font-normal leading-relaxed text-left">Welcome! This is the website for the Nu Xi Chapter of Alpha Kappa Psi. Here, you can explore our values, who our brothers are, and how you can get involved. Before diving into the details, the brothers of the Nu Xi Chapter would like to thank you for your interest in our fraternity.</p>
            <p className="mb-4 text-base font-normal leading-relaxed text-left">Alpha Kappa Psi is a pre-professional student fraternity here at UC San Diego. We are built on the key values of Brotherhood, Knowledge, Integrity, Unity, and Service. The community you’ll find here at Alpha Kappa Psi is unparalleled. Not only do our brothers strive towards their personal and professional aspirations, but we do so together, building genuine bonds that last us a lifetime.</p>
            <p className="mb-4 text-base font-normal leading-relaxed text-left">With that being said, we highly encourage you to explore our website to learn more about our fraternity, our brothers, and what we stand for. If you’re interested in joining our community, we encourage you to come out to our upcoming Fall 2025 Rush. At Rush, you’ll get the chance to meet the brothers and learn more about how this fraternity can help you grow both personally and professionally.</p>
            <div className="mt-6 text-base font-normal text-left">Sincerely,<br />Lebron James</div>
          </div>
          <div className="flex-1 flex justify-center items-center w-full max-w-lg mt-10 md:mt-0">
            <img src="/home/president.png" alt="President" className="w-full max-w-xs md:max-w-sm h-auto rounded-none object-cover" />
          </div>
        </section>

        {/* INDUSTRIES SECTION */}
        <section className="relative py-20 flex justify-center items-center">
          <div
            className="absolute inset-0 w-full h-full pointer-events-none rounded-none"
            style={{
              background: 'linear-gradient(50.498759152186665deg, rgba(243,226,214,0.96) 17.010498046875%, rgba(52,44,55,0.96) 70.611572265625%, #282634 100%, #262626 100%)'
            }}
          />
          <div className="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl mb-12 text-center text-white font-bold tracking-widest">OUR INDUSTRIES</h2>
            <div className="flex flex-col md:flex-row items-center justify-center w-full gap-12">
              {/* Pie Chart Image with Overlayed Labels and Lines */}
              <div className="relative flex-shrink-0 w-[480px] h-[480px] flex items-center justify-center">
                <img src="/home/industryDistribution.png" alt="Industries Pie Chart" className="w-[360px] h-[360px] object-contain mx-auto" />
                {/* SVG lines connecting labels to chart */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" width="480" height="480">
                  {/* 29% Business (vertical up, shifted left) */}
                  <line x1="192" y1="96" x2="192" y2="-10" stroke="white" strokeWidth="3" />
                  {/* 37% STEM (horizontal right) */}
                  <line x1="350" y1="192" x2="480" y2="192" stroke="white" strokeWidth="3" />
                  {/* 4% Political Science (horizontal left, moved down) */}
                  <line x1="96" y1="300" x2="-60" y2="320" stroke="white" strokeWidth="3" />
                  {/* 20% Design (points to middle of Design segment, lower left quadrant) */}
                  <line x1="160" y1="384" x2="-32" y2="480" stroke="white" strokeWidth="3" />
                  {/* 10% Finance & Accounting (horizontal right) */}
                  <line x1="296" y1="384" x2="480" y2="384" stroke="white" strokeWidth="3" />
                </svg>
                {/* Labels - positioned around the chart */}
                {/* 29% Business */}
                <span className="absolute text-white text-xl font-bold whitespace-nowrap" style={{left: '168px', top: '-30px'}}>29% Business</span>
                {/* 37% STEM */}
                <span className="absolute text-white text-xl font-bold whitespace-nowrap" style={{left: '500px', top: '175px'}}>37% STEM</span>
                {/* 4% Political Science */}
                <span className="absolute text-white text-xl font-bold whitespace-nowrap" style={{left: '-215px', top: '305px'}}>4% Political Science</span>
                {/* 20% Design */}
                <span className="absolute text-white text-xl font-bold whitespace-nowrap" style={{left: '-60px', top: '470px'}}>20% Design</span>
                {/* 10% Finance & Accounting */}
                <span className="absolute text-white text-xl font-bold whitespace-nowrap" style={{left: '490px', top: '370px'}}>10% Finance & Accounting</span>
              </div>
            </div>
          </div>
        </section>

        {/* GROUP PHOTO 2 SECTION */}
        <section className="relative py-0 z-10">
          <div className="w-full">
            <div className="w-full  md:h-[35rem] overflow-hidden flex items-center justify-center">
              <img src="/home/homePageGroupPhoto2.png" alt="AKPsi Group Photo 2" className="w-full h-full object-cover object-[center_40%]" />
            </div>
          </div>
        </section>

        {/* WHERE WE'RE AT SECTION */}
        <section className="relative py-16 bg-white z-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10 tracking-widest text-gray-600">WHERE WE&apos;RE AT</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center px-4">
            {/* Row 1 */}
            <img src="/home/companies/apple.png" alt="Apple" className="w-40 h-24 object-contain" />
            <img src="/home/companies/google.png" alt="Google" className="w-40 h-24 object-contain" />
            <img src="/home/companies/amazon.png" alt="Amazon" className="w-40 h-24 object-contain" />
            <img src="/home/companies/nvidia.png" alt="Nvidia" className="w-40 h-24 object-contain" />
            <img src="/home/companies/meta.png" alt="Meta" className="w-40 h-24 object-contain" />
            <img src="/home/companies/atlassian.png" alt="Atlassian" className="w-40 h-24 object-contain" />
            <img src="/home/companies/tesla.png" alt="Tesla" className="w-40 h-24 object-contain" />
            <img src="/home/companies/microsoft.png" alt="Microsoft" className="w-40 h-24 object-contain" />
            <img src="/home/companies/stifel.png" alt="Stifel" className="w-40 h-24 object-contain" />
            <img src="/home/companies/deloitte.png" alt="Deloitte" className="w-40 h-24 object-contain" />
            <img src="/home/companies/fullscreen.png" alt="Fullscreen" className="w-40 h-24 object-contain" />
            <img src="/home/companies/sony.png" alt="Sony" className="w-40 h-24 object-contain" />
            <img src="/home/companies/mercedes.png" alt="Mercedes" className="w-40 h-24 object-contain" />
            <img src="/home/companies/nike.png" alt="Nike" className="w-40 h-24 object-contain" />
            <img src="/home/companies/citi.png" alt="Citi" className="w-40 h-24 object-contain" />
            <img src="/home/companies/viasat.png" alt="Viasat" className="w-40 h-24 object-contain" />
            <img src="/home/companies/ameritrade.png" alt="Ameritrade" className="w-40 h-24 object-contain" />
            <img src="/home/companies/purestorage.png" alt="PureStorage" className="w-40 h-24 object-contain" />
            <img src="/home/companies/bespoke.png" alt="Bespoke" className="w-40 h-24 object-contain" />
            <img src="/home/companies/cbs.png" alt="CBS" className="w-40 h-24 object-contain" />
            <img src="/home/companies/Lumentum.png" alt="Lumentum" className="w-40 h-24 object-contain" />
            <img src="/home/companies/livenation.png" alt="LiveNation" className="w-40 h-24 object-contain" />
            <img src="/home/companies/blackrock.png" alt="BlackRock" className="w-40 h-24 object-contain" />
            <img src="/home/companies/bankofamerica.png" alt="BankofAmerica" className="w-40 h-24 object-contain" />
            <img src="/home/companies/johnsonjohnson.png" alt="JohnsonJohnson" className="w-40 h-24 object-contain" />
            <img src="/home/companies/capitaladvisors.png" alt="CapitalAdvisors" className="w-40 h-24 object-contain" />
            <img src="/home/companies/visa.png" alt="Visa" className="w-40 h-24 object-contain" />
            <img src="/home/companies/hewlettpackard.png" alt="HewlettPackard" className="w-40 h-24 object-contain" />
            <img src="/home/companies/adobe.png" alt="Adobe" className="w-40 h-24 object-contain" />
            <img src="/home/companies/goldmansachs.png" alt="GoldmanSachs" className="w-40 h-24 object-contain" />
            <img src="/home/companies/bainbridge.png" alt="Bainbridge" className="w-40 h-24 object-contain" />
            <img src="/home/companies/outreach.png" alt="Outreach" className="w-40 h-24 object-contain" />
            <img src="/home/companies/warnerbros.png" alt="WarnerBros" className="w-40 h-24 object-contain" />
            <img src="/home/companies/ibm.png" alt="IBM" className="w-40 h-24 object-contain" />
            <img src="/home/companies/dreamworks.png" alt="Dreamworks" className="w-40 h-24 object-contain" />
          </div>
        </section>

        {/* Footer (includes social links and login) */}
        <Footer />
      </div>
    </div>
  );
}
