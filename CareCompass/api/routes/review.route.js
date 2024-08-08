import express from "express";
import {verifyToken} from "../middleware/verifyToken.js";
import { reviewHospital, deleteReview, getProfileReviews } from "../controllers/review.contoller.js";


const router = express.Router();

router.post("/add", verifyToken, reviewHospital);
router.get("/profileReviews", verifyToken, getProfileReviews);
router.delete("/remove", verifyToken,  deleteReview);

export default router;
