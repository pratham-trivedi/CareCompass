import express from "express";

import { getLatlong, getCity, getSingleHospital } from "../controllers/google.controller.js";

const router = express.Router();

router.post("/getcoordinates", getLatlong);
router.post("/getcity", getCity);
router.get("/g/:id", getSingleHospital)

export default router;