import { useState, useEffect, useRef } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const prevOffsetRef = useRef(0);

  useEffect(() => {
    const toggleScrollDirection = () => {
      const scrollY = window.pageYOffset;
      if (scrollY === 0) {
        setScrollDirection('up');
        prevOffsetRef.current = 0;
        return;
      }
      if (scrollY > prevOffsetRef.current) {
        setScrollDirection('down');
      } else if (scrollY < prevOffsetRef.current) {
        setScrollDirection('up');
      }
      prevOffsetRef.current = scrollY;
    };

    window.addEventListener('scroll', toggleScrollDirection);
    return () => window.removeEventListener('scroll', toggleScrollDirection);
  }, []);

  return scrollDirection;
};
