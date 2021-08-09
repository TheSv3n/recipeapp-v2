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
  const ranked = req.query.ranked;

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            "ingredients.name": {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            "tags.tag": {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const count = await Recipe.countDocuments({ ...keyword });
  const recipes = await Recipe.find({ ...keyword })
    .sort(ranked === "true" ? { rating: -1 } : { createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ recipes, page, pages: Math.ceil(count / pageSize), count });
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

//@desc Fetch Users Recipes
//@route GET /api/recipes/user/:id
//@access Public
const getUsersRecipes = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const ranked = req.query.ranked;

  const count = await Recipe.countDocuments({ creator: req.params.id });
  const recipes = await Recipe.find({ creator: req.params.id })
    .sort(ranked === "true" ? { rating: -1 } : { createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ recipes, page, pages: Math.ceil(count / pageSize) });
});

//@desc Fetch Users Recipe count
//@route GET /api/recipes/user/:id/count
//@access Public
const getUsersRecipeCount = asyncHandler(async (req, res) => {
  const count = await Recipe.countDocuments({ creator: req.params.id });

  res.json(count);
});

//@desc Fetch Users Favorites
//@route GET /api/recipes/user/:id/favorites
//@access Private
const getUsersFavorites = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const ranked = req.query.ranked;

  const count = await Recipe.countDocuments({ followedBy: req.user._id });
  const recipes = await Recipe.find({ followedBy: req.user._id })
    .sort(ranked === "true" ? { rating: -1 } : { createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ recipes, page, pages: Math.ceil(count / pageSize) });
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
    let currentRating = recipe.rating;
    let reactionScore;

    if (alreadyRated) {
      let tempRatings = [...recipe.ratings];
      let index = tempRatings.findIndex((rating) => {
        return rating.user === req.user._id.toString();
      });
      let tempReaction;
      if (tempRatings[index].reaction === reaction) {
        tempReaction = 0;
        if (reaction === 1) {
          reactionScore = -1;
        }
        if (reaction === 2) {
          reactionScore = 0.5;
        }
      } else {
        tempReaction = reaction;
        if (reaction === 1) {
          if (tempRatings[index].reaction === 0) {
            reactionScore = 1;
          } else {
            reactionScore = 1.5;
          }
        }
        if (reaction === 2) {
          if (tempRatings[index].reaction === 0) {
            reactionScore = -0.5;
          } else {
            reactionScore = -1.5;
          }
        }
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

      if (reaction === 1) {
        reactionScore = 1;
      }
      if (reaction === 2) {
        reactionScore = -0.5;
      }

      recipe.ratings.push(rating);
    }

    const tempTotalRating = currentRating + reactionScore;
    recipe.rating = tempTotalRating;

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

//@desc Update recipe follow list - remove follower
//@route PUT /api/recipes/:id/remove
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

// @desc    Submit new tag
// @route   POST /api/recipes/:id/tags
// @access  Private
const addNewTag = asyncHandler(async (req, res) => {
  const { tag } = req.body;

  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    const newTag = {
      tag: tag,
      tagLower: tag.toLowerCase(),
    };

    recipe.tags.push(newTag);

    await recipe.save();
    res.status(201).json({ message: "Tag Added" });
  } else {
    res.status(404);
    throw new Error("Recipe not found");
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

// @desc    Edit recipe info
// @route   PUT /api/recipes/:id/
// @access  Private
const editRecipeDetails = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    recipe.name = req.body.name || recipe.name;
    recipe.description = req.body.description || recipe.description;
    recipe.directions = req.body.directions || recipe.directions;

    await recipe.save();
    res.status(201).json({ message: "Recipe Updated" });
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
  getUsersRecipeCount,
  getUsersFavorites,
  setRecipeRating,
  addRecipeFollower,
  removeRecipeFollower,
  addNewComment,
  addNewTag,
  editRecipeDetails,
};
