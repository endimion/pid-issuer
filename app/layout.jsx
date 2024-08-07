"use client";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import Logo from "./logo.png";
import ewcLogo from "./ewcLogo.webp";
import FullConsentModal from "@/components/fullConsentModal.jsx";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [showConsent, setShowConsent] = useState(false);

  const clickConsent = (event) => {
    event.preventDefault();
    setShowConsent(true);
  };

  const onConsentClose = () => {
    setShowConsent(false);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <header className="bg-purple-600 p-4">
            <div className="container mx-auto flex flex-col items-center">
              <Image
                alt="Company Logo"
                src={ewcLogo.src}
                width={200}
                height={50}
              />
              <nav className="mt-4 flex space-x-8">
                <div
                  className={`text-lg font-medium ${
                    pathname === "/" ? "text-white underline" : "text-gray-200"
                  }`}
                >
                  1. Select Persona
                </div>
                <div
                  className={`text-lg font-medium ${
                    pathname.includes("personas")
                      ? "text-white underline"
                      : "text-gray-200"
                  }`}
                >
                  2. Issue PID
                </div>
                <div
                  className={`text-lg font-medium ${
                    pathname.includes("passports")
                      ? "text-white underline"
                      : "text-gray-200"
                  }`}
                >
                  3. Issue Passport
                </div>
              </nav>
            </div>
          </header>

          <main className="flex-grow flex flex-col items-center justify-center p-12">
            {children}
          </main>

          <footer className="bg-gray-50 py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                  <div className="flex items-center">
                    <Image
                      alt="Footer Logo"
                      src={ewcLogo.src}
                      width={60}
                      height={60}
                      className="mr-4"
                    />
                    <p className="text-sm text-gray-700">
                      The EWC project is co-funded by the EU’s Digital Europe
                      Programme under Grant Agreement – GAP-101102744
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center">
                  <p className="text-lg font-semibold text-gray-700">
                    Developed by UAegean i4m lab
                  </p>
                  <Link href="#" legacyBehavior={true}>
                    <a
                      onClick={clickConsent}
                      className="text-sm text-gray-700 hover:underline mt-2 block"
                    >
                      Read our Privacy Policy
                    </a>
                  </Link>
                </div>
                <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center md:text-right">
                  <div className="flex flex-col items-center md:items-end">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Contact Us
                    </h2>
                    <p className="text-sm text-gray-700">
                      Email: info@i4mlab-aegean.gr
                    </p>
                  </div>
                </div>
              </div>
             
            </div>
          </footer>
        </div>
        {showConsent && (
          <FullConsentModal initialState={true} consentClose={onConsentClose} />
        )}
      </body>
    </html>
  );
}
