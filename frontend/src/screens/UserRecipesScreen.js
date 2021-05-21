import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewRecipeWidget from "../components/NewRecipeWidget";
import RecipeListItem from "../components/RecipeListItem";
import UserPageSwitch from "../components/UserPageSwitch";
import Loader from "../components/Loader";
import { listUsersRecipes, listUsersFavorites } from "../actions/recipeActions";
import { updatePageHeading } from "../actions/navBarActions";
import Meta from "../components/Meta";

const UserRecipesScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [showFavorites, setShowFavorites] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recipeUserList = useSelector((state) => state.recipeUserList);
  const { loading, recipes, page, feedFinished } = recipeUserList;

  const recipeFavoriteList = useSelector((state) => state.recipeFavoriteList);
  const {
    loading: loadingFavorites,
    recipes: recipesFavorites,
    page: pageFavorites,
    feedFinished: feedFinshedFavorites,
  } = recipeFavoriteList;

  const updateFeed = () => {
    if (showFavorites) {
      dispatch(listUsersFavorites(pageFavorites + 1, false));
    } else {
      dispatch(listUsersRecipes(page + 1, false));
    }
  };

  const handleFavoritesSwitch = (e) => {
    e.preventDefault();
    setShowFavorites(!showFavorites);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (showFavorites) {
        dispatch(listUsersFavorites(1, false));
        dispatch(updatePageHeading(`${userInfo.userName}'s saved recipes`));
      } else {
        dispatch(listUsersRecipes(1, false));
        dispatch(updatePageHeading(`${userInfo.userName}'s recipes`));
      }
    }
  }, [dispatch, showFavorites, userInfo, history]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 mx-auto col-md-12 col-lg-12">
            <ul className="list-group">
              <NewRecipeWidget />
            </ul>
            <UserPageSwitch
              handleFavoritesSwitch={handleFavoritesSwitch}
              showFavorites={showFavorites}
            />
          </div>
        </div>
      </div>

      <section className="recipe-list">
        {showFavorites
          ? recipesFavorites &&
            recipesFavorites.map((recipe) => {
              return <RecipeListItem key={recipe.id} recipe={recipe} />;
            })
          : recipes &&
            recipes.map((recipe) => {
              return <RecipeListItem key={recipe.id} recipe={recipe} />;
            })}
      </section>

      <div className="container">
        {loading || loadingFavorites ? (
          <Loader />
        ) : (
          <>
            <Meta
              title={
                showFavorites
                  ? `${userInfo.userName}'s saved recipes - RecipeApp`
                  : `${userInfo.userName}'s recipes - RecipeApp`
              }
            />
            <div className="input-group col-12  my-1 mr-auto mb-5">
              {(showFavorites && feedFinshedFavorites) ||
              (!showFavorites && feedFinished) ? (
                <button className="btn disabled-button mx-3 col-5 mx-auto">
                  No More Recipes
                </button>
              ) : (
                <button
                  onClick={updateFeed}
                  className="btn submit-button mx-3 col-5 mx-auto"
                >
                  Get more recipes
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserRecipesScreen;
