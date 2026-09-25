import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuickAdmissionForm from '../admissions/QuickAdmissionForm';

const AdmissionModal = ({ isOpen, onClose, onSubmit, loading, initialData }) => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data) => {
    await onSubmit(data);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {success ? (
              <div className="p-12 text-center">
                <CheckCircle className="mx-auto text-green-500 mb-4" size={56} />
                <h3 className="text-2xl font-bold text-green-700 mb-2">Application Submitted!</h3>
                <p className="text-gray-600">Your admission request has been received. You'll be notified of updates.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                  <h3 className="font-bold text-lg text-kcsBlue">New Admission Request</h3>
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition">
                    <X size={20} />
                  </button>
                </div>
                <div className="p-5">
                  <QuickAdmissionForm onSubmit={handleSubmit} loading={loading} initialData={initialData} />
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdmissionModal;