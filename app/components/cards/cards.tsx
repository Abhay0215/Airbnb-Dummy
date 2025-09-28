'use client';
import { FC, useMemo, useState } from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';

interface PlaceCardProps {
  id: string;
  imageUrl: string;
  location: string;
  title: string;
  price: string;
  rating: number;
  onLoad: () => void; // callback to notify parent image loaded
}

const PlaceCard: FC<PlaceCardProps> = ({
  id,
  imageUrl,
  location,
  title,
  price,
  rating,
  onLoad,
}) => {
  const isGuestFavourite = useMemo(() => Math.random() < 0.8, []);
  
  // Heart toggle state
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent anchor navigation on heart click
    setIsLiked(prev => !prev);
  };

  return (
    <a
      href={`/place/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-[160px] flex-shrink-0 cursor-pointer lg:w-[200px] relative"
    >
      {isGuestFavourite && (
        <div className="absolute top-2 left-2 bg-white bg-opacity-90 rounded-full px-3 py-1 text-xs font-semibold text-gray-800 shadow-md z-10 select-none">
          Guest favourite
        </div>
      )}

      {/* Heart Icon with toggle */}
      <button
        onClick={toggleLike}
        aria-label={isLiked ? "Remove from favourites" : "Add to favourites"}
        className="absolute top-2 right-2 z-10 rounded-full p-1 bg-opacity-70 drop-shadow-md focus:outline-none"
        style={{ width: 28, height: 28 }}
        type="button"
      >
        <FaHeart
          size={20}
          className={`transition-colors duration-300 ${
            isLiked ? 'text-red-500 fill-current' : 'text-gray-500 fill-none'
          }`}
          style={{ fill: "rgba(128,128,128,0.5)" }}
          stroke="white"
          strokeWidth={20}
        />
      </button>

      <div className="rounded-2xl overflow-hidden w-full h-[160px] bg-gray-100 lg:h-[190px] relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
          onLoad={onLoad} // notify parent
        />
      </div>

      <div className="mt-2 flex flex-col">
        <div className="text-sm text-gray-700 font-bold font-cereal">{title}</div>
        <div className="flex items-center justify-between mt-1 font-cereal">
          <div className="text-sm text-gray-500 font-medium font-cereal">
            {price} <span className="font-normal">for 2 nights</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 font-cereal">
            <FaStar className="text-red-500 mr-1" size={12} />
            {rating.toFixed(1)}
          </div>
        </div>
      </div>
    </a>
  );
};

export default PlaceCard;
