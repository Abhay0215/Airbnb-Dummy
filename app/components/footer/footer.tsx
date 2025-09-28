import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-100 text-black pt-10 pb-8 lg:pl-6 xl:px-5.5 ">
      <div className=" mx-auto px-4 lg:px-0 w-full max-w-[1800px]  ">
        {/* Top Section: Links and Footer Content */}
        <div className="  pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10 md:block ">
            <h1 className=' font-medium text-2xl'>Inspiration for future getaways</h1>
          

          {/* Unique Stays Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 md:mb-4 md:mt-5">Unique Stays</h3>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
              {/* Left Column */}
              <div className="flex flex-col">
                <span className="font-normal">Cabin</span>
                <span className="text-sm text-gray-500">United States</span>
              </div>
              <div className="flex flex-col">
                <span className="font-normal">Treehouses</span>
                <span className="text-sm text-gray-500">United States</span>
              </div>
              <div className="flex flex-col">
                <span className="font-normal">Tiny Houses</span>
                <span className="text-sm text-gray-500">United States</span>
              </div>
              <div className="flex flex-col">
                <span className="font-normal">Beach Houses</span>
                <span className="text-sm text-gray-500">United States</span>
              </div>
              <div className="flex flex-col">
                <span className="font-normal">Lakehouses</span>
                <span className="text-sm text-gray-500">United States</span>
              </div>
              <div className="flex flex-col">
                <span className="font-normal">Yurt Rentals</span>
                <span className="text-sm text-gray-500">United States</span>
              </div>
              <div className="flex flex-col">
                <span className="font-normal">Yurt Rentals</span>
                <span className="text-sm text-gray-500">United Kingdom</span>
              </div>

    {/* Right Column */}
    <div className="flex flex-col">
      <span className="font-normal">Castle Rentals</span>
      <span className="text-sm text-gray-500">United States</span>
    </div>
    <div className="flex flex-col">
      <span className="font-normal">Houseboats</span>
      <span className="text-sm text-gray-500">United States</span>
    </div>
    <div className="flex flex-col">
      <span className="font-normal">Holiday Caravans</span>
      <span className="text-sm text-gray-500">United Kingdom</span>
    </div>
    <div className="flex flex-col">
      <span className="font-normal">Private Island Rentals</span>
      <span className="text-sm text-gray-500">United States</span>
    </div>
    <div className="flex flex-col">
      <span className="font-normal">Farm Houses</span>
      <span className="text-sm text-gray-500">United States</span>
    </div>
    <div className="flex flex-col">
      <span className="font-normal">Farm Cottages</span>
      <span className="text-sm text-gray-500">United Kingdom</span>
    </div>
    <div className="flex flex-col">
      <span className="font-normal">Cabin Rentals</span>
      <span className="text-sm text-gray-500">Australia</span>
    </div>
  </div>

  {/* Show More Button */}
  <div className="mt-4">
    <a href="#" className="text-sm text-blue-500 hover:underline">Show more</a>
  </div>
          </div>



          {/* Support Section */}
          <div className='md:flex gap-30'>
          <div>
            <h3 className="text-lg font-medium mb-4  border-b border-gray-700 md:border-none md:mt-7 md:mb-2">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-sm text-gray-500">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-500">Cancellation options</a></li>
              <li><a href="#" className="text-sm text-gray-500">Neighborhood support</a></li>
              <li><a href="#" className="text-sm text-gray-500">Trust & Safety</a></li>
            </ul>
          </div>
        

          {/* Host Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 mt-4 border-b border-gray-700 md:border-none md:mt-7 md:mb-2">Hosting</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-sm text-gray-500">Host your home</a></li>
              <li><a href="#" className="text-sm text-gray-500">Host an experience</a></li>
              <li><a href="#" className="text-sm text-gray-500">Responsible hosting</a></li>
              <li><a href="#" className="text-sm text-gray-500">Resource Center</a></li>
            </ul>
          </div>


          {/* Airbnb Section */}
          <div>
            <h3 className="text-lg font-medium mb-4  mt-4 border-b border-gray-700 md:border-none md:mt-7 md:mb-2">Airbnb</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-sm text-gray-500">How Airbnb works</a></li>
              <li><a href="#" className="text-sm text-gray-500">Newsroom</a></li>
              <li><a href="#" className="text-sm text-gray-500">Investors</a></li>
              <li><a href="#" className="text-sm text-gray-500">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-500">Airbnb Luxe</a></li>
            </ul>
          </div>
          </div>
        </div>

        {/* Bottom Section: Social Media and Legal */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex flex-col text-sm sm:text-base">

            <div className='mt-2 mb-2 font-medium'>   
                <p>🌐 English (IN)  ₹ INR</p>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-6  mt-4 mb-2">
              <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
            </div>

            {/* Legal and Copyright */}
            <div className=" font-normal mt-4">
              <p>© 2025 Airbnb, Inc. All rights reserved</p>
              <p className="mt-2">Privacy · Terms · Sitemap · Company details</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
