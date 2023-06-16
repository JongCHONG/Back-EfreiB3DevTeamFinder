import mongoose from "mongoose";

const announcementSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    announcement_text: String,
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
