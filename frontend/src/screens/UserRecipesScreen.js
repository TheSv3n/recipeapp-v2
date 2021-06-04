import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewRecipeWidget from "../components/NewRecipeWidget";
import RecipeListItem from "../components/RecipeListItem";
import UserPageSwitch from "../components/UserPageSwitch";
import ProfileInfo from "../components/ProfileInfo";
import Loader from "../components/Loader";
import UserListItem from "../components/UserListItem";
import { listUsersRecipes, listUsersFavorites } from "../actions/recipeActions";
import { listFollowedUsers } from "../actions/userActions";
import { updatePageHeading } from "../actions/navBarActions";
import Meta from "../components/Meta";

const UserRecipesScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [showProfile, setShowProfile] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
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

  const userFollowingList = useSelector((state) => state.userFollowingList);
  const {
    loading: loadingFollowed,
    users: usersFollowed,
    page: pageFollowed,
    feedFinished: feedFinshedFollowed,
  } = userFollowingList;

  const updateFeed = () => {
    if (showFavorites) {
      dispatch(listUsersFavorites(pageFavorites + 1, false));
    }
    if (showMyRecipes) {
      dispatch(listUsersRecipes(page + 1, false));
    }
    if (showFollowing) {
      dispatch(listFollowedUsers(pageFollowed + 1));
    }
  };

  const handleFavoritesSwitch = (e, option) => {
    e.preventDefault();
    switch (option) {
      case 1:
        //MyRecipes
        setShowMyRecipes(true);
        setShowFavorites(false);
        setShowFollowing(false);
        setShowProfile(false);
        break;
      case 2:
        // Favorites
        setShowMyRecipes(false);
        setShowFavorites(true);
        setShowFollowing(false);
        setShowProfile(false);
        break;
      case 3:
        // Followed Users
        setShowMyRecipes(false);
        setShowFavorites(false);
        setShowFollowing(true);
        setShowProfile(false);
        break;
      case 4:
        // Profile
        setShowMyRecipes(false);
        setShowFavorites(false);
        setShowFollowing(false);
        setShowProfile(true);
        break;
      default:
        setShowMyRecipes(true);
        setShowFavorites(false);
        setShowFollowing(false);
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
      } else if (showFollowing) {
        dispatch(updatePageHeading(`My Followed Users`));
        dispatch(listFollowedUsers(1));
      } else {
        dispatch(updatePageHeading(`My Profile`));
      }
    }
  }, [
    dispatch,
    showFavorites,
    showMyRecipes,
    showFollowing,
    userInfo,
    history,
  ]);

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
              showFollowing={showFollowing}
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
            : showMyRecipes
            ? recipes &&
              recipes.map((recipe) => {
                return <RecipeListItem key={recipe.id} recipe={recipe} />;
              })
            : usersFollowed &&
              usersFollowed.map((user) => {
                return <UserListItem key={user._id} user={user} />;
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
                  : showFollowing
                  ? "My Followed Users - RecipeApp"
                  : `My recipes - RecipeApp`
              }
            />
            {showProfile ? (
              ""
            ) : showFollowing ? (
              <div className="input-group col-12  my-1 mr-auto mb-5">
                {feedFinshedFollowed ? (
                  <button className="btn disabled-button mx-3 col-5 mx-auto">
                    No more users
                  </button>
                ) : (
                  <button
                    onClick={updateFeed}
                    className="btn submit-button mx-3 col-5 mx-auto"
                  >
                    Get more users
                  </button>
                )}
              </div>
            ) : (
              <div className="input-group col-12  my-1 mr-auto mb-5">
                {(showFavorites && feedFinshedFavorites) ||
                (showMyRecipes && feedFinished) ? (
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
