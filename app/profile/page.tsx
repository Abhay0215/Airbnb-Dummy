'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { closeProfile } from '../redux/slices/loginmodal/loginmodal';
import { useEffect } from 'react';

export default function MyProfile() {
  const dispatch = useDispatch<AppDispatch>();

  const isOpen = useSelector((state: RootState) => state.authPopup.isLog);
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user,"b");
  
  if (!isOpen) return null;

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
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeProfile())}
          className="absolute top-4 left-5 text-black hover:text-black text-2xl z-10"
          aria-label="Close profile"
        >
          &times;
        </button>

        {/* Header */}
        <div className="text-center pt-6 pb-4 px-6 border-b border-gray-200">
          <h2 className="text-[16px] font-medium">My Profile</h2>
        </div>

        {/* Content */}
        <div className="px-6 pt-4 pb-6 overflow-y-auto sm:h-[calc(100vh-100px)] xl:max-h-[500px]">
          <h3 className="text-2xl font-semibold mb-6">Welcome to Airbnb</h3>

          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <strong>Name:</strong> {user?.fullname || 'Not provided'}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Email:</strong> {user?.email || 'Not provided'}
            </p>
            {/* Add more fields as needed */}
          </div>

          <button
            onClick={() => dispatch(closeProfile())}
            className="mt-8 w-full bg-black text-white rounded-lg py-3 text-sm font-medium hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}



// 'use client';

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../redux/store';
// import { closePopup, openProfile , closeProfile } from '../redux/slices/loginmodal/loginmodal';
// import { emailCheck } from '../redux/slices/authSkice.tsx/authSlice'; 
// import { useRouter } from 'next/navigation';
// import { FaGoogle, FaApple, FaFacebookF, FaEnvelope } from 'react-icons/fa';

// export default function Myprofile() {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();
//   const isOpen = useSelector((state: RootState) => state.authPopup.isLog);

//   const authLoading = useSelector((state: RootState) => state.auth.loading);
//   const authError = useSelector((state: RootState) => state.auth.error);

//   const [email, setEmail] = useState('');
//   const [showError, setShowError] = useState(false);

//   useEffect(() => {
//     if (!isOpen) {
//       setEmail('');
//     }
//   }, [isOpen]);

//   // Show error message for 7 seconds
//   useEffect(() => {
//     if (authError) {
//       setShowError(true);
//       const timer = setTimeout(() => {
//         setShowError(false);
//       }, 7000); // 7 seconds

//       return () => clearTimeout(timer);
//     }
//   }, [authError]);

//   const handleContinue = async () => {
//     if (email.trim() === '') {
//       alert('Please enter a valid email.');
//       return;
//     }

//     try {
//       const resultAction = await dispatch(emailCheck({ email }));
//       if (emailCheck.fulfilled.match(resultAction)) {
//         localStorage.setItem("authEmail", email);
//         router.push('/passwordVerify');
//       } else {
//         console.error('Email check failed:', resultAction.payload);
//       }
//     } catch (error) {
//       console.error('Error in email check:', error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center px-0 justify-center bg-black/40 md:px-4 sm:px-0">
//       <div
//         className={`
//           bg-white w-full h-full mt-72
//           sm:rounded-none sm:w-full sm:h-full sm:mt-0
//           md:rounded-2xl md:w-[90%] md:max-w-md md:h-auto md:mt-0
//           xl:rounded-[2rem] xl:max-w-xl xl:h-[90vh] xl:mt-0
//           shadow-xl overflow-hidden relative flex flex-col
//         `}
//       >
//         {/* Close Button */}
//         <button
//           onClick={() => dispatch(closeProfile())}
//           className="absolute top-4 left-5 text-black hover:text-black text-2xl z-10"
//           aria-label="Close popup"
//         >
//           &times;
//         </button>

//         {/* Header */}
//         <div className="text-center pt-6 pb-4 px-6 border-b border-gray-200">
//           <h2 className="text-[16px] font-medium">My Profile</h2>
//         </div>

//         {/* Content */}
//         <div className="px-6 pt-4 pb-6 overflow-y-auto sm:h-[calc(100vh-100px)] xl:max-h-[500px]">
//           <h3 className="text-2xl font-semibold mb-6">Welcome to Airbnb</h3>

//           {/* Email input */}
//           <div className="border border-gray-300 rounded-lg overflow-hidden mb-4 focus-within:border-black transition-colors duration-200">
//             <h3 className="w-full px-4 py-3 text-sm text-gray-700 border-b border-gray-300 focus:outline-none">
//               Email
//             </h3>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="w-full px-4 py-3 text-sm focus:outline-none"
//               aria-label="Email"
//             />
//           </div>

//           {showError && authError && (
//             <p className="text-sm text-red-600 mb-2" role="alert">{authError}</p>
//           )}

//           <p className="text-xs text-gray-600 mb-4">
//             We’ll call or text you to confirm your number. Standard message and data rates apply.{' '}
//             <span className="underline cursor-pointer">Privacy Policy</span>
//           </p>

//           <button
//             onClick={handleContinue}
//             className={`w-full bg-[#d33552] hover:bg-[#e02b4c] text-white rounded-lg py-3 text-sm font-medium mb-6 ${
//               authLoading ? 'opacity-70 cursor-not-allowed' : ''
//             }`}
//             disabled={authLoading}
//           >
//             Continue
//           </button>

//           <div className="flex items-center mb-6">
//             <hr className="flex-grow border-t border-gray-300" />
//             <span className="mx-4 text-xs text-gray-500">or</span>
//             <hr className="flex-grow border-t border-gray-300" />
//           </div>

//           {/* Social Auth Buttons */}
//           <button className="w-full border border-gray-300 rounded-lg py-3 px-4 mb-3 flex items-center justify-center gap-2 hover:bg-gray-50">
//             <FaGoogle className="text-lg" />
//             <span className="text-sm font-medium">Continue with Google</span>
//           </button>
//           <button className="w-full border border-gray-300 rounded-lg py-3 px-4 mb-3 flex items-center justify-center gap-2 hover:bg-gray-50">
//             <FaApple className="text-lg" />
//             <span className="text-sm font-medium">Continue with Apple</span>
//           </button>
//           <button className="w-full border border-gray-300 rounded-lg py-3 px-4 mb-3 flex items-center justify-center gap-2 hover:bg-gray-50">
//             <FaFacebookF className="text-lg text-blue-600" />
//             <span className="text-sm font-medium">Continue with Facebook</span>
//           </button>
//           <button className="w-full border border-gray-300 rounded-lg py-3 px-4 mb-2 flex items-center justify-center gap-2 hover:bg-gray-50">
//             <FaEnvelope className="text-lg" />
//             <span className="text-sm font-medium">Continue with Email</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
