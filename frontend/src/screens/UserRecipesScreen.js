import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewRecipeWidget from "../components/NewRecipeWidget";
import RecipeListItem from "../components/RecipeListItem";
import UserPageSwitch from "../components/UserPageSwitch";
import ProfileInfo from "../components/ProfileInfo";
import Loader from "../components/Loader";
import { listUsersRecipes, listUsersFavorites } from "../actions/recipeActions";
import { updatePageHeading } from "../actions/navBarActions";
import Meta from "../components/Meta";

const UserRecipesScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [showProfile, setShowProfile] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showMyRecipes, setShowMyRecipes] = useState(true);

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

  const handleFavoritesSwitch = (e, option) => {
    e.preventDefault();
    switch (option) {
      case 1:
        //MyRecipes
        setShowMyRecipes(true);
        setShowFavorites(false);
        setShowProfile(false);
        break;
      case 2:
        // Favorites
        setShowMyRecipes(false);
        setShowFavorites(true);
        setShowProfile(false);
        break;
      case 3:
        // Profile
        setShowMyRecipes(false);
        setShowFavorites(false);
        setShowProfile(true);
        break;
      default:
        setShowMyRecipes(true);
        setShowFavorites(false);
        setShowProfile(false);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (showFavorites) {
        dispatch(listUsersFavorites(1, false));
        dispatch(updatePageHeading(`My Saved Recipes`));
      } else if (showMyRecipes) {
        dispatch(listUsersRecipes(1, false));
        dispatch(updatePageHeading(`My Recipes`));
      } else {
        dispatch(updatePageHeading(`My Profile`));
      }
    }
  }, [dispatch, showFavorites, showMyRecipes, userInfo, history]);

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
              showMyRecipes={showMyRecipes}
              showProfile={showProfile}
            />
          </div>
        </div>
      </div>

      {showProfile ? (
        <ProfileInfo />
      ) : (
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
      )}

      <div className="container">
        {loading || loadingFavorites || !userInfo ? (
          <Loader />
        ) : (
          <>
            <Meta
              title={
                showProfile
                  ? `My Profile - RecipeApp`
                  : showFavorites
                  ? `My saved recipes - RecipeApp`
                  : `My recipes - RecipeApp`
              }
            />
            {showProfile ? (
              ""
            ) : (
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
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserRecipesScreen;
