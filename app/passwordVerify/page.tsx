'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { useRouter } from 'next/navigation';
import { loginUser } from '../redux/slices/authSkice.tsx/authSlice';
import { FaArrowLeft } from 'react-icons/fa';

export default function PasswordVerify() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const authError = useSelector((state: RootState) => state.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (authError) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [authError]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('authEmail') || '';
    setEmail(storedEmail);

    if (!storedEmail) {
      router.push('/'); 
    }
  }, [router]);

  const handleSubmit = async () => {
    if (password.trim() === '') {
      alert('Please enter your password.');
      return;
    }

    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      // console.log("ra", resultAction);
      if (loginUser.fulfilled.match(resultAction)) {
           
        // console.log('Login successful');
        router.push('/home'); 

      } else {
        console.error('Login failed:', resultAction.payload);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleBack = () => {
    router.push('/'); // go back to login page
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center px-0 justify-center bg-black/40 md:px-4 sm:px-0">
      <div
        className={`
          bg-white w-full h-full mt-72
          sm:rounded-none sm:w-full sm:h-full sm:mt-0
          md:rounded-2xl md:w-[90%] md:max-w-md md:h-auto md:mt-0
          xl:rounded-[2rem] xl:max-w-xl xl:h-[90vh] xl:mt-0
          shadow-xl overflow-hidden relative flex flex-col
        `}
      >
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-5 text-black hover:text-black text-2xl z-10 flex items-center gap-2"
          aria-label="Back to login"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* Header */}
        <div className="text-center pt-6 pb-4 px-6 border-b border-gray-200">
          <h2 className="text-[16px] font-medium">Verify Password</h2>
        </div>

        {/* Content */}
        <div className="px-6 pt-4 pb-6 overflow-y-auto sm:h-[calc(100vh-100px)] xl:max-h-[500px] flex flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-6">Welcome back</h3>

          <p className="mb-4 text-gray-700 text-sm">
            Email: <span className="font-medium">{email}</span>
          </p>

          {/* Password input */}
          <div className="border border-gray-300 rounded-lg overflow-hidden mb-4 focus-within:border-black transition-colors duration-200">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 text-sm focus:outline-none"
              aria-label="Password"
            />
          </div>

          {showError && authError && (
            <p className="text-sm text-red-600 mb-2" role="alert">
              {authError}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={authLoading}
            className={`w-full bg-[#d33552] hover:bg-[#e02b4c] text-white rounded-lg py-3 text-sm font-medium ${
              authLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            Verify Password
          </button>
        </div>
      </div>
    </div>
  );
}
