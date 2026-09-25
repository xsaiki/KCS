import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const NewsCard = ({ news, onClick }) => {
  const [bgIndex, setBgIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const images = news.images && news.images.length >= 3 ? news.images : [news.image, news.image, news.image];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Only "Read More" triggers this
  const handleReadMore = (e) => {
    e.stopPropagation();
    onClick?.(news);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-[440px] group"
    >
      {/* Background Slideshow (full card) */}
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              i === bgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        {/* Hover Overlay — 60% from bottom */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[60%] transition-transform duration-500 ease-out
                      ${hovered ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className="absolute inset-0 bg-kcsBlue/95 backdrop-blur-sm" />
          <div className="relative h-full flex flex-col justify-end p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-kcsYellow mb-2">
              {news.category}
            </p>
            <h3 className="text-lg font-bold text-white leading-snug mb-3 line-clamp-3">
              {news.title}
            </h3>
            <p className="text-sm text-gray-100 leading-relaxed line-clamp-4 mb-4">
              {news.excerpt}
            </p>
            {/* READ MORE — only clickable element that opens modal */}
            <button
              type="button"
              onClick={handleReadMore}
              className="inline-flex items-center gap-2 text-kcsYellow font-semibold text-sm hover:gap-3 transition-all self-start"
              aria-label={`Read more about ${news.title}`}
            >
              Read More <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Top Layer Info (always visible) — NOT clickable */}
      <div className="relative z-10 p-5 flex flex-col h-full justify-between pointer-events-none">
        <div className="flex items-start justify-between">
          <span className="bg-kcsYellow text-kcsBlue-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase">
            {news.category}
          </span>
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === bgIndex ? 'w-4 bg-kcsYellow' : 'w-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom info (hidden when hovered so overlay takes over) */}
        <div className={`transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex items-center gap-3 text-[10px] text-gray-200 mb-2">
            <span className="flex items-center gap-1"><Calendar size={11} /> {news.date}</span>
            <span className="flex items-center gap-1"><User size={11} /> {news.author}</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2 drop-shadow-md">
            {news.title}
          </h3>
        </div>
      </div>

      {/* Ensure hover overlay can receive clicks only when visible */}
      <div
        className={`absolute inset-0 z-20 ${hovered ? 'pointer-events-auto' : 'pointer-events-none'}`}
      />
    </motion.article>
  );
};

export default NewsCard;