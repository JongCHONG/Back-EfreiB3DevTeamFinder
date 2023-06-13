import mongoose from "mongoose";
import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
    if (user) {
      console.log("get users success");
    }
  } catch (error) {
    console.log({ message: error.message });
  }
};

export const getUserbyId = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const user = await User.findById(_id).exec();
    res.status(200).json(user);
    if (user) {
      console.log("get user by his id success");
    }
  } catch (error) {
    console.log({ message: error.message });
  }
}

export const createUser = async (req, res) => {
  const user = req.body;
  console.log(user);
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
  console.log('user profile updated')
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with this id");

  await User.findByIdAndDelete(id);

  res.status(200).json({ message: "user deleted" });
  
};
