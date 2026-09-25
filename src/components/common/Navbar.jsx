import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useWindowSize } from '../../hooks/useWindowSize';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollDirection = useScrollDirection();
  const { width } = useWindowSize();
  const location = useLocation();
  const isMobile = width < 768;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'News', path: '/news' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  // Hide navbar on scroll down (only on desktop, mobile keeps it for accessibility)
  const shouldHide = !isMobile && scrollDirection === 'down';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        shouldHide ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Top Bar (Contact Info) */}
      <div className={`bg-kcsBlue-dark text-white text-xs py-1 px-4 transition-all duration-300 ${shouldHide ? 'hidden' : 'block'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>📍 Kigali Cell, Byumba Sector, Gicumbi District</span>
          <span className="hidden sm:block">📞 +250 782 887 260 | ✉️ eck.yfc@gmail.com</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white/95 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-kcsBlue rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:bg-kcsBlue-dark transition">
                K
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-kcsBlue text-lg leading-tight">KCS</span>
                <span className="text-[10px] text-gray-500 font-semibold tracking-wider">GICUMBI CAMPUS</span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-1">
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
              <Link to="/login" className="ml-4 btn-primary text-sm py-2 px-4">
                Portal Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-kcsBlue focus:outline-none p-2"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
        style={{ top: '64px' }}
      >
        <div className="flex flex-col p-6 space-y-4 h-full overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between p-4 rounded-xl text-lg font-medium ${
                isActive(link.path)
                  ? 'bg-kcsBlue text-white'
                  : 'bg-gray-50 text-gray-700 active:bg-gray-100'
              }`}
            >
              {link.name}
              <ChevronRight size={20} />
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-200">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full text-center block"
            >
              Portal Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;