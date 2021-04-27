import asyncHandler from "express-async-handler";
import Recipe from "../models/recipeModel.js";

//@desc Create new recipe
//@route POST /api/recipes
//@access Private
const createRecipe = asyncHandler(async (req, res) => {
  const { name, description, directions, ingredients } = req.body;

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

//@desc Fetch All Recipes
//@route GET /api/recipes
//@access Public
const getAllRecipes = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Recipe.countDocuments({ ...keyword });
  const products = await Recipe.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

export { createRecipe, getAllRecipes };
