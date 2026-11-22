import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Roomigo</span>
            <span>&copy; {new Date().getFullYear()} Roomigo Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Find your perfect flatmate with ease</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

