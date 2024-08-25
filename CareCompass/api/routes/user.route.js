import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  saveHospital,
  profileHospital,
} from "../controllers/user.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
//router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save", verifyToken, saveHospital);
router.get("/profileHospitals",verifyToken, profileHospital);


export default router;