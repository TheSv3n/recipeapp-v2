import express from "express";
const router = express.Router();
import {
  registerUser,
  authUser,
  getUsername,
  getUserById,
  getUserProfile,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, getUserProfile);
router.route("/login").post(authUser);
router.route("/:id/username").get(getUsername);
router.route("/:id").get(getUserById);

export default router;
