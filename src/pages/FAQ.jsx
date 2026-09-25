import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What grades does KCS Gicumbi Campus offer?',
      a: 'We currently offer classes from Nursery 1 (Baby Class) through Primary Three (P3). Registration is actively ongoing for all these levels.',
    },
    {
      q: 'What is the school motto and what does it mean?',
      a: 'Our motto is "Discipline and Excellence." It reflects our commitment to nurturing students who are disciplined in character and excellent in academics, all rooted in Christ-like values.',
    },
    {
      q: 'What curriculum do you follow?',
      a: 'We follow the Rwandan national curriculum enriched with Christian values. Students are taught in English, French, and Kinyarwanda, ensuring trilingual proficiency.',
    },
    {
      q: 'How do I apply for admission?',
      a: 'Simply visit our Admissions page, fill out the online admission request form, and an account will be automatically created for you. You will then receive a verification code to activate your account and track your application status.',
    },
    {
      q: 'What extra-curricular activities are available?',
      a: 'We offer a wide range of activities including sports, traditional dance, public speaking, creative arts, and more. We believe in developing each student\'s unique God-given talents.',
    },
    {
      q: 'Is the school Christ-centered?',
      a: 'Absolutely. Our vision is to see young people transformed into the likeness of Christ and equipped to serve God in their community. We hold regular devotions, chapels, and spiritual formation sessions.',
    },
    {
      q: 'What are the school fees?',
      a: 'For detailed information about school fees, please contact us directly via phone at +250 782 887 260 or email us at eck.yfc@gmail.com. Our team will be happy to assist you.',
    },
    {
      q: 'Where is the school located?',
      a: 'KCS Gicumbi Campus is located in Kigali Cell, Byumba Sector, Gicumbi District, Rwanda.',
    },
    {
      q: 'Are the teachers qualified?',
      a: 'Yes. Our teachers are followers of Christ with a passion for academic excellence and leading students to the Lord. They are well-trained and dedicated to holistic student development.',
    },
    {
      q: 'How do I receive notifications about my child?',
      a: 'Once you register and verify your account, you will receive real-time notifications about admission status updates, new school news, and announcements through your parent dashboard.',
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="FAQ"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-kcsBlue/80"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">FAQ</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Find answers to the most common questions about KCS Gicumbi Campus.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <SectionTitle
          subtitle="Need Help?"
          title="Frequently Asked Questions"
          description="Can't find what you're looking for? Contact us directly and we'll be glad to help."
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === idx ? 'border-kcsBlue shadow-lg' : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="text-kcsBlue shrink-0" size={22} />
                  <span className="font-bold text-kcsBlue">{faq.q}</span>
                </div>
                <ChevronDown
                  className={`text-kcsBlue shrink-0 transition-transform duration-300 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                  size={22}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="p-5 pt-0 text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQ;