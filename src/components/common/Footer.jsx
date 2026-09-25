import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-kcsBlue-dark text-white pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-kcsBlue font-bold">K</div>
              <h3 className="text-xl font-bold text-white">KCS Gicumbi</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              To develop excellent institutions of education that provide students an excellent Christian learning environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-kcsYellow transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-kcsYellow transition"><Twitter size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-kcsYellow transition"><Instagram size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-kcsYellow transition"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-kcsYellow transition">About Us</Link></li>
              <li><Link to="/admissions" className="hover:text-kcsYellow transition">Admissions</Link></li>
              <li><Link to="/news" className="hover:text-kcsYellow transition">News & Updates</Link></li>
              <li><Link to="/faq" className="hover:text-kcsYellow transition">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-kcsYellow transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-kcsYellow mt-0.5 shrink-0" />
                <span>Kigali Cell, Byumba Sector,<br />Gicumbi District, Rwanda</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-kcsYellow shrink-0" />
                <span>+250 782 887 260 / 078 855 8973</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-kcsYellow shrink-0" />
                <span>eck.yfc@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Motto */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Our Motto</h4>
            <p className="text-kcsYellow font-bold text-xl mb-4">"Discipline and Excellence"</p>
            <p className="text-sm text-gray-300 mb-4">
              Join our community and stay updated with the latest news.
            </p>
            <Link to="/register" className="inline-block bg-kcsYellow text-kcsBlue-dark font-bold px-6 py-2 rounded-lg hover:bg-yellow-400 transition">
              Request Admission
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Kigali Christian School - Gicumbi Campus. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Part of YFC Rwanda</p>
        </div>
      </div>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-kcsYellow text-kcsBlue-dark p-3 rounded-full shadow-lg transition-all duration-300 z-50 hover:bg-yellow-400 hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;