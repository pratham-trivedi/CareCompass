

export const getTime = () => {
        const currentTime = new Date();
        
        let hours = "";
        if(currentTime.getHours() < 10)hours+="0";
        hours+=currentTime.getHours()

        let mins = "";
        if(currentTime.getMinutes() < 10)mins+="0";
        mins+=currentTime.getMinutes()
        
        const curr = hours + ":" + mins;
        
        return curr;
}

export const parseHospitalData = (hospital) => {
        return {
          Gid: hospital.place_id,
          name: hospital.name,
          images: hospital.photos ? hospital.photos.map(photo => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.GOOGLE_MAPS_API_KEY}`) : [],
          address: hospital.vicinity,
          latitude: hospital.geometry.location.lat,
          longitude: hospital.geometry.location.lng,
          rating: hospital.rating,
          isopen: hospital.opening_hours ? hospital.opening_hours.open_now : false,
          speciality: hospital.types,
        };
      };

 export  const parsePlaceData = (place) => {
        return {
          Gid: place.place_id,
          name: place.name,
          images: place.photos ? place.photos.map(photo => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.GOOGLE_MAPS_API_KEY}`) : [],
          address: place.vicinity,
          city: place.address_components.find(component => component.types.includes('locality'))?.long_name || '',
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          rating: place.rating || 0,
          email: place.business_status === 'OPERATIONAL' ? place.website : '',
          phone: place.formatted_phone_number || '',
          opentime: place.current_opening_hours ? place.current_opening_hours.periods[0].open.time : '',
          closetime: place.current_opening_hours ? place.current_opening_hours.periods[0].close.time : '',
          reviews: place.reviews ? place.reviews.map(review => ({
            author: review.author_name,
            rating: review.rating,
            text: review.text,
          })) : [],
        };
      };
