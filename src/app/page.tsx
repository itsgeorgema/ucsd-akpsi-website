import Link from "next/link";
import HomeHero from "./HomeHero";
import HomeJoin from "./HomeJoin";
import BouncyFadeIn from "../components/BouncyFadeIn";
import InfiniteCarousel from "../components/InfiniteCarousel";
import { fontCombinations } from "../styles/fonts";
import { colors } from "../styles/colors";
import { getGalleryImages, getHomeImages } from "../utils/imageUtils";
import Image from "next/image";

export const revalidate = 3600;

const homeImages = getHomeImages();
const galleryImages = getGalleryImages();

export default function Home() {

  return (
    <div className="relative w-full max-w-full overflow-x-clip">
      <div
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat bg-black"
        style={{ backgroundImage: `url(${homeImages.background})` }}
      />
      <div
        className={`fixed top-0 left-0 w-full h-full z-10 ${colors.bg.overlay}`}
      />
      <div className="relative z-20 min-h-screen flex flex-col">
        <HomeHero />

        <HomeJoin />

        <section
          className="relative w-full overflow-hidden bg-[#F8F8F8] pb-16 md:pb-24"
        >
          <div className="relative">
            <InfiniteCarousel images={galleryImages} />
          </div>
        </section>

        <section
          className={`relative flex items-center justify-center w-full min-h-[60vh] ${colors.section.bg} overflow-hidden`}
        >
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full overflow-hidden flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={homeImages.groupPhoto1}
                  alt="AKPsi Group Photo"
                  fill
                  sizes="100%"
                  className="object-cover object-[center_35%]"
                />
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 bg-[#102F49]/85 z-10"
          />

          <div className="relative z-20 max-w-2xl md:max-w-4xl w-full px-6 md:px-10 lg:px-16 flex flex-col items-start justify-center mx-auto">
            <BouncyFadeIn delay={0.1} threshold={0.1} bounce={0}>
              <div className="relative z-30">
                <h2
                  className={`${colors.glass.text} text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-6 leading-snug text-left ${fontCombinations.section.main}`}
                >
                  Alpha Kappa Psi <b>(ΑΚΨ)</b> is the nation&apos;s premier
                  co-ed Business fraternity, providing mentorship and resources
                  to students.
                </h2>
                <Link
                  href="/about"
                  className={`group mt-6 inline-flex items-center gap-5 rounded-full bg-[#F8F8F8] py-2 pl-6 pr-2 ${fontCombinations.interactive.primary} text-[#102F49] transition-transform duration-500 ease-[cubic-bezier(.32,.72,0,1)] active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white`}
                >
                  <span>Discover our chapter</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#102F49]/5 transition-transform duration-500 ease-[cubic-bezier(.32,.72,0,1)] group-hover:-rotate-45" aria-hidden="true">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                  </span>
                </Link>
              </div>
            </BouncyFadeIn>
          </div>
        </section>
      </div>
    </div>
  );
}
