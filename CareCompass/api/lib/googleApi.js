import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export const getCoordinates = async (city) => {
        try {
          const response = await client.geocode({
            params: {
              address: city,
              key: process.env.GOOGLE_MAPS_API_KEY
            }
          });
      
          if (response.data.results.length === 0) {
            throw new Error('No results found for the specified city.');
          }
      
          const location = response.data.results[0].geometry.location;
          return {
            latitude: location.lat,
            longitude: location.lng
          };
        } catch (error) {
          console.error('Error fetching coordinates:', error);
          throw error;
        }
};


export const getCityFromCoordinates = async (latitude, longitude) => {
        try {
          const response = await client.reverseGeocode({
            params: {
              latlng: `${latitude},${longitude}`,
              key: process.env.GOOGLE_MAPS_API_KEY,
            },
          });
      
          const results = response.data.results;
      
          if (results.length === 0) {
            throw new Error('No results found for the specified coordinates.');
          }
      
          const addressComponents = results[0].address_components;
          const cityComponent = addressComponents.find(component => component.types.includes('locality'));
      
          if (!cityComponent) {
            throw new Error('City not found in the address components.');
          }
      
          return cityComponent.long_name;
        } catch (error) {
          console.error('Error fetching city from coordinates:', error);
          throw error;
        }
      };

export const getNearbyHospitals = async (latitude, longitude, range=5000) => {
  try {
    const response = await client.placesNearby({
      params: {
        location: { lat: latitude, lng: longitude },
        radius: range,
        type: 'hospital',
        key:  process.env.GOOGLE_MAPS_API_KEY, // Replace with your Google API key
      },
      timeout: 1000, // optional
    });

    if (response.data.results.length === 0) {
      throw new Error('No hospitals found within the specified range.');
    }

    return response.data.results;
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error);
    throw error;
  }
};
export const getPlaceDetails = async (placeId) => {
    try {
      const response = await client.placeDetails({
        params: {
          place_id: placeId,
          key:  process.env.GOOGLE_MAPS_API_KEY,
        },
        timeout: 1000,
      });
  
      if (!response.data.result) {
        throw new Error('No place details found for the given place ID.');
      }
  
      return response.data.result;
    } catch (error) {
      console.error('Error fetching place details:', error);
      throw error;
    }
  };

