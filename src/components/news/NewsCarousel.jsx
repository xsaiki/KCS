import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const NewsCarousel = ({ newsItems, onReadMore }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Desktop arrows */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-kcsBlue hover:bg-kcsBlue hover:text-white transition"
        aria-label="Scroll left"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-kcsBlue hover:bg-kcsBlue hover:text-white transition"
        aria-label="Scroll right"
      >
        <ChevronRight size={22} />
      </button>

      {/* Scroller */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory md:snap-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {newsItems.map((news, idx) => (
          <CarouselCard key={news.id} news={news} idx={idx} onReadMore={onReadMore} />
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

// Inner card — only "Read More" button opens modal
const CarouselCard = ({ news, idx, onReadMore }) => {
  const [hovered, setHovered] = useState(false);

  const handleReadMore = (e) => {
    e.stopPropagation();
    onReadMore?.(news);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="shrink-0 snap-start group
                 w-[75vw] sm:w-[45vw] md:w-[340px] lg:w-[360px]"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition h-[440px]">
        {/* Main image */}
        <img
          src={news.image}
          alt={news.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        {/* Hover overlay 60% */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[60%] transition-transform duration-500 ease-out
                      ${hovered ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className="absolute inset-0 bg-kcsBlue/95 backdrop-blur-sm" />
          <div className="relative h-full flex flex-col justify-end p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-kcsYellow mb-2">{news.category}</p>
            <h3 className="text-base font-bold text-white leading-snug mb-2 line-clamp-3">{news.title}</h3>
            <p className="text-xs text-gray-100 leading-relaxed line-clamp-3 mb-3">{news.excerpt}</p>
            <button
              type="button"
              onClick={handleReadMore}
              className="inline-flex items-center gap-1 text-kcsYellow text-xs font-semibold hover:gap-2 transition-all self-start"
              aria-label={`Read more about ${news.title}`}
            >
              Read More <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Author avatar pill */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <div className="w-8 h-8 rounded-full bg-kcsYellow border-2 border-white flex items-center justify-center text-kcsBlue-dark font-bold text-xs">
            KCS
          </div>
          <span className="text-white text-xs font-medium">{news.author}</span>
        </div>

        {/* Category tag */}
        <span className="absolute top-3 right-3 bg-kcsYellow text-kcsBlue-dark text-[10px] font-bold px-2 py-1 rounded-full uppercase z-10">
          {news.category}
        </span>

        {/* Bottom info — hidden on hover */}
        <div className={`absolute bottom-0 left-0 right-0 p-5 text-white transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'} pointer-events-none`}>
          <div className="flex items-center gap-2 text-xs text-gray-300 mb-1.5">
            <Calendar size={12} /> {news.date}
          </div>
          <h3 className="font-bold text-lg leading-snug mb-1 line-clamp-2">{news.title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCarousel;