import React, { useState, useEffect } from 'react';
import "./Slider.css";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(0);

  function changeImage(val) {
    let size = images.length;
    let newImageIndex = (imageIndex + val + size) % size;
    setImageIndex(newImageIndex);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      changeImage(1);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [imageIndex]);

  return (
    <div className="slider">
      <div className="arrow left" onClick={() => changeImage(-1)}>
        <img src="/public/images/arrow.png" alt="Left arrow" />
      </div>
      <div className="images">
        <img src={images[imageIndex]} alt="Slide" />
      </div>
      <div className="arrow right" onClick={() => changeImage(1)}>
        <img src="/public/images/arrow.png" alt="Right arrow" />
      </div>
    </div>
  );
}

export default Slider;
