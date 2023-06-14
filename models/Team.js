import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const teamSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    team_leader_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    region: String,
    logo: String,
    availability: [String],
    teammates: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // team_leader + teammates
    announcements: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Announcement" },
    ],
  },
  {
    timestamps: true,
  }
);

teamSchema.post("save", async (team) => {
  await mongoose
    .model("User")
    .findOneAndUpdate(
      { _id: team.team_leader_id },
      { $push: { teams: team._id } }
    );
});

teamSchema.pre("deleteOne", async function () {
  const teamId = this.getQuery()["_id"];
  await mongoose
    .model("User")
    .updateMany({ teams: teamId }, { $pull: { teams: teamId } });
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
