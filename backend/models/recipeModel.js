import mongoose from "mongoose";

const reactionSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  score: {
    //Thumbs up = 1, thumbs down = -0.5
    type: Number,
    required: true,
  },
});

const ingredientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nameLower: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

const recipeSchema = mongoose.Schema(
  {
    creator: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nameLower: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    directions: {
      type: String,
      required: true,
    },
    ingredients: [ingredientSchema],
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
