import express from "express";
const router = express.Router();
import {
  registerUser,
  authUser,
  getUsername,
  getUserById,
  getUserProfile,
  addUserFollower,
  removeUserFollower,
  getFollowedUsers,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, getUserProfile);
router.route("/login").post(authUser);
router.route("/followed").get(protect, getFollowedUsers);
router.route("/:id/username").get(getUsername);
router.route("/:id").get(getUserById);
router.route("/:id/addfollower").put(protect, addUserFollower);
router.route("/:id/removefollower").put(protect, removeUserFollower);

export default router;
