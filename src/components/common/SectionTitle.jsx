import React from 'react';

const SectionTitle = ({ subtitle, title, description, light = false, align = 'center' }) => {
  const alignClass = align === 'left' ? 'text-left' : 'text-center mx-auto';
  return (
    <div className={`mb-12 max-w-3xl ${alignClass}`}>
      {subtitle && (
        <span className={`font-bold tracking-wider uppercase text-sm mb-2 block ${light ? 'text-kcsYellow' : 'text-kcsRed'}`}>
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-kcsBlue'}`}>
        {title}
      </h2>
      <div className={`w-24 h-1 bg-kcsYellow mb-6 ${align === 'center' ? 'mx-auto' : ''}`}></div>
      {description && (
        <p className={`text-lg leading-relaxed ${light ? 'text-gray-200' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;