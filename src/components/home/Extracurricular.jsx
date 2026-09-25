import React from 'react';
import { Music, Trophy, Mic, Palette } from 'lucide-react';

const Extracurricular = () => {
  const activities = [
    { icon: <Trophy size={28} />, title: 'Sports', desc: 'Developing physical fitness and teamwork.' },
    { icon: <Music size={28} />, title: 'Traditional Dance', desc: 'Embracing our rich cultural heritage.' },
    { icon: <Mic size={28} />, title: 'Public Speaking', desc: 'Building confidence and communication skills.' },
    { icon: <Palette size={28} />, title: 'Creative Arts', desc: 'Nurturing God-given talents and creativity.' },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Developing God-Driven Potentials</h2>
        <div className="w-24 h-1 bg-kcsYellow mx-auto"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We believe education goes beyond the classroom. Our extracurricular activities help students discover and develop their unique talents.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((activity, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-kcsBlue">
            <div className="text-kcsBlue mb-4">{activity.icon}</div>
            <h3 className="font-bold text-lg mb-2">{activity.title}</h3>
            <p className="text-gray-600 text-sm">{activity.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Extracurricular;