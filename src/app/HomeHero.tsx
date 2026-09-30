"use client";

import ScrollArrow from "../components/ScrollArrow";
import BouncyFadeIn from "../components/BouncyFadeIn";
import { fontCombinations, hierarchyWeights } from "../styles/fonts";
import { colors } from "../styles/colors";
import AnimatedTitle from "../components/AnimatedTitle";
import { getHomeImages } from "../utils/imageUtils";
import { useViewportHeight } from "../hooks/useViewportHeight";
import Image from "next/image";

const homeImages = getHomeImages();

export default function HomeHero() {
  const { isPopupWindow, cssVarHeight } = useViewportHeight();

  return (
    <section
      className={`relative flex flex-col justify-center px-4 md:px-8 lg:px-12 pt-8 md:pt-4 safe-area-inset-top safe-area-inset-bottom ${
        isPopupWindow ? "min-h-0 hero-constrained" : "min-h-screen-safe"
      }`}
      style={isPopupWindow ? { minHeight: cssVarHeight } : {}}
    >
      <div
        className={`relative z-10 max-w-7xl mx-auto w-full flex flex-col flex-1 justify-center scale-90 sm:scale-100 ${
          isPopupWindow ? "translate-y-0" : "translate-y-8 md:translate-y-0"
        }`}
      >
        <div
          className={`flex-1 flex items-end justify-center ${
            isPopupWindow ? "mb-1 md:mb-2" : "mb-1 sm:mb-2 md:mb-4 lg:mb-8"
          }`}
        >
          <h1
            className={`text-3xl sm:text-7xl md:text-6xl lg:text-8xl xl:text-8xl ${colors.heroTitle} leading-tight ${fontCombinations.hero.title} ${hierarchyWeights.hero} w-full text-left`}
          >
            <AnimatedTitle />
          </h1>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-1 md:gap-1 lg:gap-6 ${
            isPopupWindow ? "mb-1 md:mb-1" : "mb-1 sm:mb-1 md:mb-2"
          } flex-shrink-0 justify-center`}
        >
          <Value
            delay={0.1}
            src={homeImages.broho}
            title="BROTHERHOOD"
            body="We are a family of life-long friends that stick together through thick and thin."
          />
          <Value
            delay={0.2}
            src={homeImages.integrity}
            title="INTEGRITY"
            body="We do things through hard work and dedication, while not taking any unnecessary shortcuts."
          />
          <Value
            delay={0.3}
            src={homeImages.service}
            title="SERVICE"
            body="We believe in giving back to the communities that have shaped us into the people we are today."
          />
          <Value
            delay={0.4}
            src={homeImages.unity}
            title="UNITY"
            body="We strive to build our bonds and strengthen the brotherhood that we are proud of."
          />
          <Value
            delay={0.5}
            src={homeImages.knowledge}
            title="KNOWLEDGE"
            body="We are scholars of diverse disciplines and professionals in varied industries."
          />
        </div>

        <div
          className={`flex justify-center flex-shrink-0 ${
            isPopupWindow
              ? "mt-1 md:mt-1 pb-4 md:pb-2"
              : "mt-1 sm:mt-1 md:mt-2 pb-8 md:pb-0"
          }`}
        >
          <ScrollArrow />
        </div>
      </div>
    </section>
  );
}

function Value({
  delay,
  src,
  title,
  body,
}: {
  delay: number;
  src: string;
  title: string;
  body: string;
}) {
  return (
    <BouncyFadeIn delay={delay} threshold={0.1}>
      <div className={colors.glass.text}>
        <div className="mb-0.5 sm:mb-1 md:mb-2">
          <div className="relative h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12">
            <Image
              src={src}
              alt={title}
              fill
              sizes="(max-width: 640px) 24px, (max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
              className="object-contain"
            />
          </div>
        </div>
        <h3
          className={`text-xs sm:text-sm md:text-base lg:text-lg mb-0.5 sm:mb-1 ${colors.glass.text} ${fontCombinations.values.title} ${hierarchyWeights.valuesTitle}`}
        >
          {title}
        </h3>
        <p
          className={`text-xs md:text-sm lg:text-base ${colors.glass.textBody} ${fontCombinations.values.description} ${hierarchyWeights.paragraph}`}
        >
          {body}
        </p>
      </div>
    </BouncyFadeIn>
  );
}
