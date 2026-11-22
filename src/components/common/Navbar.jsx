import React, { useState } from 'react';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import {
  Compass,
  Heart,
  MessageSquare,
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
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

  const navLinkClass =
    'text-[11px] uppercase tracking-[0.22em] font-medium text-[#374435] hover:text-[#556852] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#556852] hover:after:w-full after:transition-all';

  const loggedInLinkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
      isActive
        ? 'text-[#232B20] bg-[#EBF1EA] border border-[#556852]/20'
        : 'text-[#616E5E] hover:text-[#232B20] hover:bg-[#EBF1EA]/60'
    }`;

  const currentAvatar =
    currentUser?.profile?.profilePic ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#556852]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Left Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 flex-1">
            <Link to="/" className={navLinkClass}>
              Home
            </Link>
            <button
              onClick={() => handleNavClick('explore-spaces')}
              className={navLinkClass}
            >
              Spaces
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={navLinkClass}
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('community')}
              className={navLinkClass}
            >
              Community
            </button>
          </nav>

          {/* Center Brand Emblem Inspired by the Aesthetic Screenshot */}
          <div className="flex-1 flex justify-start lg:justify-center">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col items-center group text-center"
            >
              {/* Arched Crest / Sunburst Flower Badge */}
              <div className="flex items-center gap-1.5 text-[#556852] text-[10px] uppercase tracking-[0.25em] font-medium mb-0.5 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-[#C59B27] inline-block">✦</span>
                <span className="hidden sm:inline">Roomigo Living</span>
                <span className="text-[#556852] inline-block animate-spin-slow">❋</span>
              </div>

              {/* Serene Editorial Serif Logo */}
              <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#232B20] lowercase leading-none">
                roomigo
              </h1>
            </Link>
          </div>

          {/* Right Navigation & CTAs (Desktop) */}
          <div className="hidden lg:flex items-center justify-end gap-5 flex-1">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <NavLink to="/discover" className={loggedInLinkClass}>
                  <Compass className="w-3.5 h-3.5" />
                  <span>Discover</span>
                </NavLink>

                <NavLink to="/matches" className={loggedInLinkClass}>
                  <div className="relative flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    <span>Matches</span>
                    {matches.length > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#D47A60] text-white text-[10px] font-bold flex items-center justify-center">
                        {matches.length}
                      </span>
                    )}
                  </div>
                </NavLink>

                <NavLink to="/chat" className={loggedInLinkClass}>
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Messages</span>
                </NavLink>

                {/* Profile Pill */}
                <div className="flex items-center gap-2 pl-2 border-l border-[#556852]/15">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 hover:opacity-85 transition-opacity"
                    title="View Profile"
                  >
                    <img
                      src={currentAvatar}
                      alt={currentUser?.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover border border-[#556852]/20"
                    />
                    <span className="text-xs font-medium text-[#232B20] max-w-[90px] truncate">
                      {currentUser?.name?.split(' ')[0]}
                    </span>
                  </Link>

                  <button
                    onClick={logout}
                    title="Log Out"
                    className="p-1.5 text-[#616E5E] hover:text-[#D47A60] rounded-full hover:bg-[#EBF1EA] transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#374435] hover:text-[#556852] transition-colors"
                >
                  Log In
                </Link>
                <Link to="/signup">
                  <Button
                    variant="sand"
                    size="pill"
                    className="border border-[#556852]/30 hover:border-[#556852] hover:bg-[#FAF6EE] shadow-none"
                  >
                    Start Now
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {isAuthenticated && (
              <Link to="/profile" className="p-1">
                <img
                  src={currentAvatar}
                  alt={currentUser?.name || 'User'}
                  className="w-8 h-8 rounded-full object-cover border border-[#556852]/20"
                />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#232B20] hover:bg-[#EBF1EA] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#556852]/10 bg-[#FAF6EE] px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3 pb-4 border-b border-[#556852]/10">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-[#232B20] uppercase tracking-wider"
            >
              Home
            </Link>
            <button
              onClick={() => handleNavClick('explore-spaces')}
              className="text-left text-sm font-medium text-[#232B20] uppercase tracking-wider"
            >
              Curated Spaces
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left text-sm font-medium text-[#232B20] uppercase tracking-wider"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('community')}
              className="text-left text-sm font-medium text-[#232B20] uppercase tracking-wider"
            >
              Life at Roomigo
            </button>
          </div>

          {isAuthenticated ? (
            <div className="space-y-3 pt-2">
              <Link
                to="/discover"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-[#232B20]"
              >
                <Compass className="w-4 h-4 text-[#556852]" />
                Discover Flatmates
              </Link>
              <Link
                to="/matches"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-[#232B20]"
              >
                <Heart className="w-4 h-4 text-[#556852]" />
                Matches ({matches.length})
              </Link>
              <Link
                to="/chat"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-[#232B20]"
              >
                <MessageSquare className="w-4 h-4 text-[#556852]" />
                Messages
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-[#232B20]"
              >
                <User className="w-4 h-4 text-[#556852]" />
                My Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm font-medium text-[#D47A60] pt-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full border border-[#556852]/30 text-xs uppercase tracking-widest text-[#232B20]"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <Button variant="sage" size="md" className="w-full text-xs uppercase tracking-widest">
                  Start Now
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
