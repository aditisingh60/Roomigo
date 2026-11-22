import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#FAF6EE] border-t border-[#556852]/15 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#556852]/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-block group"
            >
              <div className="flex items-center gap-1.5 text-[#556852] text-[10px] uppercase tracking-[0.25em] font-medium mb-1">
                <span>✦</span>
                <span>Roomigo Living</span>
                <span className="text-[#C59B27]">❋</span>
              </div>
              <h2 className="font-serif text-3xl font-normal text-[#232B20] lowercase tracking-tight">
                roomigo
              </h2>
            </Link>

            <p className="text-xs sm:text-sm text-[#616E5E] max-w-sm leading-relaxed">
              Find your space. Meet your people. Curated shared sanctuaries and compatible flatmates
              matching your personal lifestyle, rhythms, and ideal neighborhood.
            </p>

            {/* Subtle Social Links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#EBF1EA] border border-[#556852]/15 text-[#374435] hover:text-[#232B20] hover:bg-[#FAF6EE] flex items-center justify-center transition-colors text-xs"
                aria-label="Instagram"
              >
                ig
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#EBF1EA] border border-[#556852]/15 text-[#374435] hover:text-[#232B20] hover:bg-[#FAF6EE] flex items-center justify-center transition-colors text-xs"
                aria-label="Twitter"
              >
                x
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#EBF1EA] border border-[#556852]/15 text-[#374435] hover:text-[#232B20] hover:bg-[#FAF6EE] flex items-center justify-center transition-colors text-xs"
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          {/* Column 1: Curated Spaces */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold text-[#232B20] uppercase tracking-[0.2em]">
              Curated Spaces
            </h4>
            <ul className="space-y-2 text-xs text-[#616E5E]">
              <li>
                <Link to="/discover" className="hover:text-[#232B20] transition-colors">
                  Bengaluru (Koramangala & HSR)
                </Link>
              </li>
              <li>
                <Link to="/discover" className="hover:text-[#232B20] transition-colors">
                  Mumbai (Bandra & Andheri)
                </Link>
              </li>
              <li>
                <Link to="/discover" className="hover:text-[#232B20] transition-colors">
                  Delhi NCR (Gurgaon Cyber City)
                </Link>
              </li>
              <li>
                <Link to="/discover" className="hover:text-[#232B20] transition-colors">
                  Pune (Koregaon Park & Viman Nagar)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold text-[#232B20] uppercase tracking-[0.2em]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#616E5E]">
              <li>
                <Link to="/discover" className="hover:text-[#232B20] transition-colors">
                  Discover Flatmates
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#232B20] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#explore-spaces" className="hover:text-[#232B20] transition-colors">
                  Featured Sanctuaries
                </a>
              </li>
              <li>
                <Link to="/signup" className="hover:text-[#232B20] transition-colors">
                  Create Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Community & Trust */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold text-[#232B20] uppercase tracking-[0.2em]">
              Community
            </h4>
            <ul className="space-y-2 text-xs text-[#616E5E]">
              <li>
                <span className="hover:text-[#232B20] cursor-pointer transition-colors">
                  Mindful Living Guidelines
                </span>
              </li>
              <li>
                <span className="hover:text-[#232B20] cursor-pointer transition-colors">
                  Verification & Safety
                </span>
              </li>
              <li>
                <span className="hover:text-[#232B20] cursor-pointer transition-colors">
                  Zero Brokerage Promise
                </span>
              </li>
              <li>
                <span className="hover:text-[#232B20] cursor-pointer transition-colors">
                  Contact Support
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#616E5E]">
          <p>© 2026 Roomigo Living Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#232B20] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#232B20] cursor-pointer">Terms of Living</span>
            <span className="hover:text-[#232B20] cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
