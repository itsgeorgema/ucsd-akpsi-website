"use client";

import Link from "next/link";
import Image from "next/image";
import { fontCombinations } from "../../../styles/fonts";
import BouncyFadeIn from "../../../components/BouncyFadeIn";
import { useResponsiveColumns } from "../../../hooks/useResponsiveColumns";
import { memberImageUrl, memberSlug } from "../../../utils/members";
import type { MemberCard } from "../../../utils/members";

const columnBreakpoints = [
  { minWidth: 768, columns: 4 },
  { minWidth: 640, columns: 2 },
];

export default function ActiveBrothersGrid({
  brothers,
}: {
  brothers: MemberCard[];
}) {
  const columns = useResponsiveColumns(columnBreakpoints);

  return (
    <div className="flex flex-wrap justify-center gap-10">
      {brothers.map((brother, idx) => {
        const colIndex = columns > 0 ? idx % columns : 0;
        const delay = colIndex * 0.06;
        return (
          <BouncyFadeIn key={brother.name} delay={delay} bounce={0} threshold={0}>
            <div className="flex flex-col items-center">
              <Link
                href={`/brothers/active/${encodeURIComponent(memberSlug(brother.name))}`}
                aria-label={`View ${brother.name}'s profile`}
              >
                <div className="w-72 h-96 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                  <div className="relative w-full h-full">
                    <Image
                      src={memberImageUrl(brother.image_path)}
                      alt={brother.name}
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
                {brother.name}
              </span>
            </div>
          </BouncyFadeIn>
        );
      })}
    </div>
  );
}