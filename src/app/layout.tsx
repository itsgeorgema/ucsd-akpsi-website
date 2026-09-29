import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UCSD Alpha Kappa Psi",
  description:
    "Official website for the Nu Xi Chapter of Alpha Kappa Psi at UC San Diego",
  openGraph: {
    title: "UCSD Alpha Kappa Psi",
    description:
      "Official website for the Nu Xi Chapter of Alpha Kappa Psi at UC San Diego",
    url: "https://akpsiucsd.com",
    siteName: "UCSD Alpha Kappa Psi",
    images: [
      {
        url: "https://www.akpsiucsd.com/assets/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "UCSD Alpha Kappa Psi",
      },
    ],
    locale: "en_US",
    type: "website",
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
        className={`${inter.className} h-full min-h-screen min-h-svh flex flex-col`}
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
