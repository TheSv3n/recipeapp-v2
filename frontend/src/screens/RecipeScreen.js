import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import LoginWidget from "../components/LoginWidget";
import TagElement from "../components/TagElement";
import IngredientElement from "../components/IngredientElement";
import CommentBox from "../components/CommentBox";
import AddTagWidget from "../components/AddTagWidget";
import Loader from "../components/Loader";
import {
  getRecipeInfo,
  setRecipeRating,
  addRecipeFollower,
  removeRecipeFollower,
  updateRecipe,
} from "../actions/recipeActions";
import "../css/RecipeScreen.css";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { updateBackButton } from "../actions/navBarActions";

const RecipeScreen = ({ match }) => {
  const dispatch = useDispatch();
  const recipeId = match.params.id;

  const [upvotesCount, setUpvotesCount] = useState(0);
  const [downvotesCount, setDownvotesCount] = useState(0);
  const [userName, setUserName] = useState("");

  const [userUpvoted, setUserUpvoted] = useState(false);
  const [userDownvoted, setUserDownvoted] = useState(false);
  const [userFavorited, setUserFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [userOwnsRecipe, setUserOwnsRecipe] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editDirections, setEditDirections] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [directions, setDirections] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recipeInfo = useSelector((state) => state.recipeInfo);
  const { recipe, loading } = recipeInfo;

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

  const getUserName = async (creatorId) => {
    const { data: userName } = await axios.get(
      `/api/users/${creatorId}/username`
    );
    setUserName(userName);
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

  const checkUserOwns = (userId, creatorId) => {
    if (userId === creatorId) {
      setUserOwnsRecipe(true);
    }
  };

  const updateName = () => {
    setEditName(false);
    dispatch(updateRecipe(recipeId, { name: name }));
  };

  const updateDescription = () => {
    setEditDescription(false);
    dispatch(updateRecipe(recipeId, { description: description }));
  };

  const updateDirections = () => {
    setEditDirections(false);
    dispatch(updateRecipe(recipeId, { directions: directions }));
  };

  useEffect(() => {
    if (!recipe || recipe._id !== recipeId) {
      dispatch(getRecipeInfo(recipeId, false));
    } else {
      if (userInfo) {
        checkUserRating(recipe.ratings, userInfo._id);
        checkUserFavorite(recipe.followedBy, userInfo._id);
        checkUserOwns(userInfo._id, recipe.creator);
      }

      countRatings(recipe.ratings);
      setFavoriteCount(recipe.followedBy.length);
      getUserName(recipe.creator);
    }
    dispatch(updateBackButton(true));
  }, [dispatch, userInfo, recipeId, recipe]);

  return (
    <>
      {recipe && <Meta title={`${recipe.name} - RecipeApp`} />}
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-12 mx-auto col-md-12 col-lg-12">
              <ul className="list-group">
                <li className="list-group-item my-1 my-md-2 my-lg-2 mx-2">
                  <div className="row">
                    {editName ? (
                      <div className="input-group col-10 col-md-5 mx-auto my-1">
                        <div className="input-group-prepend">
                          <div className="input-group-text text-white">
                            <i className="fas fa-utensils" />
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Recipe Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <button
                          className="btn input-button col-4 ml-auto"
                          onClick={updateName}
                        >
                          Update
                        </button>
                      </div>
                    ) : (
                      <div className="recipe-title mx-auto">
                        {recipe && recipe.name + "  "}
                        {userOwnsRecipe ? (
                          <i
                            className="fas fa-edit recipe-icon"
                            onClick={() => {
                              setEditName(!editName);
                              setName(recipe.name);
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </div>
                  <div className="img-container">
                    <img
                      src={recipe && recipe.image}
                      alt=""
                      className="recipe-image mx-auto img-fluid"
                    ></img>
                  </div>
                  <div className="row">
                    {editDescription ? (
                      <div className="input-group col-10 col-md-5 mx-auto mt-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text text-white">
                            <i className="fas fa-info-circle" />
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <button
                          className="btn input-button col-4 ml-auto"
                          onClick={updateDescription}
                        >
                          Update
                        </button>
                      </div>
                    ) : (
                      <div className="recipe-description mx-auto">
                        {recipe && recipe.description + "   "}
                        {userOwnsRecipe ? (
                          <i
                            className="fas fa-edit recipe-icon"
                            onClick={() => {
                              setEditDescription(!editDescription);
                              setDescription(recipe.description);
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="recipe-description mx-auto">
                      Uploaded by{" "}
                      {recipe && (
                        <Link to={`/user/${recipe.creator}`}>{userName}</Link>
                      )}
                    </div>
                  </div>
                  <div className="row recipe-heading">Tags</div>
                  <section className="recipe-tag-grid">
                    <div className="container">
                      <div className="row mx-auto">
                        {recipe &&
                          recipe.tags &&
                          recipe.tags.map((tag) => {
                            return <TagElement key={tag._id} tag={tag} />;
                          })}
                        {userOwnsRecipe ? (
                          <AddTagWidget recipeId={recipe._id} />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
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
                    {editDirections ? (
                      <>
                        <div className="input-group col-12  my-1 mr-auto">
                          <textarea
                            type="text"
                            className="form-control recipe-area"
                            placeholder="Directions"
                            value={directions}
                            onChange={(e) => setDirections(e.target.value)}
                          />
                        </div>
                        <button
                          className="btn submit-button col-4 mx-auto"
                          onClick={updateDirections}
                        >
                          Update
                        </button>
                      </>
                    ) : (
                      <div className="recipe-directions">
                        {recipe && recipe.directions + "  "}
                        {userOwnsRecipe ? (
                          <i
                            className="fas fa-edit recipe-icon"
                            onClick={() => {
                              setEditDirections(!editDirections);
                              setDirections(recipe.directions);
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    )}
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
      )}
    </>
  );
};

export default RecipeScreen;
