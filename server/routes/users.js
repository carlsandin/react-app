import express from "express";
import {
  getUser,
  getUsers,
  insertUser,
  followUser,
  unFollowUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", insertUser);
router.patch("/:id/follow", followUser);
router.patch("/:id/unfollow", unFollowUser);

export default router;
