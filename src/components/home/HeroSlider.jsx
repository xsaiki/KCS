import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronRight } from 'lucide-react';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Welcome to KCS Gicumbi Campus',
      subtitle: 'Nurturing Young Minds in Christ',
      description: 'Providing high-quality Christian education to children from all walks of life.',
      animation: 'animate-fade-in'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Academic Excellence',
      subtitle: 'Discipline and Excellence',
      description: 'Our students perform with a high level of excellence in national exams.',
      animation: 'animate-slide-up'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Spiritual Formation',
      subtitle: 'Christ-Centeredness',
      description: 'Intentionally providing spiritual formation sessions through devotions and chapels.',
      animation: 'animate-fade-in'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    pauseOnHover: false,
    arrows: false,
  };

  return (
    <div className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden">
      <Slider {...settings} className="h-full">
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[85vh] md:h-[90vh] w-full">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-kcsBlue/90 to-kcsBlue/40"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-start max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className={`max-w-2xl text-white ${slide.animation}`}>
                <span className="inline-block py-1 px-3 rounded-full bg-kcsYellow text-kcsBlue-dark text-xs font-bold tracking-wider mb-4 uppercase">
                  {slide.subtitle}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed drop-shadow-md">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/admissions" className="bg-kcsYellow text-kcsBlue-dark font-bold px-8 py-3 rounded-lg hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 shadow-lg">
                    Apply Now <ChevronRight size={20} />
                  </a>
                  <a href="/about" className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-kcsBlue transition-all duration-300 flex items-center justify-center">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom Animation Overrides for Slick */}
      <style jsx>{`
        .slick-slide {
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }
        .slick-slide.slick-active {
          opacity: 1;
        }
        .slick-list, .slick-track {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;