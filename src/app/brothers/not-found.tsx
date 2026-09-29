import type { Metadata } from "next";
import Link from "next/link";
import { colors } from "../../styles/colors";
import { fontCombinations } from "../../styles/fonts";

export const metadata: Metadata = {
  title: "Brother Not Found",
};

export default function BrotherNotFound() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat bg-black"
        style={{ backgroundImage: "url(/assets/sunsetBackground.jpeg)" }}
      />
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-gradient-to-br from-black/40 via-black/30 to-black/50" />
      <div className="relative z-20 min-h-screen flex flex-col">
        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <h1
            className={`text-4xl lg:text-5xl mb-4 ${colors.text.inverse} ${fontCombinations.hero.title}`}
          >
            BROTHER NOT FOUND
          </h1>
          <p
            className={`text-lg mb-8 max-w-xl ${colors.glass.textSubtle} ${fontCombinations.content.body}`}
          >
            This profile doesn&apos;t exist, or the brother is no longer listed
            on our current roster.
          </p>
          <Link
            href="/brothers/active"
            className={`inline-flex items-center px-6 py-3 ${colors.glass.bg} ${colors.glass.bgHover} ${colors.glass.border} ${colors.glass.text} rounded-lg border border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 ${fontCombinations.interactive.primary}`}
          >
            VIEW ALL BROTHERS
          </Link>
        </main>
      </div>
    </div>
  );
}
