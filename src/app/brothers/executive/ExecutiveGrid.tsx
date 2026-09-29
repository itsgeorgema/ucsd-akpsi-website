"use client";

import Link from "next/link";
import Image from "next/image";
import { fontCombinations } from "../../../styles/fonts";
import BouncyFadeIn from "../../../components/BouncyFadeIn";
import { memberImageUrl, memberSlug } from "../../../utils/members";
import type { MemberCard } from "../../../utils/members";

function createReversePyramid(executives: MemberCard[]) {
  const rows: MemberCard[][] = [];
  let currentIndex = 0;

  for (const requestedSize of [4, 4, 2]) {
    if (currentIndex >= executives.length) break;
    const rowSize = Math.min(requestedSize, executives.length - currentIndex);
    rows.push(executives.slice(currentIndex, currentIndex + rowSize));
    currentIndex += rowSize;
  }

  return rows;
}

export default function ExecutiveGrid({
  executives,
}: {
  executives: MemberCard[];
}) {
  const pyramidRows = createReversePyramid(executives);

  return (
    <div className="flex flex-col items-center gap-16">
      {pyramidRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-10">
            {row.map((executive, idx) => (
              <BouncyFadeIn
                key={executive.name}
                delay={idx * 0.06}
                bounce={0}
                threshold={0}
              >
                <div className="flex flex-col items-center">
                  <Link
                    href={`/brothers/executive/${encodeURIComponent(memberSlug(executive.name))}`}
                    aria-label={`View ${executive.name}'s profile - ${executive.position}`}
                  >
                    <div className="w-72 h-96 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                      <div className="relative w-full h-full">
                        <Image
                          src={memberImageUrl(executive.image_path)}
                          alt={`${executive.name} - ${executive.position}`}
                          fill
                          sizes="(max-width: 768px) 288px, 288px"
                          className="object-cover object-center scale-110"
                        />
                      </div>
                    </div>
                  </Link>
                  <span
                    className={`text-lg mt-2 text-white ${fontCombinations.section.tertiary}`}
                  >
                    {executive.name}
                  </span>
                  <span
                    className={`text-sm mt-1 text-white/80 ${fontCombinations.content.small}`}
                  >
                    {executive.position}
                  </span>
                </div>
              </BouncyFadeIn>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
