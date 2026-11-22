import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#859680] py-0 md:py-6 px-0 md:px-6 flex flex-col items-center justify-start antialiased selection:bg-[#F7E599] selection:text-[#232B20]">
      {/* Editorial Framed Container Inspired by Boutique Wellness & Lifestyle Magazines */}
      <div className="w-full max-w-[1440px] bg-[#FAF6EE] text-[#232B20] rounded-none md:rounded-[36px] shadow-[0_25px_60px_-15px_rgba(35,43,32,0.35)] border-0 md:border border-[#556852]/20 overflow-hidden flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
