import React from 'react';
import { Target, Eye, Heart, Award, Users, BookOpen } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import { SCHOOL_INFO } from '../utils/constants';

const About = () => {
  return (
    <div className="animate-fade-in">
      {/* Page Hero */}
      <div className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="About KCS"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-kcsBlue/80"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">About Us</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Discover the heart and vision behind Kigali Christian School - Gicumbi Campus
          </p>
        </div>
      </div>

      {/* Vision & Mission */}
      <section className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-kcsBlue to-kcsBlue-dark text-white p-10 rounded-2xl shadow-xl relative overflow-hidden">
            <Eye className="absolute -top-4 -right-4 text-white/10" size={120} />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-kcsYellow rounded-xl flex items-center justify-center mb-6">
                <Eye className="text-kcsBlue-dark" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-100 leading-relaxed text-lg">
                {SCHOOL_INFO.vision}
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-kcsBlue p-10 rounded-2xl shadow-xl relative overflow-hidden">
            <Target className="absolute -top-4 -right-4 text-kcsBlue/5" size={120} />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-kcsBlue rounded-xl flex items-center justify-center mb-6">
                <Target className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-kcsBlue mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                {SCHOOL_INFO.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-gray-50">
        <SectionTitle
          subtitle="What Drives Us"
          title="Our Core Values"
          description="The principles that guide every decision, every classroom, and every interaction at KCS Gicumbi."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {SCHOOL_INFO.coreValues.map((value, idx) => {
            const icons = [Heart, Award, BookOpen, Users, Target];
            const Icon = icons[idx];
            return (
              <div key={value} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition text-center border-b-4 border-kcsYellow">
                <div className="w-14 h-14 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Icon className="text-kcsBlue" size={26} />
                </div>
                <h3 className="font-bold text-kcsBlue">{value}</h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* What We Offer */}
      <section className="section-padding">
        <SectionTitle
          subtitle="Our Promise"
          title="What We Offer"
          description="A holistic education experience built on faith, excellence, and community."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'High-Quality Christian Education', desc: 'We offer high-quality Christian education to children from all walks of life. Our teachers are followers of Christ with a passion for academic excellence and leading students to the Lord.' },
            { title: 'Extra-Curricular Activities', desc: 'KCS develops each student\'s unique God-driven potentials. We develop individual talents such as sports, traditional dance, public speaking and so on.' },
            { title: 'Academic Excellence', desc: 'The school\'s motto being "Discipline and Excellence", KCS students in Kigali and Rwamagana are known to perform with a high level of excellence both in day-to-day studies and national exams.' },
            { title: 'Spiritual Formation', desc: 'With a vision to develop Christ-like servants of God and the community, KCS schools intentionally provide spiritual formation sessions to our students through devotions, chapels etc.' },
            { title: 'Trilingual Proficiency', desc: 'Students at Kigali Christian Schools are proficient at English, French and Kinyarwanda, preparing them to serve in a globalized world.' },
            { title: 'Character Development', desc: 'We intentionally foster character development rooted in biblical values, ensuring our students grow into responsible, compassionate, and disciplined individuals.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-blue-50 transition">
              <div className="w-12 h-12 bg-kcsBlue rounded-lg flex items-center justify-center shrink-0 text-white font-bold">
                {i + 1}
              </div>
              <div>
                <h3 className="text-lg font-bold text-kcsBlue mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;