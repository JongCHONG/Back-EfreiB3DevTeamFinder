import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    valorant_id: String,
    rank: String,
    mail: { type: String, unique: true, required: true },
    discord: { type: String, unique: true, required: true },
    announcements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Announcement" }],
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

userSchema.post("save", async function () {
  const announcementId = this.announcements[this.announcements.length - 1];
  await mongoose.model("Announcement").findByIdAndUpdate(
    announcementId,
    { user_id: this._id },
    { new: true }
  );
});

userSchema.pre("deleteOne", async function () {
  const userId = this.getQuery()["_id"];
  await mongoose.model("Announcement").deleteMany({ user_id: userId });
});


const User = mongoose.model("User", userSchema);

export default User;
