import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const teamSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    team_leader_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    region: String,
    logo: String,
    availability: [String],
    teammates: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    announcements: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Announcement" },
    ],
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
