import express from "express";
import { getAnnouncements,  getAnnouncementById, createAnnouncement, deleteAnnouncement } from "../controllers/Announcement.js";

const router = express.Router()

router.get("/", getAnnouncements);
router.get("/:id", getAnnouncementById)
router.post("/", createAnnouncement);
router.delete("/:id", deleteAnnouncement);

export default router