import mongoose from "mongoose";

const announcementSchema = mongoose.Schema(
  {
    name: String,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    announcement_text: String,
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
