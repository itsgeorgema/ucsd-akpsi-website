'use client';
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { colors } from "@/styles/colors";
import { fontCombinations } from "@/styles/fonts";

export default function Privacy() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className={`fixed top-0 left-0 w-full h-full z-10 ${colors.bg.dark}`} />
      <div className="relative z-20 min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          {!mounted || isLoading ? (
            <LoadingSpinner size="large" fullScreen={false} type="component" />
          ) : (
            <div className="w-full max-w-4xl mx-auto">
              {/* Icon and Title Section */}
              <div className="flex flex-col items-center mb-8">
                <div className={`w-12 h-12 rounded-full ${colors.bg.darkSurface} border-2 ${colors.border.darkAccent} flex items-center justify-center mb-4`}>
                  <svg className={`w-6 h-6 ${colors.text.darkAccent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h1 className={`${fontCombinations.section.main} ${colors.text.darkAccent} mb-2`}>Privacy Policy</h1>
                <p className={`${fontCombinations.section.tertiary} ${colors.text.white}`}>UCSD AKPsi Website</p>
              </div>

              {/* Main Content Area */}
              <div className={`${colors.bg.darkSurface} rounded-lg p-8 shadow-lg`}>
                <div className={`${colors.text.white} space-y-8`}>
                  {/* Introduction */}
                  <div>
                    <p className={`${fontCombinations.content.body} leading-relaxed`}>
                      This Privacy Policy describes our practices regarding information for the official website of the Nu Xi Chapter of Alpha Kappa Psi at the University of California, San Diego (UCSD). Your privacy is important to us.
                    </p>
                  </div>

                  {/* Information We Collect */}
                  <div>
                    <h2 className={`${fontCombinations.section.tertiary} ${colors.text.goldLight} mb-4`}>Information We Collect</h2>
                    <p className={`${fontCombinations.content.body} leading-relaxed mb-4`}>
                      We do not collect any personally identifiable information from visitors to our website.
                    </p>
                    <p className={`${fontCombinations.content.body} leading-relaxed mb-4`}>
                      Our website is for informational purposes only. We do not have user accounts, registration forms, application portals, or any other features that would request or store your personal data, such as your name, email address, or academic information.
                    </p>
                    <p className={`${fontCombinations.content.body} leading-relaxed`}>
                      Like most websites, our web server may automatically log non-personally identifiable usage data, such as your browser type, operating system, and the pages you visit. This data is used for statistical purposes to help us improve our website and cannot be used to identify you personally.
                    </p>
                  </div>

                  {/* How We Use Your Information */}
                  <div>
                    <h2 className={`${fontCombinations.section.tertiary} ${colors.text.goldLight} mb-4`}>How We Use Your Information</h2>
                    <p className={`${fontCombinations.content.body} leading-relaxed`}>
                      Since we do not collect any personal information, we do not use, process, or store it.
                    </p>
                  </div>

                  {/* Information Sharing and Disclosure */}
                  <div>
                    <h2 className={`${fontCombinations.section.tertiary} ${colors.text.goldLight} mb-4`}>Information Sharing and Disclosure</h2>
                    <p className={`${fontCombinations.content.body} leading-relaxed`}>
                      We do not have any personal information to sell, trade, or transfer to third parties. All information and content related to our chapter is handled confidentially within our organization.
                    </p>
                  </div>

                  {/* Cookies and Tracking Technologies */}
                  <div>
                    <h2 className={`${fontCombinations.section.tertiary} ${colors.text.goldLight} mb-4`}>Cookies and Tracking Technologies</h2>
                    <p className={`${fontCombinations.content.body} leading-relaxed`}>
                      Our website may use &quot;cookies&quot; for basic functionality or to gather anonymous analytics data to improve the user experience. These cookies do not collect personal information. You have the option to configure your web browser to refuse cookies or to alert you when cookies are being sent.
                    </p>
                  </div>

                  {/* Data Security */}
                  <div>
                    <h2 className={`${fontCombinations.section.tertiary} ${colors.text.goldLight} mb-4`}>Data Security</h2>
                    <p className={`${fontCombinations.content.body} leading-relaxed`}>
                      We are committed to ensuring that our website is secure. While we do not collect personal data, we implement appropriate technical measures to protect our website&apos;s integrity and protect it from unauthorized access.
                    </p>
                  </div>

                  {/* Links to Third-Party Websites */}
                  <div>
                    <h2 className={`${fontCombinations.section.tertiary} ${colors.text.goldLight} mb-4`}>Links to Third-Party Websites</h2>
                    <p className={`${fontCombinations.content.body} leading-relaxed`}>
                      Our website may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party&apos;s site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                    </p>
                  </div>

                  {/* Updates to This Policy */}
                  <div>
                    <h2 className={`${fontCombinations.section.tertiary} ${colors.text.goldLight} mb-4`}>Updates to This Policy</h2>
                    <p className={`${fontCombinations.content.body} leading-relaxed`}>
                      We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
                    </p>
                  </div>

                  {/* Contact Us */}
                  <div>
                    <h2 className={`${fontCombinations.section.tertiary} ${colors.text.goldLight} mb-4`}>Contact Us</h2>
                    <p className={`${fontCombinations.content.body} leading-relaxed`}>
                      If you have any questions about this Privacy Policy, please feel free to contact us through the information provided on our website.
                    </p>
                  </div>

                  <div className={`pt-6 border-t ${colors.border.darkAccentTransparent}`}>
                    <p className={`${fontCombinations.content.small} ${colors.text.goldLight}`}>Last Updated: August 5, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}