import React, { useState } from 'react';
import NewsCard from '../components/news/NewsCard';
import SectionTitle from '../components/common/SectionTitle';

const News = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Academics', 'Spiritual', 'Sports', 'Events', 'Announcements'];

  const newsItems = [
    {
      id: 1,
      title: 'End of Term Examinations Begin Next Week',
      excerpt: 'All students from Nursery to P3 will begin their end-of-term examinations starting Monday. Please ensure your child is well prepared.',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: 'June 5, 2025',
      author: 'Admin',
      category: 'Academics',
    },
    {
      id: 2,
      title: 'Annual Spiritual Retreat a Success',
      excerpt: 'Our annual spiritual retreat brought together students, teachers and parents for a powerful time of worship and biblical teaching.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: 'May 28, 2025',
      author: 'Chaplaincy',
      category: 'Spiritual',
    },
    {
      id: 3,
      title: 'KCS Wins Inter-School Football Tournament',
      excerpt: 'Our young athletes made us proud by winning the district-level football tournament. Congratulations to the team!',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: 'May 20, 2025',
      author: 'Sports Dept',
      category: 'Sports',
    },
    {
      id: 4,
      title: 'New Library Books Donated by Partners',
      excerpt: 'We are grateful to our partners for donating over 500 new books to our school library, enriching our students\' reading experience.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: 'May 15, 2025',
      author: 'Admin',
      category: 'Announcements',
    },
    {
      id: 5,
      title: 'Parent-Teacher Conference Scheduled',
      excerpt: 'Mark your calendars! Our next parent-teacher conference will be held on the last Saturday of this month. Attendance is highly encouraged.',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: 'May 10, 2025',
      author: 'Admin',
      category: 'Events',
    },
    {
      id: 6,
      title: 'Cultural Day Celebrations',
      excerpt: 'Students showcased the beauty of Rwandan culture through traditional dance, poetry, and art during our annual Cultural Day.',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: 'May 2, 2025',
      author: 'Cultural Club',
      category: 'Events',
    },
  ];

  const filteredNews = filter === 'All' ? newsItems : newsItems.filter((n) => n.category === filter);

  return (
    <div className="animate-fade-in">
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="News"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-kcsBlue/80"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">News & Updates</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Stay informed about the latest happenings at KCS Gicumbi Campus.
          </p>
        </div>
      </div>

      <section className="section-padding">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === cat
                  ? 'bg-kcsBlue text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No news found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default News;