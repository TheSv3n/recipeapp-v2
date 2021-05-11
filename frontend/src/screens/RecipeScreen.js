import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginWidget from "../components/LoginWidget";
import TagElement from "../components/TagElement";
import IngredientElement from "../components/IngredientElement";
import CommentBox from "../components/CommentBox";
import {
  getRecipeInfo,
  setRecipeRating,
  addRecipeFollower,
  removeRecipeFollower,
} from "../actions/recipeActions";
import "../css/RecipeScreen.css";

const RecipeScreen = ({ match }) => {
  const dispatch = useDispatch();
  const recipeId = match.params.id;

  const [upvotesCount, setUpvotesCount] = useState(0);
  const [downvotesCount, setDownvotesCount] = useState(0);

  const [userUpvoted, setUserUpvoted] = useState(false);
  const [userDownvoted, setUserDownvoted] = useState(false);
  const [userFavorited, setUserFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recipeInfo = useSelector((state) => state.recipeInfo);
  const { recipe } = recipeInfo;

  const setRating = (rating) => {
    dispatch(setRecipeRating(recipe._id, rating));
  };

  const setFavorite = () => {
    if (!userFavorited) {
      dispatch(addRecipeFollower(recipeId));
    } else {
      dispatch(removeRecipeFollower(recipeId));
    }
  };

  const checkUserFavorite = (followedBy, userId) => {
    if (followedBy.length === 0) {
      setUserFavorited(false);
    } else {
      for (let i = 0; i < followedBy.length; i++) {
        if (followedBy[i] === userId) {
          setUserFavorited(true);
        }
      }
    }
  };

  const countRatings = (ratings) => {
    let tempUpvotes = 0;
    let tempDownvotes = 0;

    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i].reaction === 1) {
        tempUpvotes++;
      } else if (ratings[i].reaction === 2) {
        tempDownvotes++;
      }
    }

    setUpvotesCount(tempUpvotes);
    setDownvotesCount(tempDownvotes);
  };

  const checkUserRating = (ratings, userId) => {
    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i].user === userId.toString()) {
        if (ratings[i].reaction === 1) {
          setUserUpvoted(true);
          setUserDownvoted(false);
        } else if (ratings[i].reaction === 2) {
          setUserDownvoted(true);
          setUserUpvoted(false);
        } else {
          setUserDownvoted(false);
          setUserUpvoted(false);
        }
      }
    }
  };

  useEffect(() => {
    if (!recipe || recipe._id !== recipeId) {
      dispatch(getRecipeInfo(recipeId));
    } else {
      checkUserRating(recipe.ratings, userInfo._id);
      countRatings(recipe.ratings);
      checkUserFavorite(recipe.followedBy, userInfo._id);
      setFavoriteCount(recipe.followedBy.length);
    }
  }, [dispatch, userInfo, recipeId, recipe]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto col-md-12 col-lg-12">
          <ul className="list-group">
            <li className="list-group-item my-1 my-md-2 my-lg-2 mx-2">
              <div className="row">
                <div className="recipe-title mx-auto">
                  {recipe && recipe.name}
                </div>
              </div>
              <div className="img-container">
                <img
                  src={recipe && recipe.image}
                  alt=""
                  className="recipe-image mx-auto"
                ></img>
              </div>
              <div className="row">
                <div className="recipe-description mx-auto">
                  {recipe && recipe.description}
                </div>
              </div>
              <div className="row">
                <div className="recipe-description mx-auto">
                  Uploaded by {recipe && recipe.userName}
                </div>
              </div>
              <div className="row recipe-heading">Tags</div>
              <section className="tag-grid">
                {recipe &&
                  recipe.tags &&
                  recipe.tags.map((tag) => {
                    return <TagElement key={tag._id} tag={tag} />;
                  })}
              </section>
              <div className="row recipe-heading">Ingredients</div>
              <section className="ingredient-grid">
                {recipe &&
                  recipe.ingredients &&
                  recipe.ingredients.map((ingredient) => {
                    return (
                      <IngredientElement
                        key={ingredient._id}
                        ingredient={ingredient}
                      />
                    );
                  })}
              </section>
              <div className="row recipe-heading">Directions</div>
              <div className="row">
                <div className="recipe-directions">
                  {recipe && recipe.directions}
                </div>
              </div>
              <div className="recipe-page-icons-row">
                <span
                  onClick={() => {
                    if (userInfo) {
                      setRating(1);
                    }
                  }}
                >
                  {userUpvoted ? (
                    <i className="fas fa-thumbs-up recipe-icon upvoted" />
                  ) : (
                    <i className="far fa-thumbs-up recipe-icon" />
                  )}{" "}
                  {upvotesCount}
                </span>
                <span
                  onClick={() => {
                    if (userInfo) {
                      setRating(2);
                    }
                  }}
                >
                  {userDownvoted ? (
                    <i className="fas fa-thumbs-down recipe-icon downvoted" />
                  ) : (
                    <i className="far fa-thumbs-down recipe-icon" />
                  )}{" "}
                  {downvotesCount}
                </span>
                <span
                  onClick={() => {
                    if (userInfo) {
                      setFavorite();
                    }
                  }}
                >
                  {userFavorited ? (
                    <i className="fas fa-heart recipe-icon favorited" />
                  ) : (
                    <i className="far fa-heart recipe-icon" />
                  )}{" "}
                  {favoriteCount}
                </span>
              </div>
              {userInfo ? (
                ""
              ) : (
                <LoginWidget message="Login to react/save recipe" />
              )}
            </li>
            <CommentBox recipe={recipe} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeScreen;
