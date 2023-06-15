import express from "express";
import {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../controllers/Team.js";
import { authenticateToken } from "../middlewares/Authentification.js";

const router = express.Router();

router.get("/", getTeams);
router.get("/:id", getTeamById);
router.post("/", authenticateToken, createTeam);
router.put("/:id", authenticateToken, updateTeam);
router.delete("/:id", authenticateToken, deleteTeam);

export default router;
