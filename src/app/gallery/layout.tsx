import type { Metadata } from "next";
import { pageMetadata } from "../../utils/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "Photos from the Nu Xi Chapter of Alpha Kappa Psi at UC San Diego — brotherhood events, professional development, and everything in between.",
  path: "/gallery",
});

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
