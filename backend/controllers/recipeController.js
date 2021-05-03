import asyncHandler from "express-async-handler";
import Recipe from "../models/recipeModel.js";

//@desc Create new recipe
//@route POST /api/recipes
//@access Private
const createRecipe = asyncHandler(async (req, res) => {
  const { name, description, directions, ingredients, tags, image } = req.body;

  const recipe = new Recipe({
    name,
    creator: req.user._id,
    nameLower: name.toLowerCase(),
    description,
    directions,
    ingredients,
    tags,
    image,
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
  const recipes = await Recipe.find({ ...keyword })
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ recipes, page, pages: Math.ceil(count / pageSize) });
});

//@desc Fetch Recipe
//@route GET /api/recipes/:id
//@access Public
const getRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404);
    throw new Error("List not Found");
  }
});

//@desc Fetch Users Recipe
//@route GET /api/recipes/user/:id
//@access Public
const getUsersRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({ creator: req.params.id });
  res.json(recipes);
});

export { createRecipe, getAllRecipes, getRecipe, getUsersRecipes };
