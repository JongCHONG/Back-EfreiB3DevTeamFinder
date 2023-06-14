import mongoose from "mongoose";
import User from "../models/User.js";
import Team from "../models/Team.js";

// Get list Users

export const getUsers = async (req, res) => {
  try {
    const user = await User.find().populate("teams", "name").exec();
    res.status(200).json(user);
    if (user) {
      console.log("get users success");
    }
  } catch (error) {
    console.log({ message: error.message });
  }
};

// Get User by ID

export const getUserbyId = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const user = await User.findById(_id).populate("teams", "name").exec();
    res.status(200).json(user);
    if (user) {
      console.log("get user by his id success");
    }
  } catch (error) {
    console.log({ message: error.message });
  }
};

// Create new User

export const createUser = async (req, res) => {
  const user = req.body;
  const existingUser = await User.findOne({ mail: user.mail }).exec();
  const newUser = new User(user);

  try {
    if (existingUser) {
      res.status(409).json({ error: "User already exists" });
    } else {
      await newUser.save();
      res.status(201).json(newUser);
      console.log("new user added");
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update User

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No user with this id");
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { ...user, _id },
    { new: true }
  );
  res.json(updatedUser);
  console.log("user profile updated");
};

//delete User

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("Aucun utilisateur trouvé avec cet ID");
    }

    await User.findByIdAndDelete(id);
    await Team.updateMany({ $pull: { teammates: id } });
    const { deletedCount } = await Team.deleteMany({ team_leader_id: id });

    res.status(200).json({ message: `User deleted. Deleted ${deletedCount} teams. Removed from teams.`});
    console.log(`User deleted. Deleted ${deletedCount} teams. Removed from teams.`);
  } catch (error) {
    console.log("Error deleting:", error.message);
  }
};
