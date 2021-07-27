import express from "express";
const router = express.Router();
import {
  createRecipe,
  getAllRecipes,
  getRecipe,
  getUsersRecipes,
  getUsersRecipeCount,
  getUsersFavorites,
  setRecipeRating,
  addRecipeFollower,
  removeRecipeFollower,
  addNewComment,
  addNewTag,
} from "../controllers/recipeController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createRecipe).get(getAllRecipes);
router.route("/:id").get(getRecipe);
router.route("/user/:id").get(getUsersRecipes);
router.route("/user/:id/favorites").get(protect, getUsersFavorites);
router.route("/user/:id/count").get(getUsersRecipeCount);
router.route("/:id/ratings").post(protect, setRecipeRating);
router.route("/:id/addfollower").put(protect, addRecipeFollower);
router.route("/:id/removefollower").put(protect, removeRecipeFollower);
router.route("/:id/comments").post(protect, addNewComment);
router.route("/:id/tags").post(protect, addNewTag);

export default router;
