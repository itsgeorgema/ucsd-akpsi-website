import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UCSD Alpha Kappa Psi',
  description: 'Official website for the Nu Xi Chapter of Alpha Kappa Psi at UC San Diego',
  openGraph: {
    title: 'UCSD Alpha Kappa Psi',
    description: 'Official website for the Nu Xi Chapter of Alpha Kappa Psi at UC San Diego',
    url: 'https://akpsiucsd.com',
    siteName: 'UCSD Alpha Kappa Psi',
    images: [
      {
        url: "https://www.akpsiucsd.com/assets/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: 'UCSD Alpha Kappa Psi',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className={`${inter.className} h-full min-h-screen min-h-dvh flex flex-col`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </AuthProvider>
      </body>
    </html>
  );
}
