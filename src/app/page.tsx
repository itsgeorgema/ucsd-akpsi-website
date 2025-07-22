import { akpsiColors } from '../styles/colors';
import { akpsiFonts } from '../styles/fonts';

export default function Home() {
  return (
    <div className={`flex items-center justify-center min-h-screen ${akpsiColors.mainBg}`}>
      <div className="text-center">
        <h1 className={`text-6xl mb-4 ${akpsiColors.sectionTitle} ${akpsiFonts.sectionTitleFont}`}>
          UCSD AKPSI
        </h1>
        <p className={`text-xl ${akpsiColors.sectionText}`}>
          Alpha Kappa Psi at UC San Diego
        </p>
      </div>
    </div>
  );
}
