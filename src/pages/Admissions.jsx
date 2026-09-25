import React, { useState } from 'react';
import { CheckCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/common/SectionTitle';
import QuickAdmissionForm from '../components/admissions/QuickAdmissionForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SCHOOL_INFO } from '../utils/constants';

const Admissions = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (!isAuthenticated) {
        await register({
          fullName: formData.parentName,
          email: formData.parentEmail,
          role: 'parent',
        });
        setSuccess(true);
        setTimeout(() => navigate('/verify'), 1800);
      } else {
        // Already logged in: just show success (would POST to backend)
        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 1800);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-10 text-center max-w-xl">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={56} />
          <h2 className="text-2xl font-bold text-green-700 mb-3">Application Submitted!</h2>
          <p className="text-green-600 mb-3 text-sm sm:text-base">
            {isAuthenticated
              ? 'Your new admission request has been received. Redirecting to your dashboard...'
              : 'An account has been created for you. Redirecting to verification...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero — 95vh */}
      <div className="relative h-[95vh] -mt-16 md:-mt-20 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Admissions"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-kcsBlue/85" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center text-white px-4 max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">Admissions</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mx-auto">
            Registration is currently ongoing for Nursery 1 (Baby Class) to Primary Five (P5).
          </p>
        </motion.div>
      </div>

      <div className="bg-kcsYellow">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 text-kcsBlue-dark">
          <Info size={20} className="shrink-0" />
          <p className="text-xs sm:text-sm font-medium">
            <strong>Now accepting applications!</strong> Limited spaces available.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="bg-kcsBlue text-white p-6 md:p-8 rounded-2xl lg:sticky lg:top-24">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Admission Requirements</h3>
              <ul className="space-y-3 text-sm">
                {['Birth certificate copy', 'Passport-sized photographs (2)', 'Previous school report card (if any)', 'Completed admission form'].map((r) => (
                  <li key={r} className="flex gap-3">
                    <CheckCircle size={18} className="text-kcsYellow shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-white/20">
                <h4 className="font-bold mb-3 text-sm">Available Classes</h4>
                <ul className="space-y-1.5 text-xs text-gray-200">
                  {SCHOOL_INFO.grades.map((g) => <li key={g}>• {g}</li>)}
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20 text-xs">
                <h4 className="font-bold mb-2">Need Help?</h4>
                <p className="text-gray-200">Call: {SCHOOL_INFO.phone1}</p>
                <p className="text-gray-200 break-all">Email: {SCHOOL_INFO.email}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-5 md:p-10 rounded-2xl shadow-lg border border-gray-100">
            <SectionTitle
              subtitle="Apply Online"
              title="Admission Request Form"
              description="Fill out this form to request admission for your child. If you're a new parent, an account will be created automatically."
              align="left"
            />
            <QuickAdmissionForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;