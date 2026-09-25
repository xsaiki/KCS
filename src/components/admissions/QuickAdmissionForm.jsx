import React, { useState } from 'react';
import { User, Mail, GraduationCap, Calendar as CalIcon, CheckCircle } from 'lucide-react';
import { SCHOOL_INFO } from '../../utils/constants';

const QuickAdmissionForm = ({ onSubmit, loading, initialData = {} }) => {
  const [formData, setFormData] = useState({
    parentName: initialData.parentName || '',
    parentEmail: initialData.parentEmail || '',
    studentName: '',
    studentDob: '',
    studentGender: '',
    gradeApplying: '',
    previousSchool: '',
    additionalInfo: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs = {};
    if (!formData.parentName.trim()) errs.parentName = 'Full name is required';
    if (!formData.parentEmail.trim()) errs.parentEmail = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) errs.parentEmail = 'Invalid email';
    if (!formData.studentName.trim()) errs.studentName = 'Student name required';
    if (!formData.studentDob) errs.studentDob = 'Date of birth required';
    if (!formData.studentGender) errs.studentGender = 'Gender required';
    if (!formData.gradeApplying) errs.gradeApplying = 'Grade required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const inputClass = (f) =>
    `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-kcsBlue focus:border-transparent outline-none transition text-sm ${
      errors[f] ? 'border-red-500 bg-red-50' : 'border-gray-300'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Identity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Your Full Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`${inputClass('parentName')} pl-10`}
            />
          </div>
          {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="email"
              name="parentEmail"
              value={formData.parentEmail}
              onChange={handleChange}
              placeholder="parent@example.com"
              className={`${inputClass('parentEmail')} pl-10`}
            />
          </div>
          {errors.parentEmail && <p className="text-red-500 text-xs mt-1">{errors.parentEmail}</p>}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-sm font-bold text-kcsBlue mb-3">Student Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Student's Full Name *</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter student's name"
              className={inputClass('studentName')}
            />
            {errors.studentName && <p className="text-red-500 text-xs mt-1">{errors.studentName}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Date of Birth *</label>
            <div className="relative">
              <CalIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="date"
                name="studentDob"
                value={formData.studentDob}
                onChange={handleChange}
                className={`${inputClass('studentDob')} pl-10`}
              />
            </div>
            {errors.studentDob && <p className="text-red-500 text-xs mt-1">{errors.studentDob}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Gender *</label>
            <select name="studentGender" value={formData.studentGender} onChange={handleChange} className={inputClass('studentGender')}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.studentGender && <p className="text-red-500 text-xs mt-1">{errors.studentGender}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Grade Applying For *</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <select name="gradeApplying" value={formData.gradeApplying} onChange={handleChange} className={`${inputClass('gradeApplying')} pl-10`}>
                <option value="">Select grade</option>
                {SCHOOL_INFO.grades.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            {errors.gradeApplying && <p className="text-red-500 text-xs mt-1">{errors.gradeApplying}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Previous School (optional)</label>
            <input
              type="text"
              name="previousSchool"
              value={formData.previousSchool}
              onChange={handleChange}
              placeholder="Name of previous school"
              className={inputClass('previousSchool')}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Additional Notes (optional)</label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows="3"
              placeholder="Any additional information..."
              className={`${inputClass('additionalInfo')} resize-none`}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary py-3.5 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? 'Submitting...' : <><CheckCircle size={18} /> Submit Admission Request</>}
      </button>

      <p className="text-[11px] text-gray-500 text-center leading-relaxed">
        By submitting, an account will be created (or linked if you already have one) and you'll receive a verification code to track your application.
      </p>
    </form>
  );
};

export default QuickAdmissionForm;