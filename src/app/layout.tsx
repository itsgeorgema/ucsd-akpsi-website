import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { Analytics } from "@vercel/analytics/next";
import { ogImage, siteDescription, siteName, siteUrl } from "../utils/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Nu Xi Chapter`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "Alpha Kappa Psi",
    "AKPsi",
    "UCSD",
    "UC San Diego",
    "Nu Xi Chapter",
    "business fraternity",
    "professional fraternity",
    "co-ed fraternity",
    "UCSD rush",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: `${siteName} | Nu Xi Chapter`,
    description: siteDescription,
    url: "/",
    siteName,
    images: [ogImage],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Nu Xi Chapter`,
    description: siteDescription,
    images: [ogImage.url],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geist.variable} ${geist.className} min-h-screen min-h-svh flex flex-col`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
