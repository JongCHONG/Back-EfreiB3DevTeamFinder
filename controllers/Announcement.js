import mongoose from "mongoose";
import Announcement from "../models/Announcement.js";

//Get Announcements

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ createdAt: "-1" })
      .populate("user", "username region availability")
      .populate({
        path: "team",
        select: "name region team_leader_id availability",
        populate: {
          path: "team_leader_id",
          select: "username",
        },
      })
      .exec();
    if (announcements) {
      res.status(200).json(announcements);
      console.log("Get Announcements success");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error: Announcements not found");
  }
};

//Get Announcement by id
export const getAnnouncementById = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const announcement = await Announcement.findById(_id)
      .sort({ createdAt: "-1" })
      .populate("user", "username")
      .populate("team", "name")
      .exec();
    if (announcement) {
      res.status(200).json(announcement);
      console.log("Get Announcement success");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error: Announcement not found");
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const announcement = req.body;
    if (announcement) {
      const newAnnouncement = new Announcement(announcement);
      await newAnnouncement.save();
      res.status(201).json(announcement);
      console.log("Create announcement success");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error: announcement not created");
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (_id) {
      await Announcement.deleteOne({ _id }).exec();

      res.status(200).json({ message: "Annoucement deleted successfully" });
      console.log("Delete Announcement success");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error: Announcement not deleted");
  }
};
