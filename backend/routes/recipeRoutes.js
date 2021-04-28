import express from "express";
const router = express.Router();
import {
  createRecipe,
  getAllRecipes,
  getRecipe,
  getUsersRecipes,
} from "../controllers/recipeController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createRecipe).get(getAllRecipes);
router.route("/:id").get(getRecipe);
router.route("/user/:id").get(getUsersRecipes);

export default router;
