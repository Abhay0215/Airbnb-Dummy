'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { closePopupEmailPassword, openPopupRegister } from '../../redux/slices/loginmodal/loginmodal';
import { sendOtp, verifyOtp } from '../../redux/slices/authSkice.tsx/authSlice'; 
import { FaTimes } from 'react-icons/fa';

export default function PasswordVerify() {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.authPopup.isOpenEmailPassword);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setOtp('');
      setStep('email');
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  const handleSendOtp = async () => {
    if (!email.trim()) {
      setError('Please enter a valid email');
      return;
    }
    localStorage.removeItem('authEmail');
    setLoading(true);
    setError(null);
    try {
      const resultAction = await dispatch(sendOtp({ email }));
      localStorage.setItem("authEmail", email)
      if (sendOtp.fulfilled.match(resultAction)) {
        setStep('otp');
      } else {
        setError(resultAction.payload || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Error sending OTP');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const resultAction = await dispatch(verifyOtp({ email, otp }));
      if (verifyOtp.fulfilled.match(resultAction)) {
        alert('OTP verified successfully! Registration complete.');
        dispatch(closePopupEmailPassword());
        dispatch(openPopupRegister());
      } else {
        setError(resultAction.payload || 'OTP verification failed');
      }
    } catch (err) {
      setError('Error verifying OTP');
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={() => dispatch(closePopupEmailPassword())}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <h2 className="text-center text-2xl font-semibold mb-6">Register with Email</h2>

        {step === 'email' && (
          <>
            <label className="block mb-2 font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
              placeholder="Enter your email"
              aria-label="Email"
              disabled={loading}
            />
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className={`w-full bg-[#FF385C] hover:bg-[#E03150] text-white rounded-2xl py-3 font-semibold transition-colors duration-300 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 'otp' && (
          <>
            <p className="mb-4 text-center text-gray-700">
              OTP sent to <span className="font-semibold">{email}</span>
            </p>
            <label className="block mb-2 font-medium text-gray-700">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
              placeholder="Enter OTP"
              aria-label="OTP"
              disabled={loading}
            />
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className={`w-full bg-[#FF385C] hover:bg-[#E03150] text-white rounded-2xl py-3 font-semibold transition-colors duration-300 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Verifying OTP...' : 'Verify OTP'}
            </button>
            <button
              onClick={() => setStep('email')}
              className="mt-3 text-center w-full text-sm text-[#FF385C] hover:underline"
              disabled={loading}
            >
              Change email address
            </button>
          </>
        )}
      </div>
    </div>
  );
}
