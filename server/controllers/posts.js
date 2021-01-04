import Mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!Mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndDelete(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const username = req.body.username;

  if (!Mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  if (username) {
    try {
      const updatedPost = await PostMessage.findByIdAndUpdate(
        id,
        { $push: { likedBy: username } },
        { new: true }
      );
      res.json(updatedPost);
      console.log("Success");
    } catch (error) {
      res.status(401).send(error.message);
      console.log(error.message);
    }
  } else {
    res.status(401).send("No user");
  }
};

export const unLikePost = async (req, res) => {
  const { id } = req.params;
  const username = req.body.username;

  if (!Mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  if (username) {
    try {
      const updatedPost = await PostMessage.findByIdAndUpdate(
        id,
        { $pull: { likedBy: username } },
        { new: true }
      );
      res.json(updatedPost);
      console.log("Success");
    } catch (error) {
      res.status(401).send(error.message);
      console.log(error.message);
    }
  } else {
    res.status(401).send("No user");
  }
};
