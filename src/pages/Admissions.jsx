import React, { useState } from 'react';
import { CheckCircle, Info } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import AdmissionForm from '../components/forms/AdmissionForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SCHOOL_INFO } from '../utils/constants';

const Admissions = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleAdmissionSubmit = async (formData) => {
    setLoading(true);
    try {
      // Simulated registration and admission request
      await register({
        fullName: formData.parentName,
        email: formData.parentEmail,
        phone: formData.parentPhone,
        role: 'parent',
      });
      setSuccess(true);
      setTimeout(() => navigate('/verify'), 1500);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center section-padding">
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12 text-center max-w-xl">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-green-700 mb-3">Application Submitted!</h2>
          <p className="text-green-600 mb-4">
            Your admission request has been received. An account has been created for you.
          </p>
          <p className="text-sm text-gray-600">
            Redirecting to verification page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Admissions"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-kcsBlue/80"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Admissions</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Registration is currently ongoing for Nursery 1 (Baby Class) to Primary Three (P3).
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-kcsYellow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3 text-kcsBlue-dark">
          <Info size={22} className="shrink-0" />
          <p className="text-sm md:text-base font-medium">
            <strong>Now accepting applications!</strong> Limited spaces available for the upcoming academic year.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <section className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar Info */}
          <div className="lg:col-span-1">
            <div className="bg-kcsBlue text-white p-8 rounded-2xl sticky top-24">
              <h3 className="text-2xl font-bold text-white mb-6">Admission Requirements</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-kcsYellow shrink-0 mt-0.5" />
                  <span>Birth certificate copy</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-kcsYellow shrink-0 mt-0.5" />
                  <span>Passport-sized photographs (2)</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-kcsYellow shrink-0 mt-0.5" />
                  <span>Previous school report card (if any)</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-kcsYellow shrink-0 mt-0.5" />
                  <span>Completed admission form</span>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-white/20">
                <h4 className="font-bold mb-3">Available Classes</h4>
                <ul className="space-y-2 text-sm text-gray-200">
                  {SCHOOL_INFO.grades.map((g) => (
                    <li key={g}>• {g}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20 text-sm">
                <h4 className="font-bold mb-3">Need Help?</h4>
                <p className="text-gray-200">Call: {SCHOOL_INFO.phone1}</p>
                <p className="text-gray-200">Email: {SCHOOL_INFO.email}</p>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100">
            <SectionTitle
              subtitle="Apply Online"
              title="Admission Request Form"
              description="Fill out the form below to request admission for your child. An account will be automatically created for you."
              align="left"
            />
            <AdmissionForm onSubmit={handleAdmissionSubmit} loading={loading} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;