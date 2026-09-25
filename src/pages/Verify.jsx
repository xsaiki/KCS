import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Verify = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { verifyAccount, pendingVerification } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!pendingVerification) {
      navigate('/register');
      return;
    }
    const timer = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [pendingVerification, navigate]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await verifyAccount(fullCode);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid verification code. Please check your email and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setError('');
    // Simulate resend
    alert(`New verification code sent to ${pendingVerification?.email}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="text-kcsBlue" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-kcsBlue">Verify Your Account</h2>
          <p className="text-gray-500 text-sm mt-2">
            We sent a 6-digit verification code to <br />
            <strong className="text-kcsBlue">{pendingVerification?.email}</strong>
          </p>
          <div className="mt-3 bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs p-2 rounded-lg">
            💡 <strong>Demo tip:</strong> Use code <strong>123456</strong>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-6">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`code-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-kcsBlue focus:ring-2 focus:ring-kcsBlue/20 outline-none transition"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify Account'}
          </button>
        </form>

        <div className="text-center mt-6">
          {countdown > 0 ? (
            <p className="text-sm text-gray-500">
              Resend code in <strong className="text-kcsBlue">{countdown}s</strong>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm text-kcsBlue font-semibold hover:underline flex items-center gap-1 mx-auto"
            >
              <RefreshCw size={14} /> Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;