import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, Cross, Handshake, Target } from 'lucide-react';

const CoreValues = () => {
  const values = [
    { icon: <ShieldCheck size={40} />, name: 'Discipline', color: 'bg-blue-100 text-blue-600' },
    { icon: <Star size={40} />, name: 'Excellence', color: 'bg-yellow-100 text-yellow-600' },
    { icon: <Cross size={40} />, name: 'Christ-Centeredness', color: 'bg-red-100 text-red-600' },
    { icon: <Handshake size={40} />, name: 'Solidarity', color: 'bg-green-100 text-green-600' },
    { icon: <Target size={40} />, name: 'Determination', color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-kcsBlue text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Core Values</h2>
        <div className="w-24 h-1 bg-kcsYellow mx-auto mb-12"></div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${value.color}`}>
                {value.icon}
              </div>
              <span className="font-heading font-semibold text-lg">{value.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CoreValues;