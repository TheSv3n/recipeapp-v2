import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  comment: {
    type: Number,
    required: true,
  },
  timeSent: {
    type: Date,
    required: true,
  },
});

const ratingSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  reaction: {
    //Thumbs up = 1, thumbs down = 2
    type: Number,
    required: true,
  },
  timeSent: {
    type: Date,
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
    reactions: [ratingSchema],
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
