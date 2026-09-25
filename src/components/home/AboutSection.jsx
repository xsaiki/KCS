import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Heart, Award } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <BookOpen size={32} className="text-kcsBlue" />,
      title: 'Academic Excellence',
      desc: 'Our motto "Discipline and Excellence" drives students to perform highly in day-to-day studies and national exams.'
    },
    {
      icon: <Heart size={32} className="text-kcsBlue" />,
      title: 'Spiritual Formation',
      desc: 'Intentional spiritual formation sessions through devotions and chapels to expose students to biblical scriptures.'
    },
    {
      icon: <Users size={32} className="text-kcsBlue" />,
      title: 'Extracurricular Activities',
      desc: 'Developing individual talents in sports, traditional dance, public speaking, and more.'
    },
    {
      icon: <Award size={32} className="text-kcsBlue" />,
      title: 'Trilingual Proficiency',
      desc: 'Students become proficient in English, French, and Kinyarwanda, preparing them for a globalized world.'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="section-padding bg-gray-50"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose KCS Gicumbi?</h2>
        <div className="w-24 h-1 bg-kcsYellow mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          We are a Christian school dedicated to transforming young people into the likeness of Christ and equipping them to serve God in their community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={index}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-kcsBlue group-hover:text-white transition-colors duration-300">
              {React.cloneElement(feature.icon, { className: 'group-hover:text-white transition-colors' })}
            </div>
            <h3 className="text-xl font-bold mb-3 text-kcsBlue">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default AboutSection;