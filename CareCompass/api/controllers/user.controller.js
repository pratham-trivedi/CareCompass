import { getPlaceDetails } from "../lib/googleApi.js";
import { parseHospitalData } from "../lib/other_functions.js";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};
  
  export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { password, ...inputs } = req.body;
  
    if (id !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
  
    let updatedPassword = null;
    try {
      if (password) {
        updatedPassword = await bcrypt.hash(password, 10);
      }
  
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          ...inputs,
          ...(updatedPassword && { password: updatedPassword }),
        },
      });
  
      const { password: userPassword, ...rest } = updatedUser;
  
      res.status(200).json(rest);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to update users!" });
    }
  };
  
  export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
  
    if (id !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
  
    try {
      await prisma.user.delete({
        where: { id },
      });
      res.status(200).json({ message: "User deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to delete users!" });
    }
  };


  export const saveHospital = async (req, res) => {
    const hospitalId = req.body.hospitalId;
    const tokenUserId = req.userId;

    try {
      const savedHospital = await  prisma.savedHospital.findFirst({
        where:{
            userId:tokenUserId,
            hospitalId,
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
            hospitalId,
            googlehospitalId: null,
          },
        });
        res.status(200).json({ message: "Post Saved" });
      };
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to find saved post" });
    }
  };




  export const profileHospital = async (req, res) => {


   const tokenUserId = req.params.userId;
    try {
      const userPosts = await prisma.savedHospital.findMany({
        where: {userId : tokenUserId},
        include: {
          hospital: true,
        }
      });

      const savedHospitalPromises = userPosts.map(async (item) => {
        if (item.googlehospitalId) {
          try {
            const placeDetails = await getPlaceDetails(item.googlehospitalId);
            return parseHospitalData(placeDetails);
          } catch (error) {
            console.error('Error fetching place details:', error);
            return null;
          }
        } else {
          return item.hospital;
        }
      });
  
      const savedHospitals = (await Promise.all(savedHospitalPromises)).filter(hospital => hospital !== null);


      res.status(200).json(savedHospitals);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get Saved Posts!" });
    }
  };