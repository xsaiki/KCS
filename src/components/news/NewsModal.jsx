import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Tag, ChevronLeft, ChevronRight, Share2, BookOpen } from 'lucide-react';

const NewsModal = ({ news, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (news) {
      setActiveImg(0);
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [news]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (news && e.key === 'ArrowRight') setActiveImg((i) => (i + 1) % news.images.length);
      if (news && e.key === 'ArrowLeft') setActiveImg((i) => (i - 1 + news.images.length) % news.images.length);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [news, onClose]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (!news) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-start md:items-center justify-center p-0 md:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.97, y: 20, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-none md:rounded-2xl shadow-2xl w-full max-w-4xl my-0 md:my-8 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Hero Image Gallery */}
          <div className="relative h-[260px] sm:h-[340px] md:h-[420px] bg-kcsBlue-dark overflow-hidden">
            {news.images.map((img, i) => (
              <div
                key={i}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                  i === activeImg ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Prev/Next */}
            {news.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImg((i) => (i - 1 + news.images.length) % news.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white/40 transition"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setActiveImg((i) => (i + 1) % news.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white/40 transition"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* Category + Title over image */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
              <span className="inline-block bg-kcsYellow text-kcsBlue-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-3">
                {news.category}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight drop-shadow-lg">
                {news.title}
              </h1>
            </div>

            {/* Dots */}
            {news.images.length > 1 && (
              <div className="absolute top-4 left-4 flex gap-1.5">
                {news.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`transition-all rounded-full ${
                      i === activeImg ? 'w-6 h-1.5 bg-kcsYellow' : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                    }`}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {news.images.length > 1 && (
            <div className="flex gap-2 px-5 md:px-8 py-3 bg-gray-50 border-b border-gray-100 overflow-x-auto scrollbar-hide">
              {news.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition ${
                    i === activeImg ? 'border-kcsBlue' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Meta Row */}
          <div className="px-5 md:px-8 pt-5 flex flex-wrap items-center gap-4 text-xs text-gray-500 border-b border-gray-100 pb-4">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {news.date}</span>
            <span className="flex items-center gap-1.5"><User size={14} /> {news.author}</span>
            <span className="flex items-center gap-1.5"><Tag size={14} /> {news.category}</span>
            <button
              onClick={handleShare}
              className="ml-auto flex items-center gap-1.5 text-kcsBlue font-semibold hover:underline"
            >
              <Share2 size={14} /> {copied ? 'Link copied!' : 'Share'}
            </button>
          </div>

          {/* Content */}
          <div className="px-5 md:px-8 py-6 md:py-8">
            <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {news.content}
            </div>

            {/* Footer CTA */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-kcsBlue rounded-full flex items-center justify-center text-white font-bold">
                  K
                </div>
                <div>
                  <p className="text-sm font-semibold text-kcsBlue">KCS Gicumbi Campus</p>
                  <p className="text-xs text-gray-500">Discipline and Excellence</p>
                </div>
              </div>
              <a
                href="/news"
                onClick={(e) => { e.preventDefault(); onClose(); }}
                className="btn-primary text-sm py-2 px-5 flex items-center gap-2"
              >
                <BookOpen size={14} /> Back to All News
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </AnimatePresence>
  );
};

export default NewsModal;