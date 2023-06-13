import express from "express";
import { getUsers, getUserbyId, createUser, updateUser, deleteUser } from "../controllers/User.js";

const router = express.Router()

router.get("/", getUsers);
router.get("/:id", getUserbyId);
router.post("/", createUser);
router.patch("/:id", updateUser)
router.delete("/:id", deleteUser);

export default router