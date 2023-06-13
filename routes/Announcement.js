import express from "express";
import { getAnnouncement, createAnnouncement, deleteAnnouncement  } from "../controllers/Announcement";

const router = express.Router()

router.get("/", getAnnouncement);
router.post("/", createAnnouncement);
router.delete("/:id", deleteAnnouncement);

export default router