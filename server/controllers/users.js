import User from "../models/users.js";
import Users from "../models/users.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
import Mongoose from "mongoose";

export const getUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const insertUser = async (req, res) => {
  // const user = req.body;
  const newUser = new Users({
    username: req.body.username,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const currentUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        user: user._id,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        following: user.following,
        followers: user.followers,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid user or password" });
};

export const followUser = async (req, res) => {
  const { id } = req.params;
  const following_user = req.body.following_user;
  const username = req.body.username;
  const user_id = req.body.user_id;

  if (!Mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with that id");

  if (username || user_id || following_user) {
    try {
      const updatedUser = await Users.findByIdAndUpdate(
        id,
        { $addToSet: { followers: username } },
        { new: true },
        async (error, result) => {
          await Users.findByIdAndUpdate(
            user_id,
            { $addToSet: { following: following_user } },
            { new: true }
          );
          if (error) console.log(error.message);
        }
      );
      res.json(updatedUser);
    } catch (error) {
      res.status(401).send(error.message);
      console.log(error.message);
    }
  } else {
    res.status(401).send("No user");
  }
};

export const unFollowUser = async (req, res) => {
  const { id } = req.params;
  const unfollowing_user = req.body.unfollowing_user;
  const username = req.body.username;
  const user_id = req.body.user_id;

  if (!Mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with that id");

  if (username || user_id || unfollowing_user) {
    try {
      const updatedUser = await Users.findByIdAndUpdate(
        id,
        { $pull: { followers: username } },
        { new: true },
        async (error, result) => {
          await Users.findByIdAndUpdate(
            user_id,
            { $pull: { following: unfollowing_user } },
            { new: true }
          );
          if (error) console.log(error.message);
        }
      );
      res.json(updatedUser);
    } catch (error) {
      res.status(401).send(error.message);
      console.log(error.message);
    }
  } else {
    res.status(401).send("No user");
  }
};
