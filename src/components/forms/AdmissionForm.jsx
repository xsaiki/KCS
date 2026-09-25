import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { SCHOOL_INFO } from '../../utils/constants';

const AdmissionForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
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
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required';
    if (!formData.parentEmail.trim()) newErrors.parentEmail = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) newErrors.parentEmail = 'Invalid email';
    if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Phone number is required';
    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
    if (!formData.studentDob) newErrors.studentDob = 'Date of birth is required';
    if (!formData.studentGender) newErrors.studentGender = 'Gender is required';
    if (!formData.gradeApplying) newErrors.gradeApplying = 'Grade selection is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-kcsBlue focus:border-transparent outline-none transition ${
      errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-300'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Parent Information */}
      <div>
        <h3 className="text-xl font-bold text-kcsBlue mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-kcsBlue text-white rounded-full flex items-center justify-center text-sm">1</span>
          Parent / Guardian Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              placeholder="Enter parent's full name"
              className={inputClass('parentName')}
            />
            {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              name="parentEmail"
              value={formData.parentEmail}
              onChange={handleChange}
              placeholder="parent@example.com"
              className={inputClass('parentEmail')}
            />
            {errors.parentEmail && <p className="text-red-500 text-xs mt-1">{errors.parentEmail}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              placeholder="+250 7XX XXX XXX"
              className={inputClass('parentPhone')}
            />
            {errors.parentPhone && <p className="text-red-500 text-xs mt-1">{errors.parentPhone}</p>}
          </div>
        </div>
      </div>

      {/* Student Information */}
      <div>
        <h3 className="text-xl font-bold text-kcsBlue mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-kcsBlue text-white rounded-full flex items-center justify-center text-sm">2</span>
          Student Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student's Full Name *</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
            <input
              type="date"
              name="studentDob"
              value={formData.studentDob}
              onChange={handleChange}
              className={inputClass('studentDob')}
            />
            {errors.studentDob && <p className="text-red-500 text-xs mt-1">{errors.studentDob}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
            <select
              name="studentGender"
              value={formData.studentGender}
              onChange={handleChange}
              className={inputClass('studentGender')}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.studentGender && <p className="text-red-500 text-xs mt-1">{errors.studentGender}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grade Applying For *</label>
            <select
              name="gradeApplying"
              value={formData.gradeApplying}
              onChange={handleChange}
              className={inputClass('gradeApplying')}
            >
              <option value="">Select grade</option>
              {SCHOOL_INFO.grades.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            {errors.gradeApplying && <p className="text-red-500 text-xs mt-1">{errors.gradeApplying}</p>}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div>
        <h3 className="text-xl font-bold text-kcsBlue mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-kcsBlue text-white rounded-full flex items-center justify-center text-sm">3</span>
          Additional Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Previous School (if any)</label>
            <input
              type="text"
              name="previousSchool"
              value={formData.previousSchool}
              onChange={handleChange}
              placeholder="Name of previous school"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kcsBlue focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows="3"
              placeholder="Any additional information about the student..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kcsBlue focus:border-transparent outline-none transition resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit Admission Request'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, an account will be created for you and you will receive notifications about your application status.
      </p>
    </form>
  );
};

export default AdmissionForm;