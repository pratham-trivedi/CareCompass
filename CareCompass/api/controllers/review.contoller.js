import prisma from "../lib/prisma.js";


export const reviewHospital = async (req, res) => {
    const hospitalId = req.body.hospitalId;
    const tokenUserId = req.userId;

    try {
      const reviewed = await  prisma.review.findFirst({
        where:{
            userId:tokenUserId,
            hospitalId,
          }
      })

      if(reviewed){
        await prisma.review.delete({
          where: {
            id: reviewed.id,
          },
        })
      }
      
        await prisma.review.create({
          data:{
            userId: tokenUserId,
            hospitalId,
            rating: req.body.rating,
            ratingText : req.body.ratingText
          },
        });
        res.status(200).json({ message: "Review Added" });

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to find add review" });
    }
  };


  export const deleteReview = async (req, res) => {
    const hospitalId = req.body.hospitalId;
    const tokenUserId = req.userId;

    try {
      const reviewed = await  prisma.review.findFirst({
        where:{
            userId:tokenUserId,
            hospitalId,
          }
      })

      if(!reviewed){
        return res.status(404).json({message : "No Such Review in database"});
      }else{
      
        await prisma.review.delete({
         where: {
            id: reviewed.id,
         }
        });
        res.status(200).json({ message: "Review Removed" });

    } 
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to Delete add review" });
    }
  };


  export const getProfileReviews = async (req, res) => {


    const tokenUserId = req.params.userId;
     try {
       const userReviews = await prisma.review.findMany({
         where: {userId : tokenUserId},
         include: {
           user: true,
         },
         include: {
          hospital: true,
         }
       });
 
       res.status(200).json(userReviews);
     } catch (err) {
       console.log(err);
       res.status(500).json({ message: "Failed to get Saved Posts!" });
     }
   };
  