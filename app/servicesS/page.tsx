'use client';

import React, { useRef } from "react";
import PlaceCard from "../components/cards/cards";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const imagePaths = [
  "/img1.jpg", "/phot2.jpg", "/phot3.jpg", "/img4.jpg", "/phot5.jpg",
  "/img6.jpg", "/phot7.jpg", "/phot10.jpg", "/img8.jpg", "/img10.jpg",
];

const serviceTitles = [
  "Private Chef Experience", "Spa at Your Stay", "Photography Session", "In-House Yoga Instructor",
  "Laundry & Dry Cleaning", "Pet Sitting Service", "Car Rental with Driver", "Personal Shopper",
  "Housekeeping & Cleaning", "Airport Pickup & Drop",
];

const prices = [
  "$60", "$80", "$120", "$70", "$25", "$40", "$100", "$90", "$35", "$50"
];

const locations = [
  "Available in Delhi", "Available in Chandigarh", "Available in Goa", "Available in Manali",
  "Available in Paris", "Available in Dubai", "Available in Tokyo", "Available in London",
  "Available in Sydney", "Available in Bangkok",
];

function generateDummyServices() {
  const shuffledIndexes = [...Array(imagePaths.length).keys()].sort(() => Math.random() - 0.5);
  return shuffledIndexes.map((i) => ({
    id: (i + 1).toString(),
    imageUrl: imagePaths[i],
    title: serviceTitles[i],
    price: prices[i],
    rating: 4.4 + Math.random() * 0.6,
    location: locations[i],
  }));
}

export default function ServicesPage() {
  const sectionTitles = [
    "Premium On-Demand Services",
    "Available During Your Stay",
    "Top Rated by Guests"
  ];

  // Create an array of refs, one per section
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = (index: number, direction: "left" | "right") => {
    const ref = scrollRefs.current[index];
    if (ref) {
      const scrollAmount = 300;
      ref.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="lg:p-2 xl:p-4 sm:pt-0 pt-0">
      {sectionTitles.map((sectionTitle, index) => {
        const services = generateDummyServices();

        return (
          <div key={index} className="mb-6">
            {/* Title + Buttons */}
            <div className="flex justify-between items-center px-4">
              <h1 className="text-xl font-bold font-cereal">{sectionTitle} ›</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => handleScroll(index, 'left')}
                  className="bg-white border rounded-full p-[6px] w-6 h-6 flex items-center justify-center shadow hover:bg-gray-100 transition"
                >
                  <FaChevronLeft size={10} />
                </button>
                <button
                  onClick={() => handleScroll(index, 'right')}
                  className="bg-white border rounded-full p-[6px] w-6 h-6 flex items-center justify-center shadow hover:bg-gray-100 transition"
                >
                  <FaChevronRight size={10} />
                </button>
              </div>
            </div>

            {/* Cards Row */}
            <div
              ref={(el) => {
              scrollRefs.current[index] = el;
              }}

              className="w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            >
              <div className="flex space-x-4 px-4 py-2">
                {services.map((service) => (
                  <div key={service.id} className="snap-start">
                    <PlaceCard
                      id={service.id}
                      imageUrl={service.imageUrl}
                      title={service.title}
                      location={service.location}
                      price={service.price}
                      rating={service.rating}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
