import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import InquiryForm from '../components/forms/InquiryForm';
import SectionTitle from '../components/common/SectionTitle';
import { SCHOOL_INFO } from '../utils/constants';

const Contact = () => {
  const contactInfo = [
    { icon: <MapPin size={24} />, title: 'Our Location', lines: ['Kigali Cell, Byumba Sector', 'Gicumbi District, Rwanda'] },
    { icon: <Phone size={24} />, title: 'Phone Numbers', lines: [SCHOOL_INFO.phone1, SCHOOL_INFO.phone2] },
    { icon: <Mail size={24} />, title: 'Email Address', lines: [SCHOOL_INFO.email, SCHOOL_INFO.website] },
    { icon: <Clock size={24} />, title: 'Office Hours', lines: ['Mon - Fri: 7:30 AM - 5:00 PM', 'Sat: 8:00 AM - 12:00 PM'] },
  ];

  return (
    <div className="animate-fade-in">
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-kcsBlue/80"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to us with any questions or inquiries.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <section className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition text-center border-t-4 border-kcsBlue">
              <div className="w-14 h-14 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4 text-kcsBlue">
                {item.icon}
              </div>
              <h3 className="font-bold text-kcsBlue mb-3">{item.title}</h3>
              {item.lines.map((line, idx) => (
                <p key={idx} className="text-gray-600 text-sm">{line}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-50 p-8 rounded-2xl">
            <SectionTitle
              subtitle="Send a Message"
              title="Get in Touch"
              description="Fill out the form and our team will respond as soon as possible."
              align="left"
            />
            <InquiryForm />
          </div>

          <div className="space-y-6">
            <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <iframe
                title="KCS Gicumbi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15948.76996788653!2d30.0987144!3d-1.5778065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca7a69c6b0f01%3A0x6d4f8c9e7b5e8e0!2sByumba%2C%20Rwanda!5e0!3m2!1sen!2srw!4v1717000000000!5m2!1sen!2srw"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="bg-kcsBlue text-white p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Visit Us Today</h3>
              <p className="text-gray-200 text-sm">
                We welcome you to visit our campus and see firsthand the excellent learning environment we provide. Our doors are always open.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;