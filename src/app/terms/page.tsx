'use client';
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { colors } from "@/styles/colors";
import { fontCombinations } from "@/styles/fonts";

export default function Terms(){
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        setIsLoading(false);
    }, []);

    return(
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
                                    <svg className={`w-6 h-6 ${colors.text.darkAccent}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h1 className={`${fontCombinations.section.main} ${colors.text.darkAccent} mb-2`}>Terms of Service</h1>
                                <p className={`${fontCombinations.section.tertiary} ${colors.text.white}`}>UCSD AKPsi Website</p>
                            </div>

                            {/* Main Content Area */}
                            <div className={`${colors.bg.darkSurface} rounded-lg p-8 shadow-lg`}>
                                <div className={`${colors.text.white} space-y-8`}>
                                    {/* Introduction */}
                                    <div>
                                        <p className={`${fontCombinations.content.body} leading-relaxed`}>
                                            These Terms of Service govern your use of our website for the official website of the Nu Xi Chapter of Alpha Kappa Psi at the University of California, San Diego (UCSD). By accessing or using the website, you agree to be bound by these terms.
                                        </p>
                                    </div>

                                    {/* Use of the Website */}
                                    <div>
                                        <h2 className={`${fontCombinations.section.tertiary} ${colors.text.goldLight} mb-4`}>Use of the Website</h2>
                                        <p className={`${fontCombinations.content.body} leading-relaxed`}>
                                        This website is intended to provide information about our chapter, our members, and our activities. It is for your personal and non-commercial use only. You agree to use the website for lawful purposes and not to misuse it in any way.
                                        </p>
                                    </div>

                                    {/* Intellectual Property Rights */}
                                    <div>
                                        <h2 className={`${fontCombinations.section.tertiary} ${colors.text.goldLight} mb-4`}>Intellectual Property Rights</h2>
                                        <p className={`${fontCombinations.content.body} leading-relaxed`}>
                                            All content on this website, including but not limited to text, graphics, logos, images, videos, and the arrangement thereof, is the exclusive property of UCSD AKPsi or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not copy, reproduce, distribute, modify, or create derivative works from any content on this site without our express prior written permission.
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className={`${fontCombinations.section.tertiary} ${colors.text.goldLight} mb-4`}>Disclaimers</h2>
                                        <p className={`${fontCombinations.content.body} leading-relaxed`}>
                                        The information and materials on this website are provided on an &quot;as is&quot; and &quot;as available&quot; basis. UCSD AKPsi makes no warranties, expressed or implied, regarding the accuracy, completeness, or reliability of any content. We do not warrant that the website will be uninterrupted or error-free.
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className={`${fontCombinations.section.tertiary} ${colors.text.goldLight} mb-4`}>Limitation of Liability</h2>
                                        <p className={`${fontCombinations.content.body} leading-relaxed`}>
                                        To the fullest extent permitted by applicable law, UCSD AKPsi, its members, and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your access to or use of, or inability to access or use, the website.
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className={`${fontCombinations.section.tertiary} ${colors.text.goldLight} mb-4`}>Changes to These Terms</h2>
                                        <p className={`${fontCombinations.content.body} leading-relaxed`}>
                                            We reserve the right to modify these Terms at any time. We will post the most current version of these Terms on our portal. Your continued use of the portal after any such modification constitutes your acceptance of the new Terms of Service.
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className={`${fontCombinations.section.tertiary} ${colors.text.goldLight} mb-4`}>Contact Us</h2>
                                        <p className={`${fontCombinations.content.body} leading-relaxed`}>
                                            If you have any questions about these Terms, please feel free to contact us through the contact information provided on our website.
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
    )
}