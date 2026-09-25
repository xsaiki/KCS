import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { newsItems, searchNews } from '../../data/newsData';

const SearchBar = ({ variant = 'desktop', onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Live search
  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }
    const results = searchNews(query).slice(0, 6);
    setSuggestions(results);
    setActiveIndex(-1);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Highlight query in text
  const highlight = (text, q) => {
    if (!q.trim()) return text;
    const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase() ? (
        <mark key={i} className="bg-kcsYellow/60 text-kcsBlue-dark rounded px-0.5">{part}</mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const goToNews = (searchQuery) => {
    setIsFocused(false);
    setQuery('');
    onClose?.();
    navigate(`/news?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        goToNews(suggestions[activeIndex].title);
      } else if (query.trim()) {
        goToNews(query);
      }
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      onClose?.();
    }
  };

  const isMobile = variant === 'mobile';

  return (
    <div ref={wrapperRef} className={`relative ${isMobile ? 'w-full' : 'w-11 transition-all duration-200 ease-out group hover:w-64 focus-within:w-64 overflow-hidden'}`}>
      {/* Input */}
      <div className={`relative flex items-center bg-gray-50 border rounded-full transition-all duration-200 ease-out ${
        isFocused ? 'border-kcsBlue ring-2 ring-kcsBlue/15 bg-white' : 'border-gray-200 group-hover:border-kcsBlue/50 group-hover:bg-white'
      } ${isMobile ? 'w-full' : 'w-11 group-hover:w-64 focus-within:w-64'}`}>
        <Search size={16} className="absolute left-3 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Search news..."
          className={`bg-transparent text-sm outline-none placeholder:text-gray-400 transition-all duration-200 ease-out ${
            isMobile ? 'w-full pl-9 pr-9 py-2 opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100 group-focus-within:w-full group-focus-within:opacity-100 pl-0 group-hover:pl-9 group-focus-within:pl-9 pr-9 py-2'
          }`}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            className="absolute right-3 text-gray-400 hover:text-kcsRed"
            aria-label="Clear"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isFocused && query.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-[60] ${
              isMobile ? 'left-0 right-0' : 'left-0 right-0'
            }`}
          >
            {suggestions.length > 0 ? (
              <>
                <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100 flex items-center justify-between">
                  <span>{suggestions.length} match{suggestions.length > 1 ? 'es' : ''}</span>
                  <span className="hidden sm:inline">↑↓ to navigate, ↵ to open</span>
                </div>
                <ul className="max-h-80 overflow-y-auto">
                  {suggestions.map((item, idx) => (
                    <li key={item.id}>
                      <button
                        onClick={() => goToNews(item.title)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`w-full flex items-start gap-3 p-3 text-left transition ${
                          activeIndex === idx ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-grow">
                          <p className="text-sm font-semibold text-kcsBlue line-clamp-1">
                            {highlight(item.title, query)}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {highlight(item.excerpt, query)}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                            <span className="flex items-center gap-1"><Calendar size={10} /> {item.date}</span>
                            <span className="px-1.5 py-0.5 bg-gray-100 rounded">{item.category}</span>
                          </div>
                        </div>
                        <ArrowRight size={14} className={`shrink-0 mt-1 ${activeIndex === idx ? 'text-kcsBlue' : 'text-gray-300'}`} />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-100 p-2 bg-gray-50">
                  <button
                    onClick={() => goToNews(query)}
                    className="w-full text-xs font-semibold text-kcsBlue hover:text-kcsBlue-dark py-1.5 flex items-center justify-center gap-1"
                  >
                    See all results for "{query}" <ArrowRight size={12} />
                  </button>
                </div>
              </>
            ) : (
              <div className="p-6 text-center">
                <FileText size={28} className="mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-500">No results for <strong>"{query}"</strong></p>
                <p className="text-xs text-gray-400 mt-1">Try different keywords or browse all news.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;