import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const InquiryForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulated API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
        <h3 className="text-xl font-bold text-green-700 mb-2">Message Sent!</h3>
        <p className="text-green-600">
          Thank you for reaching out. We will get back to you at <strong>eck.yfc@gmail.com</strong> shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kcsBlue focus:border-transparent outline-none transition"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kcsBlue focus:border-transparent outline-none transition"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
        <input
          type="text"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kcsBlue focus:border-transparent outline-none transition"
          placeholder="How can we help?"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          name="message"
          required
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kcsBlue focus:border-transparent outline-none transition resize-none"
          placeholder="Write your message here..."
        ></textarea>
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
        {loading ? 'Sending...' : <>Send Message <Send size={18} /></>}
      </button>
    </form>
  );
};

export default InquiryForm;