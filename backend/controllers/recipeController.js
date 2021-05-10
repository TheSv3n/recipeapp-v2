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

// @desc    Submit new rating
// @route   POST /api/recipes/:id/ratings
// @access  Private
const setRecipeRating = asyncHandler(async (req, res) => {
  const { reaction } = req.body;

  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    const alreadyRated = recipe.ratings.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyRated) {
      let tempRatings = [...recipe.ratings];
      let index = tempRatings.findIndex((rating) => {
        return rating.user === req.user._id.toString();
      });
      let tempReaction;
      if (tempRatings[index].reaction === reaction) {
        tempReaction = 0;
      } else {
        tempReaction = reaction;
      }
      const rating = {
        reaction: tempReaction,
        user: req.user._id,
        timeSent: Date.now(),
      };

      tempRatings[index] = rating;

      recipe.ratings = tempRatings;
    } else {
      const rating = {
        reaction: reaction,
        user: req.user._id,
        timeSent: Date.now(),
      };

      recipe.ratings.push(rating);
    }

    await recipe.save();
    res
      .status(201)
      .json({ message: `Rating ${alreadyRated ? "updated" : "added"}` });
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

//@desc Update recipe follow list - add follower
//@route PUT /api/recipes/:id/addfollower
//@access Private
const addRecipeFollower = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    let tempFollowers = [...recipe.followedBy, req.user._id];
    recipe.followedBy = tempFollowers;
    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } else {
    res.status(404);
    throw new Error("Recipe not Found");
  }
});

//@desc Update recipe follow list - add follower
//@route PUT /api/recipes/:id/addfollower
//@access Private
const removeRecipeFollower = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    let tempFollowers = [...recipe.followedBy];
    let index = tempFollowers.indexOf(req.user._id);
    tempFollowers.splice(index, 1);
    recipe.followedBy = tempFollowers;
    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } else {
    res.status(404);
    throw new Error("Recipe not Found");
  }
});

// @desc    Submit new comment
// @route   POST /api/recipes/:id/comments
// @access  Private
const addNewComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    const newComment = {
      comment: comment,
      user: req.user._id,
      timeSent: Date.now(),
    };

    recipe.comments.push(newComment);

    await recipe.save();
    res.status(201).json({ message: "Comment Added" });
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

export {
  createRecipe,
  getAllRecipes,
  getRecipe,
  getUsersRecipes,
  setRecipeRating,
  addRecipeFollower,
  removeRecipeFollower,
  addNewComment,
};
