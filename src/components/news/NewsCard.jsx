import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const NewsCard = ({ news }) => {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-kcsYellow text-kcsBlue-dark text-xs font-bold px-3 py-1 rounded-full uppercase">
          {news.category}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1"><Calendar size={14} /> {news.date}</span>
          <span className="flex items-center gap-1"><User size={14} /> {news.author}</span>
        </div>
        <h3 className="text-lg font-bold text-kcsBlue mb-3 line-clamp-2 group-hover:text-kcsRed transition-colors">
          {news.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{news.excerpt}</p>
        <button className="text-kcsBlue font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all self-start">
          Read More <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
};

export default NewsCard;