import prisma from "../lib/prisma.js";
import { getCityFromCoordinates, getCoordinates, getNearbyHospitals } from "../lib/googleApi.js";
import {getTime, parseHospitalData} from "../lib/other_functions.js"


export const getPosts = async (req, res) => {
  const query = req.query;
  console.log(query);
  const currentTime = getTime();

  let lat=query.latitude, long=query.longitude, city=query.city;
  try {
    if (query.city) {
      const coords = await getCoordinates(query.city);
      lat = coords.latitude;
      long = coords.longitude;
    } else {
      city = await getCityFromCoordinates(lat, long);
    }
  } catch (err) {
    console.log(err);
  }

  console.log(lat, long, city);
  const range = query.range ? query.range:5000;
  const search = await getNearbyHospitals(lat, long, range);


  let specialityQuery = null;
  if(query.speciality && query.speciality != "Hospital"){
    specialityQuery = query.speciality;
  }

  try {
    const posts = await prisma.hospital.findMany({
      where: {
        city: city || undefined,
        speciality : specialityQuery ? {
            has : specialityQuery
        } : undefined,
        AND: query.status === "open" ? [{
          opentime : {
            lte : currentTime
          }
        },
          {
            closetime : {
              gte : currentTime
            }
          }
        ] : undefined
      }
    });

    if(query.speciality && query.speciality != "Hospital"){
      return res.status(200).json(posts);
    }

    const parsedHospitals = search
    .filter(item => {
      if (query.status === "open" && item.opening_hours && !item.opening_hours.open_now) {
        return false;
      }
      return true;
    })
    .map(item => parseHospitalData(item));
    const combinedPosts = [...posts, ...parsedHospitals];

    console.log(combinedPosts);
    
    res.status(200).json(combinedPosts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.hospital.findUnique({
      where: { id },
    });

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  try {
    const newPost = await prisma.hospital.create({
     data: {
       ...body,
     }
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};


export const deletePost = async (req, res) => {
    const id = req.params.id;
  
    try {
      const post = await prisma.hospital.findUnique({
        where: { id },
      });

      if(!post) return res.status(404 ).json({message : "No such Hospital post"});

      await prisma.hospital.delete({
        where: { id },
      });
  
      res.status(200).json({ message: "Post deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to delete post" });
  
  }
};