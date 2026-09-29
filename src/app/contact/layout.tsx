import type { Metadata } from "next";
import { pageMetadata } from "../../utils/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with the Nu Xi Chapter of Alpha Kappa Psi at UC San Diego. Questions about rush, membership, or partnering with our chapter are all welcome.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
