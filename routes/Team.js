import express from "express";
import { getTeams, getTeamById, createTeam, updateTeam, deleteTeam } from "../controllers/Team.js";

const router = express.Router()

router.get("/", getTeams);
router.get("/:id", getTeamById);
router.post("/", createTeam);
router.put("/:id", updateTeam)
router.delete("/:id", deleteTeam);

export default router