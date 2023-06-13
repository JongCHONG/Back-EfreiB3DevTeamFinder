import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    valorant_id: String,
    rank: String,
    mail: { type: String, unique: true, required: true },
    discord: { type: String, unique: true, required: true },
    announcements: [],
    region: String,
    availability: [String],
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }], // seulement les id des teams qu'il/elle est chef.
    conversations: [],
    avatar: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
