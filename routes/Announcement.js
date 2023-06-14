import express from "express";
import { getAnnouncement,  getAnnouncementById, createAnnouncement, deleteAnnouncement } from "../controllers/Announcement.js";

const router = express.Router()

router.get("/", getAnnouncement);
router.get("/:id", getAnnouncementById)
router.post("/", createAnnouncement);
router.delete("/:id", deleteAnnouncement);

export default router