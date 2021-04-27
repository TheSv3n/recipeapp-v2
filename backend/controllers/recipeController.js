import asyncHandler from "express-async-handler";
import Recipe from "../models/recipeModel.js";

//@desc Create new recipe
//@route POST /api/recipes
//@access Private
const createRecipe = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const recipe = new Recipe({
    name,
    creator: req.user._id,
    nameLower: name.toLowerCase(),
    description,
    directions,
    ingredients,
  });

  const createdRecipe = await recipe.save();

  res.status(201).json(createdRecipe);
});

export { createRecipe };
