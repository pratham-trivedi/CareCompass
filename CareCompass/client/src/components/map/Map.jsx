import React from 'react'
import Pin from "../Pin/Pin"
import {APIProvider, Map} from '@vis.gl/react-google-maps';

function Map_component({hospitals, center}) {
    const auth_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    let location = {lat:0, lng:0};
    if(hospitals.length){
    location.lat = parseFloat(hospitals[0].latitude);
    location.lng = parseFloat(hospitals[0].longitude);
    }

  return (
    <APIProvider apiKey={auth_key}>
    <Map
      style={{width: '100%', height: '100%', borderRadius: '10px'}}
      defaultCenter={location}
      defaultZoom={13}
      disableDefaultUI={true}
    >
        {hospitals.map(item => (
            <Pin hospital={item} key={item.id}/>
        ))}
    </Map>
  </APIProvider>
  )
}

export default Map_component