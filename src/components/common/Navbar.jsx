import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Compass, Heart, MessageSquare, User, LogIn, UserPlus } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
      isActive
        ? 'text-indigo-600 bg-indigo-50 font-semibold'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-200">
              R
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Roomigo
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/discover" className={navLinkClass}>
              <Compass className="w-4 h-4" />
              <span>Discover</span>
            </NavLink>
            <NavLink to="/matches" className={navLinkClass}>
              <Heart className="w-4 h-4" />
              <span>Matches</span>
            </NavLink>
            <NavLink to="/chat" className={navLinkClass}>
              <MessageSquare className="w-4 h-4" />
              <span>Chat</span>
            </NavLink>
            <NavLink to="/profile" className={navLinkClass}>
              <User className="w-4 h-4" />
              <span>Profile</span>
            </NavLink>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm" icon={LogIn}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm" icon={UserPlus}>
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

