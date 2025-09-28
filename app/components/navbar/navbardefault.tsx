"use client";
import { FcHome, FcSlrBackSide, FcWorkflow } from "react-icons/fc";
import Link from 'next/link'; 
import { FaListUl, FaDribbble } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { openPopup, closePopup, openProfile } from '../../redux/slices/loginmodal/loginmodal';
import { RootState } from '../../redux/store'; 


type NavbarProps = {
  scrolled: boolean;
  // onAuthTrigger: (login: boolean) => void;
};

function NavbarDefault({ scrolled }: NavbarProps) {

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch(); 

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
   <nav
      className={`p-2 bg-gradient-to-b from-white to-gray-100 shadow-sm  z-50 ${
        scrolled ? "shadow-lg bg-white" : ""
      }`}
    >  
      <div className="w-full max-w-[1800px] mx-auto px-4">
            <div className=" text-sm md:flex md:items-center md:justify-between md:px-6 md:py-3">
            <div className=' hidden md:block ml-3'>
          <svg width="30" height="32" viewBox="0 0 1007 1080" ><path d="M949.278 666.715C875.957 506.859 795.615 344.664 713.713 184.809C698.893 155.177 670.813 98.2527 645.852 67.8412C609.971 24.1733 556.93 0.779785 503.109 0.779785C449.288 0.779785 396.247 24.1733 360.366 67.8412C335.406 98.2527 307.325 155.177 292.505 184.809C210.603 344.664 130.262 506.859 56.9404 666.715C47.5802 687.769 24.9598 737.675 16.3796 760.289C6.23941 787.581 0.779297 817.213 0.779297 846.845C0.779297 975.509 101.401 1079.22 235.564 1079.22C346.326 1079.22 434.468 1008.26 503.109 934.18C571.751 1008.26 659.892 1079.22 770.655 1079.22C904.817 1079.22 1006.22 975.509 1006.22 846.845C1006.22 817.213 999.979 787.581 989.839 760.289C981.259 737.675 958.638 687.769 949.278 666.715ZM503.109 810.195C447.728 738.455 396.247 649.56 396.247 577.819C396.247 506.079 446.948 470.209 503.109 470.209C559.27 470.209 610.751 508.419 610.751 577.819C610.751 647.22 558.49 738.455 503.109 810.195ZM770.655 998.902C688.628 998.902 618.271 941.557 555.955 872.656C620.205 792.541 691.093 679.121 691.093 577.819C691.093 458.513 598.271 389.892 503.109 389.892C407.947 389.892 315.906 458.513 315.906 577.819C315.906 679.098 386.294 792.478 450.318 872.593C387.995 941.526 317.614 998.902 235.564 998.902C146.642 998.902 81.1209 931.061 81.1209 846.845C81.1209 826.57 84.241 807.856 91.2611 788.361C98.2812 770.426 120.902 720.52 130.262 701.025C203.583 541.17 282.365 380.534 364.267 220.679C379.087 191.047 404.047 141.921 422.768 119.307C443.048 94.3538 471.129 81.0975 503.109 81.0975C535.09 81.0975 563.17 94.3538 583.451 119.307C602.171 141.921 627.132 191.047 641.952 220.679C723.854 380.534 802.635 541.17 875.957 701.025C885.317 720.52 907.937 770.426 914.957 788.361C921.978 807.856 925.878 826.57 925.878 846.845C925.878 931.061 859.576 998.902 770.655 998.902Z" fill="tomato"></path></svg>
          </div>
        {/* md- search bar */}
          <div className="flex justify-center md:hidden">
            <div className="relative w-85 mt-2">
              <input
                type="text"
                placeholder="                 Start your search..."
                className="w-full h-14 pl-10 pr-3 py-1  box-border bg-white border border-gray-300   rounded-4xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-black placeholder:font-bold   placeholder:text-zinc-800"
              />
              <svg
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                className="absolute left-22 top-1/2 transform -translate-y-1/2 h-3 w-3 fill-current text-zinc-800 pointer-events-none "
              >
                <path d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
              </svg>
            </div>
          </div>
          {/* search bar for md + */}
    
    
          <ul className=" flex justify-center space-x-8 mt-1 mb-0 pt-2 pb-0 md:flex md:gap-1.5 md:space-x-8 md:justify-center md:items-center md:flex-1 md:p-0 md:ml-32 ">
            <li>
              <Link href="/home" passHref>
              <div className={`flex flex-col items-center space-y-1 text-xs md:flex md:flex-row md:space-x-3 pb-2
                  ${pathname === '/home' ? 'border-b-3 border-black font-bold' : ''}`}>
                <FcHome className=' text-4xl md:text-[40px]' />
                <span className=' md:text-base font-cereal'>Home</span>
              </div>
              </Link>
            </li>
            <li>
              <Link href="/experiences" passHref>
               <div className={`flex flex-col items-center space-y-1 text-xs md:flex md:flex-row md:space-x-3 pb-2
                  ${pathname === '/experiences' ? 'border-b-3 border-black font-bold' : ''}`}>
                <FcSlrBackSide  className=' text-4xl md:[40px] '/>
                <span className=' md:text-base font-cereal'>Experiences</span>
              </div>
              </Link>
            </li>
            <li>
              <Link href="/servicesS" passHref>
               <div className={`flex flex-col items-center space-y-1 text-xs md:flex md:flex-row md:space-x-3 pb-2
                  ${pathname === '/servicesS' ? 'border-b-3 border-black font-bold' : ''}`}>
                <FcWorkflow className=' text-4xl md:[40px]'/>
                <span className=' md:text-base font-cereal'>Services</span>
              </div>
              </Link>
            </li>
          </ul>
    
          {/* rigt side icons */}
            <div className="hidden md:flex md:items-center md:space-x-2">
          {/* Global icon */}
          <button className="flex items-center space-x-1 px-3 py-2 border border-none rounded-full hover:shadow-md cursor-pointer">
            <h3 className="font-bold text-gray-600 text-sm">
              Become a host
            </h3>
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-gray-100 border-none rounded-full hover:shadow-md hover:bg-gray-200 cursor-pointer">
            <FaDribbble size={16} />
          </button>
          {/* User/Menu Button */}
          <div className="relative" ref={menuRef}>
           <button
                onClick={() => setMenuOpen(prev => !prev)}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 border-none rounded-full hover:shadow-md hover:bg-gray-200 cursor-pointer"
              >
                <FaListUl size={16} />
              </button>
               {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-[265px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <ul className="py-1 text-sm text-gray-700">
                    <li>
                      <button className="flex  w-full text-left px-4 py-2 hover:bg-gray-100 gap-3"><AiOutlineQuestionCircle />    Help Centre</button>
                    </li>
                    <hr className="border-[0.5%] ml-4 mr-4 text-gray-300" />
                    <li>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 ">
                        <div className="flex">
                          <div>
                        <h3 className="font-medium">
                          Become a host 
                        </h3>                        
                        <p className="text-gray-500">It's easy to start hosting and earn extra income</p>
                        </div>
                        <div className="flex  flex-col-reverse">
                        <FcHome className=' text-[45px] ' />
                        </div>
                        </div>
                      </button>
                    </li>
                    <hr className="border-[0.5%] ml-4 mr-4 text-gray-300" />
                    <li>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Find a co-host</button>
                    </li>
                    
                    <li>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Find a host</button>
                    </li>
                    
                    <hr className="border-[0.5%] ml-4 mr-4 text-gray-300" />
                    
                    {isAuthenticated ? (
                      <li>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            dispatch(openPopup(true));
                          }}
                        >
                          Profile
                        </button>
                      </li>
                    ) : (
                      <li>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => dispatch(openPopup(true))}
                        >
                          Log in or sign up
                        </button>
                      </li>
                    )}


                 
                  </ul>
                </div>
              )}
              </div>
          </div>
    
         
      </div>
       {/* Full-width Search Bar with 4 sections (only on md+) */}
    <div className="hidden md:flex justify-center mt-6 mb-7 px-6 md:ml-[0rem] md:mr-[1rem]">
      <div className="w-full max-w-screen-md">
        <div className="font-cereal flex bg-white border border-gray-300 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden divide-x divide-gray-300">
          
          {/* Section 1: Where */}
          <div className=" font-cereal flex-1 px-4 py-3 cursor-pointer hover:bg-gray-100">
            <p className="font-cereal text-xs font-semibold text-gray-600">Where</p>
            <p className=" font-cereal text-sm text-gray-900">Search destinations</p>
          </div>
    
          {/* Section 2: Check-in */}
          <div className=" font-cereal flex-1 px-4 py-3 cursor-pointer hover:bg-gray-100">
            <p className=" font-cereal text-xs font-semibold text-gray-600">Check in</p>
            <p className=" font-cereal text-sm text-gray-900">Add dates</p>
          </div>
    
          {/* Section 3: Check-out */}
          <div className="font-cereal flex-1 px-4 py-3 cursor-pointer hover:bg-gray-100">
            <p className="font-cereal text-xs font-semibold text-gray-600">Check out</p>
            <p className="font-cereal text-sm text-gray-900">Add dates</p>
          </div>
    
          {/* Section 4: Who */}
          <div className="font-cereal flex items-center justify-between flex-1 px-4 py-3 cursor-pointer hover:bg-gray-100">
            <div>
              <p className="font-cereal text-xs font-semibold text-gray-600">Who</p>
              <p className="font-cereal text-sm text-gray-900">Add guests</p>
            </div>
    
            {/* Search icon */}
            <div className= "bg-red-500 text-white p-2 rounded-full">
              <svg
                viewBox="0 0 32 32"
                className="w-4 h-4 fill-current"
                aria-hidden="true"
              >
                <path d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
        </nav>
      );
}
export default NavbarDefault