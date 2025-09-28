'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store'; 
import { createReservation } from '../../redux/slices/reserve/resBook';

const allPlacesDetails = [
  {
    id: '1',
    title: "Van Gogh's Treehouse | Jacuzzi | Bonfire | Starry Nights",
    location: 'Treehouse in Jibhi, India',
    price: '₹13,496',
    oldPrice: '₹16,610',
    rating: 4.94,
    guests: '2 guests',
    bedrooms: '1 bedroom',
    beds: '2 beds',
    bathrooms: '1 bathroom',
    images: ['/img7.jpg', '/img4.jpg', '/img12.jpg', '/img13.jpg', '/img15.jpg'],
    description:
      "You'll love this unique and romantic escape. This cozy Treehouse in Tandi: Above the Clouds, wrapped in Mist.",
    host: {
      name: 'Bhupendra',
      image: '/phot8.jpg',
      isSuperhost: true,
      yearsHosting: 1,
    },
    perks: [
      {
        title: 'Furry friends welcome',
        desc: 'Bring your pets along for the stay.',
        icon: '🐾',
      },
      {
        title: 'Great check-in experience',
        desc: 'Recent guests loved the smooth start to this stay.',
        icon: '🔑',
      },
      {
        title: 'Free cancellation before 2 Oct',
        desc: 'Get a full refund if you change your mind.',
        icon: '🗓️',
      },
    ],
  },
  // other places...
];

export default function PlaceDetailPage() {
  const place = allPlacesDetails.find((p) => p.id === '1');
  if (!place) return notFound();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.reservation);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');

  
  const handleReserve = async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('authEmail'); 

    if (!email) {
      alert('Please log in to reserve.');
      return;
    }

    if (!checkIn || !checkOut) {
      alert('Please select both check-in and check-out dates.');
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      alert('Check-out date must be after check-in date.');
      return;
    }

    try {
      const resultAction = await dispatch(
        createReservation({
          email,
          placeId: place.id,
          checkIn,
          checkOut,
          guests: Number(guests),
          token: String(token),
        })
      );

      if (createReservation.fulfilled.match(resultAction)) {
        alert('Reservation successful!');
      } else {
        alert('Reservation failed: ' + (resultAction.payload || 'Unknown error'));
      }
    } catch (err) {
      alert('Reservation failed. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{place.title}</h1>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-6 rounded-2xl overflow-hidden">
        <div className="sm:col-span-2 lg:col-span-2 row-span-2">
          <img
            src={place.images[0]}
            alt="Main Image"
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>
        {place.images.slice(1).map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Photo ${i + 2}`}
            className="w-full h-44 object-cover rounded-xl"
          />
        ))}
      </div>

      {/* Title & Meta Info */}
      <p className="text-gray-600 mt-1">{place.location}</p>
      <div className="flex flex-wrap items-center gap-2 text-sm mt-2 text-gray-700">
        <span>★ {place.rating.toFixed(2)}</span>
        <span>•</span>
        <span>{place.guests}</span>
        <span>•</span>
        <span>{place.bedrooms}</span>
        <span>•</span>
        <span>{place.beds}</span>
        <span>•</span>
        <span>{place.bathrooms}</span>
      </div>

      {/* Main Content and Sidebar */}
      <div className="flex flex-col lg:flex-row mt-8 gap-10">
        {/* LEFT MAIN SECTION */}
        <div className="flex-1">
          {/* Host Info */}
          <div className="flex items-center gap-4 border-b pb-4 mb-4">
            <img
              src={place.host.image}
              alt={place.host.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Hosted by {place.host.name}</p>
              <p className="text-sm text-gray-500">
                {place.host.isSuperhost && 'Superhost · '} {place.host.yearsHosting} year hosting
              </p>
            </div>
          </div>

          {/* Perks / Amenities */}
          <div className="border-b pb-4 mb-4 space-y-4">
            {place.perks.map((perk, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-2xl">{perk.icon}</span>
                <div>
                  <p className="font-semibold">{perk.title}</p>
                  <p className="text-gray-500 text-sm">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-700 text-lg leading-relaxed">{place.description}</p>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full lg:w-[340px] p-6 border border-gray-200 rounded-xl shadow-sm sticky top-28 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-400 line-through text-sm">{place.oldPrice}</span>
            <span className="text-xl font-semibold">{place.price}</span>
            <span className="text-sm text-gray-500">for 2 nights</span>
          </div>

          {/* Booking form */}
          <div className="border border-gray-300 rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 border-b">
              <div className="p-2 border-r">
                <p className="text-[10px] font-semibold uppercase text-gray-500">Check-in</p>
                <p className="text-sm">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} // today or later
                  />
                </p>
              </div>
              <div className="p-2">
                <p className="text-[10px] font-semibold uppercase text-gray-500">Checkout</p>
                <p className="text-sm">
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]} // after check-in or today
                  />
                </p>
              </div>
            </div>
            <div className="p-2">
              <p className="text-[10px] font-semibold uppercase text-gray-500">Guests</p>
              <p className="text-sm">
                <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                </select>
              </p>
            </div>
          </div>

          <button
            onClick={handleReserve}
            disabled={loading}
            className={`mt-4 w-full bg-rose-600 hover:bg-rose-700 text-white py-3 font-semibold rounded-lg ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Reserving...' : 'Reserve'}
          </button>

          {error && <p className="text-red-600 text-center mt-2">{error}</p>}

          <p className="text-xs text-center text-gray-500 mt-2">You won't be charged yet</p>

          <div className="mt-4 p-4 text-sm border rounded-lg text-gray-700">
            <span className="font-semibold">Lower price</span>
            <p>Your dates are ₹1,557 less than the avg. nightly rate of the last 60 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
