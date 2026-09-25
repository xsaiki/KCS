import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-kcsBlue-dark relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-kcsBlue rounded-full -mr-32 -mt-32 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-kcsBlue rounded-full -ml-24 -mb-24 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Registration is Currently Ongoing!</h2>
            <p className="text-gray-300 text-lg mb-8">
              We are accepting applications for students from Nursery 1 (Baby Class) to Primary Three (P3). Join the KCS family today.
            </p>
            
            <div className="space-y-4 mb-8 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Phone size={20} className="text-kcsYellow" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Call us</p>
                  <p className="font-semibold">+250 782 887 260 / 078 855 8973</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Mail size={20} className="text-kcsYellow" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email us</p>
                  <p className="font-semibold">eck.yfc@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-kcsYellow" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Visit us</p>
                  <p className="font-semibold">Kigali Cell, Byumba Sector, Gicumbi District</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold text-kcsBlue mb-6 text-center">Request Admission</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent's Full Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kcsBlue focus:border-transparent outline-none transition" placeholder="Enter your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student's Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kcsBlue focus:border-transparent outline-none transition" placeholder="Enter student's name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade Applying For</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kcsBlue focus:border-transparent outline-none transition bg-white">
                  <option>Nursery 1 (Baby Class)</option>
                  <option>Nursery 2</option>
                  <option>Nursery 3</option>
                  <option>Primary 1</option>
                  <option>Primary 2</option>
                  <option>Primary 3</option>
                </select>
              </div>
              <button type="submit" className="w-full btn-primary mt-4">Submit Request</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;