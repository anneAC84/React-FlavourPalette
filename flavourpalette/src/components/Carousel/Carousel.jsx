import React, { useState, useEffect } from 'react';
import './Carousel.css'; // Create this CSS file for carousel-specific styling

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000); // Adjust the interval time as needed (3000ms = 3 seconds)

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [items.length]);

  const visibleItems = items.slice(currentIndex, currentIndex + 4);

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {visibleItems.map((item, index) => (
          <div className="carousel-item" key={index}>
            <img src={item.picture} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;