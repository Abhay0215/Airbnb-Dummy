'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { closePopupRegister } from '../../redux/slices/loginmodal/loginmodal';
import { registerUser } from '../../redux/slices/authSkice.tsx/authSlice';
import { FaTimes } from 'react-icons/fa';

export default function RegisterModal() {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.authPopup.isOpenRegister);

  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedEmail = localStorage.getItem('authEmail');
      setEmail(savedEmail || '');
      setFullname('');
      setPassword('');
      setError(null);
      setSuccess(false);
    }
  }, [isOpen]);

  const handleRegister = async () => {
    if (!fullname || !password || !email) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const resultAction = await dispatch(registerUser({ fullname, email, password }));
      console.log("resultofregister",resultAction );
      
      if (resultAction?.success) {
        setSuccess(true);
        localStorage.removeItem('authEmail');
        setTimeout(() => {
          dispatch(closePopupRegister());
        }, 2000);
      } else {
        setError(resultAction.payload || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong');
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={() => dispatch(closePopupRegister())}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <h2 className="text-center text-2xl font-semibold mb-6">Complete Your Registration</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
              placeholder="Enter your full name"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
              placeholder="Create a password"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full mt-1 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">Registered successfully!</p>}

          <button
            onClick={handleRegister}
            disabled={loading}
            className={`w-full bg-[#FF385C] hover:bg-[#E03150] text-white rounded-2xl py-3 font-semibold transition-colors duration-300 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
}
