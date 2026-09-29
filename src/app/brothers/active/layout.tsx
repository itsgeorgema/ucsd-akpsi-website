import type { Metadata } from "next";
import { pageMetadata } from "../../../utils/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: "Active Brothers",
  description:
    "Meet the active brothers of the Nu Xi Chapter of Alpha Kappa Psi at UC San Diego — students across every major, industry, and graduating class.",
  path: "/brothers/active",
});

export default function ActiveBrothersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
