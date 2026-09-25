import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import AboutSection from '../components/home/AboutSection';
import CoreValues from '../components/home/CoreValues';
import AcademicsSection from '../components/home/AcademicsSection';
import Extracurricular from '../components/home/Extracurricular';
import CallToAction from '../components/home/CallToAction';
import NewsCarousel from '../components/news/NewsCarousel';
import SectionTitle from '../components/common/SectionTitle';

const Home = () => {
  const previewNews = [
    {
      id: 1,
      title: 'End of Term Examinations Begin Next Week',
      excerpt: 'All students from Nursery to P5 will begin their end-of-term examinations starting Monday.',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      date: 'June 5, 2025',
      author: 'Admin',
      category: 'Academics',
    },
    {
      id: 2,
      title: 'Annual Spiritual Retreat a Success',
      excerpt: 'Our annual spiritual retreat brought together students, teachers and parents for a powerful time of worship.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      date: 'May 28, 2025',
      author: 'Chaplaincy',
      category: 'Spiritual',
    },
    {
      id: 3,
      title: 'KCS Wins Inter-School Football Tournament',
      excerpt: 'Our young athletes made us proud by winning the district-level football tournament. Congratulations!',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      date: 'May 20, 2025',
      author: 'Sports Dept',
      category: 'Sports',
    },
    {
      id: 4,
      title: 'New Library Books Donated by Partners',
      excerpt: 'We are grateful to our partners for donating over 500 new books to our school library.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      date: 'May 15, 2025',
      author: 'Admin',
      category: 'Announcements',
    },
  ];

  return (
    <>
      <HeroSlider />
      <AboutSection />
      <CoreValues />

      {/* News Carousel Section */}
      <section className="py-16 md:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <SectionTitle
            subtitle="Stay Updated"
            title="Latest News & Events"
            description="Swipe through recent happenings, announcements, and stories from our campus."
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsCarousel newsItems={previewNews} />
        </div>
      </section>

      <AcademicsSection />
      <Extracurricular />
      <CallToAction />
    </>
  );
};

export default Home;