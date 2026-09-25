import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ExternalLink, Search } from 'lucide-react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useWindowSize } from '../../hooks/useWindowSize';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const scrollDirection = useScrollDirection();
  const { width } = useWindowSize();
  const location = useLocation();
  const isMobile = width < 768;
  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'News', path: '/news' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;
  const shouldHide = isHome && scrollDirection === 'down' && !isOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-500 ease-in-out ${
        shouldHide ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="bg-kcsBlue-dark text-white text-[10px] sm:text-xs py-1 px-3">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-1">
          <span className="truncate">📍 Kigali Cell, Byumba Sector, Gicumbi District</span>
          <span className="hidden sm:block truncate">📞 +250 782 887 260 | ✉️ eck.yfc@gmail.com</span>
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20 gap-3">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-10 h-10 bg-kcsBlue rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:bg-kcsBlue-dark transition">
                K
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-kcsBlue text-lg leading-tight">KCS</span>
                <span className="text-[9px] text-gray-500 font-semibold tracking-wider">GICUMBI CAMPUS</span>
              </div>
            </Link>

            {/* Desktop nav + search */}
            <div className="hidden lg:flex items-center flex-grow justify-end gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-kcsBlue bg-blue-50'
                      : 'text-gray-600 hover:text-kcsBlue hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://kigalichristianschool.rw/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-kcsBlue hover:bg-gray-50 transition-colors flex items-center gap-1"
              >
                Kigali <ExternalLink size={12} />
              </a>

              {/* Desktop Search */}
              <div className="ml-2">
                <SearchBar variant="desktop" />
              </div>

              <Link to="/dashboard" className="ml-1 btn-primary text-sm py-2 px-4">
                My Portal
              </Link>
            </div>

            {/* Tablet: nav (no search) + mobile toggle */}
            <div className="hidden md:flex lg:hidden items-center gap-2">
              <SearchBar variant="desktop" />
              <Link to="/dashboard" className="btn-primary text-xs py-2 px-3">Portal</Link>
            </div>

            {/* Mobile: search icon + menu toggle */}
            <div className="md:hidden flex items-center gap-1">
              <button
                onClick={() => setMobileSearchOpen((s) => !s)}
                className="text-gray-600 hover:text-kcsBlue p-2"
                aria-label="Search"
              >
                <Search size={22} />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-kcsBlue focus:outline-none p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search dropdown */}
        {mobileSearchOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-3 py-3 relative z-[130]">
            <SearchBar variant="mobile" onClose={() => setMobileSearchOpen(false)} />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 top-[64px] bottom-0 bg-white/95 backdrop-blur-md z-[130] transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex flex-col p-4 sm:p-5 space-y-2 h-full overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium border transition-all ${
                isActive(link.path)
                  ? 'bg-kcsBlue text-white border-kcsBlue shadow-sm'
                  : 'bg-gray-50 text-gray-700 border-gray-100 active:bg-gray-100'
              }`}
            >
              {link.name}
              <ChevronRight size={18} />
            </Link>
          ))}
          <a
            href="https://kigalichristianschool.rw/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium bg-gray-50 text-gray-700 border border-gray-100"
          >
            Kigali Campus <ExternalLink size={16} />
          </a>
          <div className="pt-3 mt-2 border-t border-gray-200">
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="btn-primary w-full text-center block py-3">
              My Portal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;