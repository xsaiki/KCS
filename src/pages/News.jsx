import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import NewsCard from '../components/news/NewsCard';
import NewsCarousel from '../components/news/NewsCarousel';
import NewsModal from '../components/news/NewsModal';
import SectionTitle from '../components/common/SectionTitle';
import { newsItems, categories, searchNews } from '../data/newsData';

const News = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const [filter, setFilter] = useState('All');
  const [localQuery, setLocalQuery] = useState(urlQuery);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    setLocalQuery(urlQuery);
  }, [urlQuery]);

  const filteredNews = useMemo(() => {
    let list = newsItems;
    if (filter !== 'All') {
      list = list.filter((n) => n.category === filter);
    }
    if (localQuery.trim()) {
      list = searchNews(localQuery, list);
    }
    return list;
  }, [filter, localQuery]);

  const clearSearch = () => {
    setLocalQuery('');
    setSearchParams({});
  };

  return (
    <div className="animate-fade-in">
      {/* Hero 95vh */}
      <div className="relative h-[95vh] -mt-16 md:-mt-20 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="News"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-kcsBlue/85" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">News & Updates</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
            Stay informed about the latest happenings at KCS Gicumbi Campus.
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <section className="py-14 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <SectionTitle subtitle="Featured" title="Trending Stories" description="Swipe through our most recent highlights." />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsCarousel newsItems={newsItems.slice(0, 5)} onReadMore={setSelectedNews} />
        </div>
      </section>

      {/* Grid + filters */}
      <section className="section-padding">
        {localQuery.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-3 justify-center"
          >
            <span className="text-sm text-gray-600">
              Showing results for <strong className="text-kcsBlue">"{localQuery}"</strong>
              <span className="text-gray-400"> — {filteredNews.length} found</span>
            </span>
            <button
              onClick={clearSearch}
              className="flex items-center gap-1 text-xs font-semibold text-kcsRed bg-red-50 hover:bg-red-100 px-3 py-1 rounded-full transition"
            >
              <X size={12} /> Clear
            </button>
          </motion.div>
        )}

        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                filter === cat ? 'bg-kcsBlue text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} onClick={setSelectedNews} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No news found.</p>
            {(localQuery || filter !== 'All') && (
              <button
                onClick={() => { clearSearch(); setFilter('All'); }}
                className="mt-4 btn-primary text-sm"
              >
                Reset filters
              </button>
            )}
          </div>
        )}
      </section>

      {/* Modal — only opens on "Read More" click */}
      <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </div>
  );
};

export default New