import React, { useState } from 'react';
import './Getlatlng.css';

function Getlatlng() {
  const [location, setLocation] = useState(["Lat", "Long"]);

  const getCurrentLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude.toFixed(6), longitude.toFixed(6)]);
        },
        (error) => {
          console.error('Error fetching location:', error);
          alert('Unable to retrieve location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleInputChange = (e, index) => {
    const newLocation = [...location];
    newLocation[index] = e.target.value;
    setLocation(newLocation);
  }
  return (
    <div className='latlng-container'>
      <div className="item">
        <input
          id="latitude"
          name="latitude"
          value={location[0]}
          onChange={(e) => handleInputChange(e, 0)}
        />
      </div>
      <div className="item">
        <input
          id="longitude"
          name="longitude"
          value={location[1]}
          onChange={(e) => handleInputChange(e, 1)}
        />
      </div>
      <button className='btn' onClick={getCurrentLocation}>Get Location</button>
    </div>
  );
}

export default Getlatlng;
