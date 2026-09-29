import { fontCombinations } from "../../../styles/fonts";
import { colors } from "../../../styles/colors";
import RosterEmptyState from "../../../components/RosterEmptyState";
import { fetchExecutiveCards } from "../../../utils/members";
import ExecutiveGrid from "./ExecutiveGrid";

export const revalidate = 3600;

const backgroundImage = "/assets/sunsetBackground.jpeg";

export default async function ExecutiveCommittee() {
  const executives = await fetchExecutiveCards();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Full Page Background */}
      <div
        className="fixed top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat bg-black"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {/* Enhanced overlay for better readability */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-gradient-to-br from-black/40 via-black/30 to-black/50" />
      <div className="relative z-20 min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          {executives.length === 0 ? (
            <RosterEmptyState
              title="Error loading brothers"
              message="The executive committee data is not available."
            />
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="text-center mb-8 mt-8 md:mt-12">
                <div
                  className={`text-sm tracking-tighter mb-2 ${colors.text.inverse} ${fontCombinations.navigation.secondary}`}
                >
                  MEET OUR
                </div>
                <h1
                  className={`text-5xl lg:text-6xl ${fontCombinations.hero.title} ${colors.text.inverse} mb-4`}
                >
                  EXECUTIVE COMMITTEE
                </h1>
              </div>
              <ExecutiveGrid executives={executives} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
