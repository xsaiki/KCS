import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';

// Typewriter Hook
const useTypewriter = (text, speed = 60, delay = 200) => {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setIsDone(false);
    let i = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.substring(0, i + 1));
          i++;
        } else {
          setIsDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return { displayed, isDone };
};

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    badge: 'Welcome to KCS Gicumbi Campus',
    title: 'Nurturing Young Minds in Christ',
    description: 'Providing high-quality Christian education to children from all walks of life.',
    // Slide 1 animations: fade-up title + slide-in-left description
    titleAnim: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: 'easeOut' } },
    descAnim: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay: 0.3 } },
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    badge: 'Discipline and Excellence',
    title: 'Academic Excellence Rooted in Faith',
    description: 'Our students perform with a high level of excellence in national exams.',
    // Slide 2 animations: scale-in title + slide-in-right description
    titleAnim: { initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8, ease: 'easeOut' } },
    descAnim: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay: 0.3 } },
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    badge: 'Christ-Centeredness',
    title: 'Spiritual Formation for Every Child',
    description: 'Intentionally providing spiritual formation sessions through devotions and chapels.',
    // Slide 3 animations: blur-in title + fade-up description
    titleAnim: { initial: { opacity: 0, filter: 'blur(10px)' }, animate: { opacity: 1, filter: 'blur(0px)' }, transition: { duration: 0.9 } },
    descAnim: { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.4 } },
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];
  const { displayed: typedTitle, isDone } = useTypewriter(slide.title, 55, 400);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-kcsBlue-dark">
      {/* Background Layers (crossfade) */}
      <AnimatePresence>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-kcsBlue/85 via-kcsBlue/70 to-kcsBlue-dark/90" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-4xl w-full text-center">
          {/* Badge */}
          <motion.span
            key={`badge-${slide.id}`}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1.5 px-4 rounded-full bg-kcsYellow text-kcsBlue-dark text-[10px] sm:text-xs font-bold tracking-wider mb-5 uppercase"
          >
            {slide.badge}
          </motion.span>

          {/* Typewriter Title */}
          <motion.h1
            key={`title-${slide.id}`}
            {...slide.titleAnim}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-white leading-tight min-h-[3.5rem] sm:min-h-[4.5rem] md:min-h-[5.5rem]"
          >
            {typedTitle}
            <span className={`inline-block w-[3px] h-[1em] bg-kcsYellow ml-1 align-middle ${isDone ? 'animate-pulse' : ''}`} />
          </motion.h1>

          {/* Description */}
          <motion.p
            key={`desc-${slide.id}`}
            {...slide.descAnim}
            className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed px-2"
          >
            {slide.description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4 sm:px-0"
          >
            <a
              href="/admissions"
              className="bg-kcsYellow text-kcsBlue-dark font-bold px-6 sm:px-8 py-3 rounded-lg hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              Apply Now <ChevronRight size={18} />
            </a>
            <a
              href="/about"
              className="border-2 border-white text-white font-bold px-6 sm:px-8 py-3 rounded-lg hover:bg-white hover:text-kcsBlue transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Learn More <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${
              current === i ? 'w-10 h-2 bg-kcsYellow' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;