import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import AboutSection from '../components/home/AboutSection';
import CoreValues from '../components/home/CoreValues';
import AcademicsSection from '../components/home/AcademicsSection';
import Extracurricular from '../components/home/Extracurricular';
import CallToAction from '../components/home/CallToAction';

const Home = () => {
  return (
    <>
      <HeroSlider />
      <AboutSection />
      <CoreValues />
      <AcademicsSection />
      <Extracurricular />
      <CallToAction />
    </>
  );
};

export default Home;