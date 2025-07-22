import { akpsiColors } from '../../styles/colors';
import { akpsiFonts } from '../../styles/fonts';

export default function Recruitment() {
  return (
    <div className={`flex items-center justify-center min-h-screen ${akpsiColors.mainBg}`}>
      <div className="text-center">
        <h1 className={`text-4xl mb-4 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
          Recruitment
        </h1>
      </div>
    </div>
  );
} 