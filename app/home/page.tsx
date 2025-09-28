'use client';

import React from 'react';
import ScrollSection from '../components/scrollsection/scrollsection';

const images = [
  './img1.jpg', './img2.jpg', './img3.jpg', './img4.jpg', './img5.jpg',
  './img6.jpg', './img7.jpg', './img8.jpg', './img9.jpg', './img10.jpg',
  './img11.jpg', './img12.jpg', './img13.jpg', './img14.jpg', './img15.jpg',
];

const placesData = [
  { id: '1', location: 'New York, USA', title: 'Cozy Apartment in NYC', price: '$120', rating: 4.8 },
  { id: '2', location: 'Paris, France', title: 'Romantic Villa', price: '$180', rating: 4.9 },
  { id: '3', location: 'Paris, France', title: 'Luxury Villa', price: '$250', rating: 5.0 },
  { id: '4', location: 'Sahilabad, India', title: 'Beachfront House', price: '$160', rating: 4.7 },
  { id: '5', location: 'Chandigarh, India', title: 'Modern Studio Apartment', price: '$110', rating: 4.6 },
  { id: '6', location: 'Solan, India', title: 'Countryside Retreat', price: '$140', rating: 4.5 },
  { id: '7', location: 'Solan, India', title: 'Countryside Retreat', price: '$140', rating: 4.5 },
];


const shuffleArray = (array: any[]) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const generateShuffledData = () => {
  const shuffledImages = shuffleArray(images);
  return placesData.map((place, index) => ({
    ...place,
    imageUrl: shuffledImages[index % shuffledImages.length],
  }));
};


const Home = () => {
  return (
    <div className="lg:p-2 xl:p-4 pt-0">
      <ScrollSection  title="Popular homes in Sahibzada Ajit Singh Nagar" places={generateShuffledData()} />
      <ScrollSection title="Available in Solan this weekend" places={generateShuffledData()} />
      <ScrollSection title="Stay in Chandigarh" places={generateShuffledData()} />
      <ScrollSection title="Available in Kullu this weekend" places={generateShuffledData()} />
      <ScrollSection title="Stay in Amritsar" places={generateShuffledData()} />
      <ScrollSection title="Homes in Delhi" places={generateShuffledData()} />
    </div>
  );
};

export default Home;