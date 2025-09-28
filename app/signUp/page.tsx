'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { closePopup, closePopupEmailPassword, openPopupEmailPassword } from '../redux/slices/loginmodal/loginmodal';
import { emailCheck, logout } from '../redux/slices/authSkice.tsx/authSlice';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaApple, FaFacebookF, FaEnvelope } from 'react-icons/fa';

export default function AuthPopup() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const isOpen = useSelector((state: RootState) => state.authPopup.isOpen);
  const user = useSelector((state: RootState) => state.auth.user);

  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const authError = useSelector((state: RootState) => state.auth.error);

  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (authError) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [authError]);

  const handleContinue = async () => {
    if (email.trim() === '') {
      alert('Please enter a valid email.');
      return;
      
    }

    try {
      const resultAction = await dispatch(emailCheck({ email }));
      if (emailCheck.fulfilled.match(resultAction)) {
        localStorage.setItem("authEmail", email);
        // dispatch(closePopup());
        // dispatch(openPopupEmailPassword());
        router.push('/passwordVerify');
      } else {
        console.error('Email check failed:', resultAction.payload);
      }
    } catch (error) {
      console.error('Error in email check:', error);
    }
  };

  const handleGoogle = () => {
    dispatch(openPopupEmailPassword())
  }
 
  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      dispatch(logout());
      dispatch(closePopup());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-0 md:px-4 sm:px-0">
      <div
        className="
          bg-white w-full mt-40
          sm:rounded-none sm:w-full sm:mt-0
          md:rounded-2xl md:w-[90%] md:max-w-md md:h-auto md:mt-0
          xl:rounded-[2rem] xl:max-w-xl xl:h-[90vh] xl:mt-0
          shadow-xl overflow-hidden relative flex flex-col
        "
      >
        {/* Close Button */}
        <button
          onClick={() => dispatch(closePopup())}
          className="absolute top-4 left-5 text-black hover:text-black text-3xl z-10"
          aria-label="Close popup"
        >
          &times;
        </button>

        {/* Header */}
        <div className="text-center pt-6 pb-4 px-6 border-b border-gray-200">
          <h2 className="text-[18px] font-semibold tracking-wide">Login or Sign up</h2>
        </div>

        {/* Content */}
        <div className="px-8 pt-6 pb-8 overflow-y-auto sm:h-[calc(100vh-110px)] xl:max-h-[500px]">
          {user?.email ? (
            // Profile details view
            <div className="space-y-8">
              <h3 className="text-3xl font-semibold mb-2 text-center">Welcome back,</h3>

              <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
                <div className="flex flex-col gap-6 text-gray-700 text-lg">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-500">Email</span>
                    <p className="mt-1 text-black break-all select-text">{user.email}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-500">User ID</span>
                    <p className="mt-1 text-black break-all select-text">{user._id}</p>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full mt-2 bg-[#FF385C] hover:bg-[#E03150] text-white rounded-2xl py-3 text-lg font-semibold transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2"
                aria-label="Logout"
              >
                Log out
              </button>

              {/* Close Button */}
              <button
                onClick={() => dispatch(closePopup())}
                className="w-full mt-4 border border-gray-300 rounded-2xl py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          ) : (
            // Login form view
            <>
              <h3 className="text-2xl font-semibold mb-6 text-center">Welcome to Airbnb</h3>

              {/* Email input */}
              <div className="border border-gray-300 rounded-xl overflow-hidden mb-5 focus-within:border-black transition-colors duration-200">
                <label
                  htmlFor="email"
                  className="block w-full px-5 py-4 text-sm text-gray-700 font-medium border-b border-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-5 py-4 text-sm focus:outline-none"
                  aria-label="Email"
                />
              </div>

              {showError && authError && (
                <p className="text-sm text-red-600 mb-4" role="alert">
                  {authError}
                </p>
              )}

              <p className="text-xs text-gray-600 mb-6 text-center">
                We’ll call or text you to confirm your number. Standard message and data rates apply.{' '}
                <span className="underline cursor-pointer">Privacy Policy</span>
              </p>

              <button
                onClick={handleContinue}
                className={`w-full bg-[#FF385C] hover:bg-[#E03150] text-white rounded-2xl py-4 text-lg font-semibold mb-8 transition-colors duration-300 shadow-md ${
                  authLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={authLoading}
              >
                Continue
              </button>

              <div className="flex items-center mb-6">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-xs text-gray-500">or</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              {/* Social Auth Buttons */}
              <button onClick={() => {
                dispatch(closePopup())
                dispatch(openPopupEmailPassword())}}
              className="w-full border border-gray-300 rounded-2xl py-4 px-6 mb-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                <FaGoogle className="text-xl" />
                <span className="text-base font-medium">Continue with Google</span>
              </button>
              <button className="w-full border border-gray-300 rounded-2xl py-4 px-6 mb-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                <FaApple className="text-xl" />
                <span className="text-base font-medium">Continue with Apple</span>
              </button>
              <button className="w-full border border-gray-300 rounded-2xl py-4 px-6 mb-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                <FaFacebookF className="text-xl text-blue-600" />
                <span className="text-base font-medium">Continue with Facebook</span>
              </button>
              <button className="w-full border border-gray-300 rounded-2xl py-4 px-6 mb-2 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                <FaEnvelope className="text-xl" />
                <span className="text-base font-medium">Continue with Email</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
