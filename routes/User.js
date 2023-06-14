import express from "express";
import {
  getUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/User.js";
import { authenticateToken } from "../middlewares/Authentification.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserbyId);
router.post("/", createUser);
router.patch("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

export default router;
