import { fontCombinations } from "../../../styles/fonts";
import { colors } from "../../../styles/colors";
import RosterEmptyState from "../../../components/RosterEmptyState";
import { fetchActiveCards } from "../../../utils/members";
import ActiveBrothersGrid from "./ActiveBrothersGrid";

export const revalidate = 3600;

const backgroundImage = "/assets/sunsetBackground.jpeg";

export default async function ActiveBrothers() {
  const brothers = await fetchActiveCards();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Full Page Background */}
      <div
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat bg-black"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {/* Overlay for readability */}
      <div className={`fixed top-0 left-0 w-full h-full z-10 bg-black/30`} />
      <div className="relative z-20 min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          {brothers.length === 0 ? (
            <RosterEmptyState
              title="Error loading brothers"
              message="The active brothers data is not available."
            />
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="text-center mb-8 mt-8 md:mt-12">
                <div
                  className={`text-sm tracking-tighter mb-2 ${colors.text.inverse} ${fontCombinations.navigation.secondary}`}
                >
                  INTRODUCING OUR
                </div>
                <h1
                  className={`text-5xl lg:text-6xl ${fontCombinations.hero.title} ${colors.text.inverse} mb-4`}
                >
                  ACTIVE BROTHERS
                </h1>
              </div>
              <ActiveBrothersGrid brothers={brothers} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
