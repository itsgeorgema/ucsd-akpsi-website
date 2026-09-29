import type { Metadata } from "next";
import { pageMetadata } from "../../utils/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Learn about Alpha Kappa Psi, the world's oldest and largest business fraternity, and the Nu Xi Chapter at UC San Diego — our history, our members, and where our brothers work.",
  path: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
