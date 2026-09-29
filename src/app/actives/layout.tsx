import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Active Resources",
  alternates: { canonical: "/actives" },
  robots: { index: false, follow: false },
};

export default function ActivesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
