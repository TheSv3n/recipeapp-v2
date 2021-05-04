import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginWidget from "../components/LoginWidget";
import TagElement from "../components/TagElement";
import IngredientElement from "../components/IngredientElement";
import CommentBox from "../components/CommentBox";
import { getRecipeInfo } from "../actions/recipeActions";
import "../css/RecipeScreen.css";

const RecipeScreen = ({ match }) => {
  const dispatch = useDispatch();
  const recipeId = match.params.id;

  const [upvotesCount, setUpvotesCount] = useState(0);
  const [downvotesCount, setDownvotesCount] = useState(0);
  const [userUpvoted, setUserUpvoted] = useState(false);
  const [userDownvoted, setUserDownvoted] = useState(false);
  const [userFavorited, setUserFavorited] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recipeInfo = useSelector((state) => state.recipeInfo);
  const { recipe } = recipeInfo;

  const setRating = (rating) => {
    //TODO
  };

  const setFavorite = () => {
    //TODO
  };

  const countRatings = () => {
    //TODO
  };

  useEffect(() => {
    dispatch(getRecipeInfo(recipeId));
  }, [dispatch, userInfo, recipeId]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto col-md-12 col-lg-12">
          <ul className="list-group">
            <li className="list-group-item my-1 my-md-2 my-lg-2 mx-2">
              <div className="row">
                <div className="recipe-title mx-auto">{recipe.name}</div>
              </div>
              <div className="img-container">
                <img
                  src={recipe.image}
                  alt=""
                  className="recipe-image mx-auto"
                ></img>
              </div>
              <div className="row">
                <div className="recipe-description mx-auto">
                  {recipe.description}
                </div>
              </div>
              <div className="row">
                <div className="recipe-description mx-auto">
                  Uploaded by {recipe.userName}
                </div>
              </div>
              <div className="row recipe-heading">Tags</div>
              <section className="tag-grid">
                {recipe.tags &&
                  recipe.tags.map((tag) => {
                    return <TagElement key={tag._id} tag={tag} />;
                  })}
              </section>
              <div className="row recipe-heading">Ingredients</div>
              <section className="ingredient-grid">
                {recipe.ingredients &&
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
                <div className="recipe-directions">{recipe.directions}</div>
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
                  {recipe.followedBy && recipe.followedBy.length}
                </span>
              </div>
              {userInfo ? (
                ""
              ) : (
                <LoginWidget message="Login to react/save recipe" />
              )}
            </li>
            <CommentBox />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeScreen;
