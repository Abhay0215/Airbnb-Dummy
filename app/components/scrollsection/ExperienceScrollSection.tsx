'use client';

import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PlaceCard from '../cards/cards';

interface ExperienceData {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
  rating: number;
  location: string;
  onLoad?: () => void;
}

interface ExperienceScrollSectionProps {
  title: string;
  experiences: ExperienceData[];
}

const ExperienceScrollSection: React.FC<ExperienceScrollSectionProps> = ({
  title,
  experiences,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mt-2 ml-0">{title} ›</h1>
        <div className="flex gap-2">
          <button
            onClick={() => handleScroll('left')}
            className="bg-white border rounded-full p-[6px] w-6 h-6 flex items-center justify-center shadow hover:bg-gray-100 transition"
          >
            <FaChevronLeft size={10} />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="bg-white border rounded-full p-[6px] w-6 h-6 flex items-center justify-center shadow hover:bg-gray-100 transition"
          >
            <FaChevronRight size={10} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      >
        <div className="flex space-x-4 px-4 py-2">
          {experiences.map((exp) => (
            <div key={exp.id} className="snap-start">
              <PlaceCard {...exp} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceScrollSection;
