import express from "express";
import {
  getUser,
  getUsers,
  insertUser,
  followUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", insertUser);
router.patch("/:id/follow", followUser);

export default router;
