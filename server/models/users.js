import mongoose from "mongoose";

const Users = mongoose.Schema({
  username: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  password: { type: String, require: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    default:
      "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
  },
  welcomeImage: String,
  following: [String],
  followers: [String],
  active: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("users", Users);

export default User;
