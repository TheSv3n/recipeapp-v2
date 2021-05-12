import express from "express";
const router = express.Router();
import {
  registerUser,
  authUser,
  getUsername,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/:id/username").get(getUsername);

export default router;
