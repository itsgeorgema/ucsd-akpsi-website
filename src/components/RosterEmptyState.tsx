import { colors } from "../styles/colors";
import { fontCombinations } from "../styles/fonts";

export default function RosterEmptyState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[60vh] ${colors.text.inverse}`}
    >
      <div className={`text-2xl ${fontCombinations.section.secondary} mb-2`}>
        {title}
      </div>
      <div
        className={`text-lg opacity-80 ${fontCombinations.content.body} ${colors.glass.textSubtle}`}
      >
        {message}
      </div>
    </div>
  );
}
