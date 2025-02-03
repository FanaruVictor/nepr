"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = () => {
      if (!mediaQuery.matches) {
        setIsMenuOpen(false);
      }
    };

    handleResize();

    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-200 via-white to-blue-300 w-full py-4 text-center shadow-md bg-white/70 fixed top-0 left-0 z-50">
      <SignedIn>
        <div className="flex justify-between items-center px-4 max-w-4xl mx-auto">
          <Link href="/news" className="text-2xl font-bold text-blue-700">Nerp</Link>

          {/* Hamburger Button for Mobile */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-blue-700 hover:text-blue-900 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4 items-center">
            <Link href="/news">
              <button className="text-blue-700 hover:text-blue-900 font-semibold transition-colors">
                News
              </button>
            </Link>
            <Link href="/sparql">
              <button className="text-blue-700 hover:text-blue-900 font-semibold transition-colors">
                SPARQL Query
              </button>
            </Link>
            <Link href="/help">
              <button className="text-blue-700 hover:text-blue-900 font-semibold transition-colors">
                Help
              </button>
            </Link>
            <UserButton />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="flex flex-col items-center bg-gradient-to-r from-blue-200 via-white to-blue-300 w-full py-4 md:hidden">
            <Link href="/news">
              <button className="text-blue-700 hover:text-blue-900 font-semibold transition-colors mb-2">
                News
              </button>
            </Link>
            <Link href="/sparql">
              <button className="text-blue-700 hover:text-blue-900 font-semibold transition-colors mb-2">
                SPARQL Query
              </button>
            </Link>
            
            <UserButton />
          </div>
        )}
      </SignedIn>

      <SignedOut>
        <div className="flex justify-between items-center px-4 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-700">Nepr</h2>
          <SignInButton>
            <button className="text-blue-700 hover:text-blue-900 font-semibold transition-colors">
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
};

export default Header;
