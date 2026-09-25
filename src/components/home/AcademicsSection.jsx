import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Globe, Book } from 'lucide-react';

const AcademicsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="section-padding bg-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div>
          <span className="text-kcsRed font-bold tracking-wider uppercase text-sm mb-2 block">Our Academics</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Building a Strong Foundation for Life</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            At KCS Gicumbi, we offer a comprehensive curriculum designed to challenge and inspire students from Nursery 1 (Baby Class) to Primary Five (P5). Our teachers are followers of Christ with a passion for academic excellence and leading students to the Lord.
          </p>
          
          <div className="space-y-6 mb-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <GraduationCap className="text-kcsBlue" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-kcsBlue">Excellent Learning Environment</h4>
                <p className="text-gray-600 text-sm">Fostering spiritual growth and discovering individual student potentials.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <Globe className="text-kcsBlue" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-kcsBlue">Trilingual Proficiency</h4>
                <p className="text-gray-600 text-sm">Students are proficient in English, French, and Kinyarwanda.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <Book className="text-kcsBlue" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-kcsBlue">Christ-Like Servants</h4>
                <p className="text-gray-600 text-sm">Equipping students to become servants in their community.</p>
              </div>
            </div>
          </div>
          
          <a href="/admissions" className="btn-primary inline-block">View Admission Details</a>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          <img 
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Students learning" 
            className="rounded-2xl w-full h-48 md:h-64 object-cover shadow-lg mt-8"
          />
          <img 
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Classroom" 
            className="rounded-2xl w-full h-48 md:h-64 object-cover shadow-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="School building" 
            className="rounded-2xl w-full h-48 md:h-64 object-cover shadow-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Kids playing" 
            className="rounded-2xl w-full h-48 md:h-64 object-cover shadow-lg mt-8"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default AcademicsSection;