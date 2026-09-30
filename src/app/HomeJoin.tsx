"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { rushInterestFormUrl, rushSeason, rushSiteUrl, rushWeekLabel } from "../utils/rush";
import styles from "./HomeJoin.module.css";
import { fontCombinations } from "../styles/fonts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Arrow() {
  return <span className={styles.arrow} aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>;
}

export default function HomeJoin() {
  const section = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-join-reveal]", {
        y: 28, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: section.current, start: "top 85%", once: true },
      });
      gsap.from("[data-join-photo]", {
        scale: 0.94, transformOrigin: "center center", ease: "none",
        scrollTrigger: { trigger: "[data-join-photo]", start: "top bottom", end: "center center", scrub: 1 },
      });

    });
    return () => media.revert();
  }, { scope: section });

  return (
    <section ref={section} id="join" aria-labelledby="join-heading" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro} data-join-reveal>
          <p className={`${styles.season} ${fontCombinations.navigation.secondary}`}><span aria-hidden="true" />{rushSeason} recruitment</p>
          <p className={`${styles.chapter} ${fontCombinations.navigation.secondary}`}>Alpha Kappa Psi · Nu Xi Chapter</p>
        </div>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <h2 id="join-heading" className={`${styles.heading} ${fontCombinations.section.main}`} data-join-reveal>Find your place<br /><span>with us</span></h2>
            <p className={`${styles.description} ${fontCombinations.content.body}`} data-join-reveal>We welcome you to the Alpha Kappa Psi, Nu Xi chapter&apos;s official website. We encourage you to explore our values, who our brothers are, and how you can get involved. Thank you for your interest in our fraternity.</p>
            <div className={styles.invitation} data-join-reveal>
              <p className={fontCombinations.section.tertiary}>Rush with us this fall.</p>
              <span className={fontCombinations.content.small}>{rushWeekLabel} · All majors welcome</span>
            </div>
            <div className={styles.actions} data-join-reveal>
              <a className={`${styles.primary} ${fontCombinations.interactive.primary}`} href={rushInterestFormUrl} target="_blank" rel="noopener noreferrer">Express interest<Arrow /></a>
              <a className={`${styles.secondary} ${fontCombinations.interactive.primary}`} href={rushSiteUrl} target="_blank" rel="noopener noreferrer">Rush details & application<Arrow /></a>
            </div>
          </div>
          <div className={styles.photoShell} data-join-photo>
            <Link href="/brothers/active" className={styles.photoLink}>
              <div className={styles.photo}>
                <Image src="/about/groupAbout1.jpeg" alt="Nu Xi brothers together on the UC San Diego campus" fill sizes="(max-width: 767px) 100vw, 50vw" className={styles.image} />
              </div>
              <div className={styles.photoCaption}>
                <div><span className={`${styles.captionLabel} ${fontCombinations.navigation.secondary}`}>A place to belong</span><p className={fontCombinations.section.tertiary}>Meet the brotherhood</p></div><Arrow />
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.chapterNote}>
          <p className={`${styles.facts} ${fontCombinations.content.small}`}>At UC San Diego since <strong>2019</strong></p>
        </div>
      </div>
    </section>
  );
}
