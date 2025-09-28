'use client';

import React from 'react';
import ExperienceScrollSection from '../components/scrollsection/ExperienceScrollSection';

const imagePaths = [
  '/phot1.jpg', '/phot2.jpg', '/phot3.jpg', '/phot4.jpg', '/phot5.jpg',
  '/phot6.jpg', '/phot7.jpg', '/phot8.jpg', '/phot9.jpg', '/phot10.jpg',
];

const experienceTitles = [
  'Local Cooking Class', 'Mountain Trek Adventure', 'Temple Photography Walk',
  'Traditional Dance Show', 'Handmade Pottery Workshop', 'City Biking Tour',
  'Evening Food Crawl', 'Hidden Street Art Tour', 'Sunset Boat Ride',
  'Cultural Music Experience',
];

const prices = ['$20', '$35', '$45', '$30', '$50', '$25', '$40', '$55', '$60', '$70'];

const locations = [
  'Manali, India', 'Goa, India', 'Bali, Indonesia', 'Barcelona, Spain',
  'Bangkok, Thailand', 'Rome, Italy', 'Paris, France', 'Tokyo, Japan',
  'Istanbul, Turkey', 'Sydney, Australia',
];

function generateDummyExperiences() {
  const shuffledIndexes = [...Array(imagePaths.length).keys()].sort(() => Math.random() - 0.5);

  return shuffledIndexes.map((i) => ({
    id: (i + 1).toString(),
    imageUrl: imagePaths[i],
    title: experienceTitles[i],
    price: prices[i],
    rating: 4.5 + Math.random() * 0.5,
    location: locations[i],
  }));
}

export default function ExperiencesPage() {
  const allExperiences = generateDummyExperiences();
  const restSectionTitles = [
    'Experiences in New-Delhi',
    'Local Favourites',
    'Experiecec in Paris',
    'Top-rated Experiences',
  ];

  return (
    <div className="lg:p-2 xl:p-4 sm:pt-0 pt-0">
      <ExperienceScrollSection title="Airbnb Originals" experiences={allExperiences} />

      <h2 className="text-3xl font-semibold  mb-4 mt-4 text-black-700 font-cereal">
        Popular with travellers from your area
      </h2>

      {/* Other Sections */}
      {restSectionTitles.map((title, idx) => (
        <ExperienceScrollSection
          key={idx}
          title={title}
          experiences={generateDummyExperiences()}
        />
      ))}
    </div>
  );
}
