import React, { useState } from 'react';
import "./carousel.css"

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex === 0 ? images?.length - 1 : prevIndex - 1);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images?.length);
  };

  if (images === undefined) return null
  return (
    <div className="carousel">
      <button className="img-btn btn-left" onClick={previousImage}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <div style={{backgroundImage: `url(${images[currentImageIndex]?.imageUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "600px", height: "600px" }} alt="item" />
      <button className="img-btn btn-right" onClick={nextImage}>
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Carousel;
