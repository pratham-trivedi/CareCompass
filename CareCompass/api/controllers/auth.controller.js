import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt from "jsonwebtoken";


export const register =  async (req, res) =>{
   const {name, username, email, password} = req.body;
   
   try{
   const hashedPassword = await bcrypt.hash(password, 10);

   const newUser = await prisma.user.create({
      data:{
         name,
         username, 
         email,
         password: hashedPassword 
      }, 
   });
   res.status(201).json({message: "User Created"});
}catch(err){
   console.log(err);
   res.status(500).json({message: "Failed to create user"})
};

};

export const login =  async (req, res) =>{
   const {username, password} = req.body;

   try{

      const user = await prisma.user.findUnique({
         where:{username}
      })

      if(!user) return res.status(401).json({message: "Invalid Credentials"});
      const isPassValid = await bcrypt.compare(password, user.password);

      if(!isPassValid) return res.status(401).json({message: "Invalid Credentials"});
      const age = 1000*60*60*24*7;
      
      const token = jwt.sign(
      {
         id:user.id,
         isAdmin: false
      }, 
      process.env.JWT_SECRET_KEY, 
      {expiresIn: age});

      const {password: userPass, ...userData} = user;

      res.cookie("token", token,  {
         httpOnly: true,
         maxAge: age
      }).status(200).json(userData);



   }catch(err){
      console.log(err);
      res.status(500).json({message: "Failed to login"});
   }
}

export const logout =  (req, res) =>{
   res.clearCookie("token").status(200).json({message:"Logout Successful"});
}