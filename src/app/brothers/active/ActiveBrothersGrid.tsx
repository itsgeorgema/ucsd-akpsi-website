"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fontCombinations } from "../../../styles/fonts";
import { colors } from "../../../styles/colors";
import BouncyFadeIn from "../../../components/BouncyFadeIn";
import { useResponsiveColumns } from "../../../hooks/useResponsiveColumns";
import {
  YEAR_ORDER,
  memberImageUrl,
  memberSlug,
} from "../../../utils/members";
import type { MemberCard } from "../../../utils/members";

const columnBreakpoints = [
  { minWidth: 768, columns: 4 },
  { minWidth: 640, columns: 2 },
];

const ALL = "All";

const controlClasses = `h-12 rounded-xl border ${colors.glass.border} bg-[#F8F8F8]/10 ${colors.glass.text} ${fontCombinations.content.body} leading-none`;

export default function ActiveBrothersGrid({
  brothers,
}: {
  brothers: MemberCard[];
}) {
  const columns = useResponsiveColumns(columnBreakpoints);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState(ALL);
  const [major, setMajor] = useState(ALL);

  const years = useMemo(() => {
    const present = new Set(
      brothers.map((brother) => brother.year).filter(Boolean) as string[],
    );
    return YEAR_ORDER.filter((value) => present.has(value));
  }, [brothers]);

  // A double major counts once under each of its majors.
  const majors = useMemo(() => {
    const counts = new Map<string, number>();
    for (const brother of brothers) {
      for (const name of brother.majors ?? []) {
        counts.set(name, (counts.get(name) ?? 0) + 1);
      }
    }
    return [...counts.entries()].sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
    );
  }, [brothers]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return brothers.filter((brother) => {
      if (year !== ALL && brother.year !== year) return false;
      if (major !== ALL && !brother.majors?.includes(major)) return false;
      if (!needle) return true;
      return `${brother.name} ${(brother.majors ?? []).join(" ")}`
        .toLowerCase()
        .includes(needle);
    });
  }, [brothers, query, year, major]);

  const hasFilterData = years.length > 0 || majors.length > 0;
  const isFiltered = query.trim() !== "" || year !== ALL || major !== ALL;

  const clearFilters = () => {
    setQuery("");
    setYear(ALL);
    setMajor(ALL);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className={`relative z-20 w-full max-w-4xl mb-12 rounded-2xl border ${colors.glass.border} ${colors.glass.bg} shadow-xl p-4 md:p-6`}
      >
        <div className="flex flex-col lg:flex-row gap-3">
          <label htmlFor="brother-search" className="sr-only">
            {majors.length > 0
              ? "Search brothers by name or major"
              : "Search brothers by name"}
          </label>
          <input
            id="brother-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              majors.length > 0 ? "Search by name or major…" : "Search by name…"
            }
            className={`flex-1 min-w-0 px-4 placeholder-[#F8F8F8]/60 ${controlClasses} transition-colors duration-200 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50`}
          />

          {majors.length > 0 && (
            <MajorFilter
              majors={majors}
              value={major}
              onChange={setMajor}
            />
          )}
        </div>

        {years.length > 0 && (
          <div
            className="flex flex-wrap gap-2 mt-4"
            role="group"
            aria-label="Filter by class year"
          >
            {[ALL, ...years].map((value) => {
              const isActive = year === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setYear(value)}
                  aria-pressed={isActive}
                  className={`h-10 px-4 rounded-full border cursor-pointer transition-colors duration-200 text-sm ${fontCombinations.navigation.secondary} ${
                    isActive
                      ? "bg-[#F8F8F8] text-[#003366] border-[#F8F8F8]"
                      : `bg-[#F8F8F8]/10 ${colors.glass.bgHover} ${colors.glass.border} ${colors.glass.text}`
                  }`}
                >
                  {value === ALL ? "All years" : `${value} Year`}
                </button>
              );
            })}
          </div>
        )}

        <div
          className={`flex items-center justify-between gap-4 mt-4 pt-4 border-t ${colors.glass.border}`}
        >
          <p
            className={`text-sm ${colors.glass.textSubtle} ${fontCombinations.content.small}`}
            aria-live="polite"
          >
            {filtered.length} of {brothers.length} brothers
          </p>
          {isFiltered && (
            <button
              type="button"
              onClick={clearFilters}
              className={`text-sm ${colors.glass.textSubtle} hover:${colors.glass.text} underline cursor-pointer ${fontCombinations.content.small}`}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p
          className={`text-lg text-white/80 py-16 text-center ${fontCombinations.content.body}`}
        >
          No brothers match {hasFilterData ? "those filters" : "that search"}.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-10">
          {filtered.map((brother, idx) => {
            const colIndex = columns > 0 ? idx % columns : 0;
            return (
              <BouncyFadeIn
                key={brother.name}
                delay={colIndex * 0.06}
                bounce={0}
                threshold={0}
              >
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
                  {brother.majors && brother.majors.length > 0 && (
                    <span
                      className={`text-sm mt-1 text-white/80 text-center max-w-72 ${fontCombinations.content.small}`}
                    >
                      {brother.majors.join(" & ")}
                    </span>
                  )}
                  {brother.year && (
                    <span
                      className={`text-xs mt-0.5 text-white/60 ${fontCombinations.content.small}`}
                    >
                      {brother.year} Year
                    </span>
                  )}
                </div>
              </BouncyFadeIn>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MajorFilter({
  majors,
  value,
  onChange,
}: {
  majors: Array<[string, number]>;
  value: string;
  onChange: (value: string) => void;
}) {
  const label =
    value === ALL
      ? "All majors"
      : (majors.find(([name]) => name === value)?.[0] ?? "All majors");

  return (
    <div className="relative w-full lg:w-80 lg:shrink-0">
      <label htmlFor="brother-major" className="sr-only">
        Filter by major
      </label>
      {/* Invisible native select sits on top so the OS picker is what opens. */}
      <select
        id="brother-major"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
      >
        <option value={ALL}>All majors</option>
        {majors.map(([name, count]) => (
          <option key={name} value={name}>
            {name} ({count})
          </option>
        ))}
      </select>
      <div
        aria-hidden="true"
        className={`flex w-full items-center gap-3 pl-4 pr-3 pointer-events-none ${controlClasses} peer-focus:border-[#D4AF37] peer-focus:ring-1 peer-focus:ring-[#D4AF37]/50`}
      >
        <span className="min-w-0 flex-1 truncate text-left">{label}</span>
        <svg
          className={`w-4 h-4 shrink-0 ${colors.glass.textSubtle}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
