import {getCityFromCoordinates, getCoordinates, getPlaceDetails} from "../lib/googleApi.js"
import { parsePlaceData } from "../lib/other_functions.js";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

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

      const token = req.cookies?.token;
      if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedHospital.findFirst({
            where:{
                googlehospitalId: data,
                userId: payload.id
              },
          });
          return res.status(200).json({ ...singleHosp, isSaved: saved ? true : false }); 
        }
      });
    }else{
      res.status(200).json(singleHosp);
    }

    }).catch(
      err => 
      {console.log(err)
      return res.status(500).json({message : "Error"});
      })
  };


  export const saveHospital = async (req, res) => {
    const hospitalId = req.body.hospitalId;
    const tokenUserId = req.userId;

    try {
      const savedHospital = await  prisma.savedHospital.findFirst({
        where:{
            userId:tokenUserId,
            googlehospitalId: hospitalId,
          }
      })

      if(savedHospital){
        await prisma.savedHospital.delete({
          where: {
            id: savedHospital.id,
          },
        })
        res.status(200).json({ message: "Post Removed from saved list" });
      }else{
        await prisma.savedHospital.create({
          data:{
            userId: tokenUserId,
            hospitalId: null,
            googlehospitalId : hospitalId,
          },
        });
        res.status(200).json({ message: "Post Saved" });
      };
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to find saved post" });
    }
  };