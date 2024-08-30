import React, { useState, useEffect } from 'react';
import './Carousel.css'; 
import { Link } from 'react-router-dom';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval); 
  }, [items.length]);

  const visibleItems = items.slice(currentIndex, currentIndex + 4);

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {visibleItems.map((item, index) => (
            <Link to={`/recipes/${item.id}`} key={item.id} className="carousel-item-link">
          <div className="carousel-item">
            <img src={item.picture} alt={item.title} />
            <div className="carousel-title">{item.title}</div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Carousel;