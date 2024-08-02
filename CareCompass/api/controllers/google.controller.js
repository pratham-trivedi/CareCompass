import {getCityFromCoordinates, getCoordinates, getPlaceDetails} from "../lib/googleApi.js"
import { parsePlaceData } from "../lib/other_functions.js";

export const getLatlong = async (req, res) => {
    const data = req.body;
    
    getCoordinates(data.city).then(coor => {
      return res.status(200).json({"lat" : coor.latitude, "long" : coor.longitude});
    }).catch(
      err => 
      {console.log(err)
      return res.status(500).json({message : "Error"});
      })
  };
  
  export const getCity = async (req, res) => {
    const data = req.body;
    
    getCityFromCoordinates(data.latitude, data.longitude).then(city => {
      return res.status(200).json({"city" : city})
    }).catch(
      err => 
      {console.log(err)
      return res.status(500).json({message : "Error"});
      })
  };


   
  export const getSingleHospital = async (req, res) => {
    const data = req.params.id;
    getPlaceDetails(data).then(hosp => {
        const singleHosp = parsePlaceData(hosp);
        res.status(200).json(singleHosp);
    }).catch(
      err => 
      {console.log(err)
      return res.status(500).json({message : "Error"});
      })
  };
