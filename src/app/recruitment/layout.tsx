import type { Metadata } from "next";
import { pageMetadata } from "../../utils/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: "Recruitment",
  description:
    "Rush the Nu Xi Chapter of Alpha Kappa Psi at UC San Diego. See the rush week schedule, meet our brothers, and find the interest form and application.",
  path: "/recruitment",
});

export default function RecruitmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
