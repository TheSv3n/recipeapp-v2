import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeListItem from "../components/RecipeListItem";
import UserScreenSwitch from "../components/UserScreenSwitch";
import UserScreenProfile from "../components/UserScreenProfile";
import Loader from "../components/Loader";
import { listUsersRecipes } from "../actions/recipeActions";
import { updatePageHeading } from "../actions/navBarActions";
import Meta from "../components/Meta";
import axios from "axios";

const UserScreen = ({ match }) => {
  const dispatch = useDispatch();
  const userId = match.params.id;

  const [showProfile, setShowProfile] = useState(true);
  const [userName, setUserName] = useState("");

  const recipeUserList = useSelector((state) => state.recipeUserList);
  const { loading, recipes, page, feedFinished } = recipeUserList;

  const handleProfileSwitch = (e) => {
    e.preventDefault();
    setShowProfile(!showProfile);
  };

  const getUserName = async (id) => {
    const { data: userName } = await axios.get(`/api/users/${id}/username`);
    setUserName(userName);
  };

  const updateFeed = () => {
    dispatch(listUsersRecipes(page + 1, false, userId));
  };

  useEffect(() => {
    if (showProfile) {
      dispatch(updatePageHeading(`${userName}'s Profile`));
    } else {
      dispatch(listUsersRecipes(1, false, userId));
      dispatch(updatePageHeading(`${userName}'s Recipes`));
    }
    getUserName(userId);
  }, [dispatch, showProfile, userName, userId]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 mx-auto col-md-12 col-lg-12">
            <UserScreenSwitch
              handleProfileSwitch={handleProfileSwitch}
              showProfile={showProfile}
            />
          </div>
        </div>
      </div>

      {showProfile ? (
        <UserScreenProfile userId={userId} />
      ) : (
        <section className="recipe-list">
          {recipes &&
            recipes.map((recipe) => {
              return <RecipeListItem key={recipe.id} recipe={recipe} />;
            })}
        </section>
      )}

      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Meta
              title={
                showProfile
                  ? `${userName}'s Profile - RecipeApp`
                  : `${userName}'s recipes - RecipeApp`
              }
            />
            {showProfile ? (
              ""
            ) : (
              <div className="input-group col-12  my-1 mr-auto mb-5">
                {feedFinished ? (
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

export default UserScreen;
