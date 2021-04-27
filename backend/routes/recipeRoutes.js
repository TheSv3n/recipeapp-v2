import express from "express";
const router = express.Router();
import {
  createRecipe,
  getAllRecipes,
} from "../controllers/recipeController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createRecipe).get(getAllRecipes);

export default router;
