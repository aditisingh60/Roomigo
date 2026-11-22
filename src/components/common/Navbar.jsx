import React, { useState } from 'react';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import {
  Home,
  Sparkles,
  Menu,
  X,
  ArrowRight,
  LogIn,
  User,
  LogOut,
  Compass,
  Heart,
  MessageSquare,
} from 'lucide-react';
import Button from './Button';
import { useAuth } from '../../context/AuthContext';
import { useMatch } from '../../context/MatchContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuth();
  const { matches } = useMatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (anchorId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${anchorId}`);
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const loggedInLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-full transition-all ${
      isActive
        ? 'text-[#7056D8] bg-[#F0ECFF] font-bold'
        : 'text-[#656377] hover:text-[#252333] hover:bg-[#F0ECFF]/60'
    }`;

  const currentAvatar =
    currentUser?.profile?.profilePic ||
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#252333]/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with house-inspired icon */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7056D8] via-[#7e65e3] to-[#FF8BA7] p-0.5 shadow-md shadow-[#7056D8]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#7056D8] rounded-[14px] flex items-center justify-center text-white">
                <Home className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-[#252333] font-sans">
              Roomigo<span className="text-[#FF8BA7]">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {isAuthenticated ? (
              /* LOGGED-IN NAVBAR LINKS */
              <>
                <NavLink to="/" className={loggedInLinkClass}>
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </NavLink>

                <NavLink to="/discover" className={loggedInLinkClass}>
                  <Compass className="w-4 h-4" />
                  <span>Discover</span>
                </NavLink>

                <NavLink to="/matches" className={loggedInLinkClass}>
                  <div className="relative flex items-center gap-1.5">
                    <Heart className="w-4 h-4" />
                    <span>Matches</span>
                    {matches.length > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#FF8BA7] text-white text-[10px] font-bold flex items-center justify-center">
                        {matches.length}
                      </span>
                    )}
                  </div>
                </NavLink>

                <NavLink to="/chat" className={loggedInLinkClass}>
                  <MessageSquare className="w-4 h-4" />
                  <span>Chats</span>
                </NavLink>

                <NavLink to="/profile" className={loggedInLinkClass}>
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </NavLink>
              </>
            ) : (
              /* PUBLIC / GUEST NAVBAR LINKS */
              <>
                <Link
                  to="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-3.5 py-2 text-sm font-medium text-[#252333] hover:text-[#7056D8] rounded-full hover:bg-[#F0ECFF]/70 transition-all"
                >
                  Home
                </Link>
                <button
                  onClick={() => handleNavClick('how-it-works')}
                  className="px-3.5 py-2 text-sm font-medium text-[#656377] hover:text-[#7056D8] rounded-full hover:bg-[#F0ECFF]/70 transition-all cursor-pointer"
                >
                  How It Works
                </button>
                <button
                  onClick={() => handleNavClick('why-roomigo')}
                  className="px-3.5 py-2 text-sm font-medium text-[#656377] hover:text-[#7056D8] rounded-full hover:bg-[#F0ECFF]/70 transition-all cursor-pointer"
                >
                  About Us
                </button>
                <button
                  onClick={() => handleNavClick('explore-homes')}
                  className="px-3.5 py-2 text-sm font-medium text-[#656377] hover:text-[#7056D8] rounded-full hover:bg-[#F0ECFF]/70 transition-all cursor-pointer"
                >
                  Explore Homes
                </button>
              </>
            )}
          </nav>

          {/* Desktop Right Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-[#F0ECFF]/60 transition-colors"
                >
                  <img
                    src={currentAvatar}
                    alt={currentUser?.name || 'User'}
                    className="w-9 h-9 rounded-full object-cover border border-white ring-2 ring-[#7056D8]/20 shadow-sm"
                  />
                  <span className="text-xs font-bold text-[#252333] pr-1">
                    {currentUser?.name?.split(' ')[0] || 'Me'}
                  </span>
                </Link>

                <button
                  onClick={logout}
                  className="p-2 text-[#656377] hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm" icon={ArrowRight}>
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#252333] hover:bg-[#F0ECFF] transition-colors focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[2]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[2]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200/80 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {isAuthenticated ? (
              /* Mobile Logged-In Links */
              <>
                <NavLink
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-base font-semibold text-[#252333] rounded-xl hover:bg-[#F0ECFF]/60 flex items-center gap-2"
                >
                  <Home className="w-5 h-5 text-[#7056D8]" />
                  <span>Home</span>
                </NavLink>

                <NavLink
                  to="/discover"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-base font-semibold text-[#252333] rounded-xl hover:bg-[#F0ECFF]/60 flex items-center gap-2"
                >
                  <Compass className="w-5 h-5 text-[#7056D8]" />
                  <span>Discover</span>
                </NavLink>

                <NavLink
                  to="/matches"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-base font-semibold text-[#252333] rounded-xl hover:bg-[#F0ECFF]/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#FF8BA7]" />
                    <span>Matches</span>
                  </div>
                  {matches.length > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#FF8BA7] text-white text-xs font-bold flex items-center justify-center">
                      {matches.length}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/chat"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-base font-semibold text-[#252333] rounded-xl hover:bg-[#F0ECFF]/60 flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5 text-[#7056D8]" />
                  <span>Chats</span>
                </NavLink>

                <NavLink
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-base font-semibold text-[#252333] rounded-xl hover:bg-[#F0ECFF]/60 flex items-center gap-2"
                >
                  <User className="w-5 h-5 text-[#7056D8]" />
                  <span>My Profile</span>
                </NavLink>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      navigate('/');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-bold text-rose-600 rounded-xl hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </>
            ) : (
              /* Mobile Guest Links */
              <>
                <Link
                  to="/"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 text-base font-semibold text-[#252333] rounded-xl hover:bg-[#F0ECFF]/60"
                >
                  Home
                </Link>
                <button
                  onClick={() => handleNavClick('how-it-works')}
                  className="w-full text-left px-4 py-2.5 text-base font-medium text-[#656377] rounded-xl hover:bg-[#F0ECFF]/60 cursor-pointer"
                >
                  How It Works
                </button>
                <button
                  onClick={() => handleNavClick('why-roomigo')}
                  className="w-full text-left px-4 py-2.5 text-base font-medium text-[#656377] rounded-xl hover:bg-[#F0ECFF]/60 cursor-pointer"
                >
                  About Us
                </button>
                <button
                  onClick={() => handleNavClick('explore-homes')}
                  className="w-full text-left px-4 py-2.5 text-base font-medium text-[#656377] rounded-xl hover:bg-[#F0ECFF]/60 cursor-pointer"
                >
                  Explore Homes
                </button>

                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full" icon={LogIn}>
                      Log In
                    </Button>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button variant="primary" className="w-full" icon={ArrowRight}>
                      Get Started
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
