import express from "express";

import { getLatlong, getCity, getSingleHospital, saveHospital } from "../controllers/google.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/getcoordinates", getLatlong);
router.post("/save", verifyToken, saveHospital);
router.post("/getcity", getCity);
router.get("/g/:id", getSingleHospital)

export default router;