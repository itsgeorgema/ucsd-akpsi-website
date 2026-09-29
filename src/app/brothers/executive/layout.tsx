import type { Metadata } from "next";
import { pageMetadata } from "../../../utils/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: "Executive Committee",
  description:
    "Meet the executive committee leading the Nu Xi Chapter of Alpha Kappa Psi at UC San Diego for the current term.",
  path: "/brothers/executive",
});

export default function ExecutiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
